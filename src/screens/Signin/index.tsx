import React from 'react';
import { View, Image, Text } from 'react-native';

import { styles } from './styles';

import IllustrationImg from '../../assets/illustration.png';

import { ButtonIcon } from '../../components/ButtonIcon';
import { useNavigation } from '@react-navigation/native';
import { Background } from '../../components/Background';

export function Signin() {
  const { navigate } = useNavigation();

  function handleSignin() {
    navigate('Home');
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

          <ButtonIcon onPress={handleSignin}>Entrar com o Discord</ButtonIcon>
        </View>
      </View>
    </Background>
  );
}
