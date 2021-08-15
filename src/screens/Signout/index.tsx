import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Button } from '../../components/Button';
import { theme } from '../../global/styles/theme';
import { useAuth } from '../../hooks/useAuth';

import { styles } from './styles';

type SinoutProps = {
  closeModal: () => void;
};

export function Signout({ closeModal }: SinoutProps) {
  const { signOut } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Deseja sair do{' '}
        <Text style={styles.bold}>
          Game<Text style={styles.hightlight}>Play</Text>?
        </Text>
      </Text>

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

        <TouchableOpacity activeOpacity={0.7} style={styles.button} onPress={signOut}>
          <Text style={styles.textButton}>Sim</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
