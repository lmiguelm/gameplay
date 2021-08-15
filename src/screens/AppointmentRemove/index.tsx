import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { theme } from '../../global/styles/theme';
import { useAppointment } from '../../hooks/useAppointment';

import { styles } from './styles';

type ApppointmentRemoveProps = {
  closeModal: () => void;
  id: string | undefined;
};

export function ApppointmentRemove({ id, closeModal }: ApppointmentRemoveProps) {
  const { removeAppointment } = useAppointment();

  async function handleRemoveAppointment() {
    await removeAppointment(id);
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
