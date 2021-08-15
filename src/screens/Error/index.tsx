import React from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Lottie from 'lottie-react-native';

import { styles } from './styles';
import errorAnimation from '../../assets/error.json';

import { Background } from '../../components/Background';
import { Button } from '../../components/Button';

type ErrorProps = {
  errorMessage: string;
};

export function Error({ errorMessage }: ErrorProps) {
  const { goBack } = useNavigation();

  function handleGoBack() {
    goBack();
  }

  return (
    <Background>
      <View style={styles.container}>
        <Lottie source={errorAnimation} autoPlay={true} loop={true} style={styles.animation} />

        <View style={styles.textContainer}>
          <Text style={styles.title}>Ops!</Text>
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        </View>

        <Button onPress={handleGoBack}>Entendi</Button>
      </View>
    </Background>
  );
}
