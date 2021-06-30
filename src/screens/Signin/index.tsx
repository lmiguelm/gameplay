import React from 'react';
import { View, Image, Text, StatusBar } from 'react-native';

import { styles } from './styles';

import IllustrationImg from '../../assets/illustration.png';

import { ButtonIcon } from '../../components/ButtonIcon';

export function Signin() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <Image style={styles.image} resizeMode="stretch" source={IllustrationImg} />

      <View style={styles.content}>
        <Text style={styles.title}>
          Organize {'\n'} suas jogatinas {'\n'} facilmente
        </Text>

        <Text style={styles.subtitle}>
          Crie grupos para jogar seus games {'\n'} favoritios com seus amigos
        </Text>

        <ButtonIcon>Entrar com o Discord</ButtonIcon>
      </View>
    </View>
  );
}
