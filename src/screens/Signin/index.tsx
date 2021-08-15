import React, { useState } from 'react';
import { View, Image, Text, ActivityIndicator } from 'react-native';

import { styles } from './styles';
import IllustrationImg from '../../assets/illustration.png';

import { ButtonIcon } from '../../components/ButtonIcon';
import { Background } from '../../components/Background';
import { Error } from '../Error';

import { useAuth } from '../../hooks/useAuth';

import { theme } from '../../global/styles/theme';

export function Signin() {
  const { signIn, loading } = useAuth();

  const [hasError, setHasError] = useState<string | undefined>(undefined);

  async function handleSignin() {
    try {
      await signIn();
    } catch (error) {
      setHasError(error);
    }
  }

  if (!!hasError) {
    return <Error errorMessage={hasError} />;
  }

  return (
    <Background>
      <View style={styles.container}>
        <Image style={styles.image} resizeMode="stretch" source={IllustrationImg} />

        <View style={styles.content}>
          <Text style={styles.title}>
            Conecte-se {'\n'} e organize suas {'\n'} facilmente
          </Text>

          <Text style={styles.subtitle}>
            Crie grupos para jogar seus games {'\n'} favoritios com seus amigos
          </Text>

          {loading ? (
            <ActivityIndicator size="large" color={theme.colors.primary} />
          ) : (
            <ButtonIcon onPress={handleSignin}>Entrar com o Discord</ButtonIcon>
          )}
        </View>
      </View>
    </Background>
  );
}
