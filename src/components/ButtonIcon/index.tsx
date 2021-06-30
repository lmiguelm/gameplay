import React, { ReactNode } from 'react';
import { Text, Image, View } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';

import { styles } from './styles';

import discordImg from '../../assets/discord.png';

type ButtonIconProps = RectButtonProps & {
  children: ReactNode;
};

export function ButtonIcon({ children, ...props }: ButtonIconProps) {
  return (
    <RectButton {...props} style={styles.container}>
      <View style={styles.iconWrapper}>
        <Image source={discordImg} style={styles.icon} />
      </View>

      <Text style={styles.title}>{children}</Text>
    </RectButton>
  );
}
