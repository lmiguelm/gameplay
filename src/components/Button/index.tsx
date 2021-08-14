import React, { ReactNode } from 'react';
import { Text } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';

import { styles } from './styles';

type ButtonProps = RectButtonProps & {
  children: ReactNode;
};

export function Button({ children, ...props }: ButtonProps) {
  return (
    <RectButton {...props} style={styles.container}>
      <Text style={styles.title}>{children}</Text>
    </RectButton>
  );
}
