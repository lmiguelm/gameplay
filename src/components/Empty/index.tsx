import React from 'react';
import { View, Text } from 'react-native';
import Lottie from 'lottie-react-native';

import empty from '../../assets/empty.json';
import { styles } from './styles';

type EmptyProps = {
  title: string;
};

export function Empty({ title }: EmptyProps) {
  return (
    <View style={styles.container}>
      <Lottie source={empty} autoPlay={true} loop={false} autoSize style={styles.lottie} />
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}
