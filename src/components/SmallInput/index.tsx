import React, { forwardRef, Ref } from 'react';
import { TextInput, TextInputProps } from 'react-native';

import { styles } from './styles';

export const SmallInput = forwardRef((props: TextInputProps, ref: Ref<TextInput>) => {
  return <TextInput ref={ref} {...props} keyboardType="numeric" style={styles.container} />;
});
