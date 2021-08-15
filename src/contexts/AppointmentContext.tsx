import React, { createContext, ReactNode, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppointmentType } from '../components/Appointment';
import { COLLECTION_APPOINTMENTS } from '../config/database';

type AppintmentContextType = {
  appointments: AppointmentType[];
  saveAppointment: (appointment: AppointmentType) => Promise<void>;
  removeAppointment: (id: string | undefined) => Promise<void>;
  fetchAppointments: () => Promise<void>;
  loading: boolean;
};

export const AppointmentContext = createContext({} as AppintmentContextType);

type AppointmentProviderProps = {
  children: ReactNode;
};

export function AppointmentProvider({ children }: AppointmentProviderProps) {
  const [appointments, setAppointments] = useState<AppointmentType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchAppointments();
  }, []);

  async function fetchAppointments() {
    setLoading(true);

    const storage = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
    const appointments = storage
      ? (JSON.parse(storage) as AppointmentType[])
      : ([] as AppointmentType[]);

    setAppointments(appointments);
    setLoading(false);
  }

  async function saveAppointment(appointment: AppointmentType) {
    setLoading(true);
    const newArrauOfAppointments = [...appointments, appointment];
    await AsyncStorage.setItem(COLLECTION_APPOINTMENTS, JSON.stringify(newArrauOfAppointments));
    setAppointments(newArrauOfAppointments);
    setLoading(false);
  }

  async function removeAppointment(id: string | undefined) {
    setLoading(true);
    const newArrauOfAppointments = appointments.filter((appointment) => appointment.id !== id);
    await AsyncStorage.setItem(COLLECTION_APPOINTMENTS, JSON.stringify(newArrauOfAppointments));
    setAppointments(newArrauOfAppointments);
    setLoading(false);
  }

  return (
    <AppointmentContext.Provider
      value={{ loading, removeAppointment, saveAppointment, appointments, fetchAppointments }}
    >
      {children}
    </AppointmentContext.Provider>
  );
}
