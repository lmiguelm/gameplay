import React, { createContext, ReactNode, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as AuthSession from 'expo-auth-session';
import { api } from '../services/api';
import { CDN_IMAGE, CLIENT_ID, REDIREC_URI, RESPONSE_TYPE, SCOPE } from '../config';
import { COLLECTION_USERS } from '../config/database';
import { useEffect } from 'react';

type UserType = {
  id: string;
  username: string;
  firstName: string;
  email: string;
  avatar: string;
  token: string;
};

type AuthContextType = {
  user: UserType;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  loading: boolean;
};

export const AuthContext = createContext({} as AuthContextType);

type AuthProviderProps = {
  children: ReactNode;
};

type AuthorizationResponse = AuthSession.AuthSessionResult & {
  params: {
    access_token?: string;
    error?: string;
  };
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserType>({} as UserType);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    loadUserStorageData();
  }, []);

  async function loadUserStorageData() {
    const storage = await AsyncStorage.getItem(COLLECTION_USERS);

    if (storage) {
      const userLogged = JSON.parse(storage) as UserType;
      api.defaults.headers.authorization = `Bearer ${userLogged.token}`;
      setUser(userLogged);
    }
  }

  async function signIn() {
    try {
      setLoading(true);

      const authUrl = `${api.defaults.baseURL}/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIREC_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

      const { type, params } = (await AuthSession.startAsync({ authUrl })) as AuthorizationResponse;

      if (type === 'success' && !params.error) {
        api.defaults.headers.authorization = `Bearer ${params.access_token}`;
        const userResponse = (await api.get<UserType>(`/users/@me`)).data;

        const firstName = userResponse.username.split(' ')[0];
        userResponse.avatar = `${CDN_IMAGE}/avatars/${userResponse.id}/${userResponse.avatar}.png`;

        const userData: UserType = {
          ...userResponse,
          firstName,
          token: params.access_token ?? '',
        };

        await AsyncStorage.setItem(COLLECTION_USERS, JSON.stringify(userData));
        setUser(userData);
      }
    } catch (error) {
      throw new Error('Não foi possível autenticar');
    } finally {
      setLoading(false);
    }
  }

  async function signOut() {
    await AsyncStorage.clear();
    api.defaults.headers.authorization = null;
    setUser({} as UserType);
  }

  return (
    <AuthContext.Provider value={{ user, signIn, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
