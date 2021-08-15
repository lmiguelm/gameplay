import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { AppointmentType } from '../../components/Appointment';
import { COLLECTION_APPOINTMENTS } from '../../config/database';
import { theme } from '../../global/styles/theme';

import { styles } from './styles';

type ApppointmentRemoveProps = {
  closeModal: () => void;
  id: string | undefined;
};

export function ApppointmentRemove({ id, closeModal }: ApppointmentRemoveProps) {
  async function handleRemoveAppointment() {
    const store = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
    const appointments = store
      ? (JSON.parse(store) as AppointmentType[])
      : ([] as AppointmentType[]);
    const newArrayOfAppointments = appointments.filter((appointment) => appointment.id !== id);
    await AsyncStorage.setItem(COLLECTION_APPOINTMENTS, JSON.stringify(newArrayOfAppointments));
    closeModal();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tem ceretza que deseja remover este compromisso?</Text>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={[
            styles.button,
            {
              backgroundColor: 'transparent',
              borderWidth: 1,
              borderColor: theme.colors.secondary50,
            },
          ]}
          onPress={closeModal}
        >
          <Text style={styles.textButton}>Não</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.button}
          onPress={handleRemoveAppointment}
        >
          <Text style={styles.textButton}>Sim</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
