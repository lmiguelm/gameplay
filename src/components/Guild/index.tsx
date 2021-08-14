import React from 'react';

import { View, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { styles } from './styles';

import { GuildIcon } from '../GuildIcon';
import { theme } from '../../global/styles/theme';

export type GuildType = {
  id: string;
  name: string;
  icon: string | null;
  owner: boolean;
};

type GuildProps = TouchableOpacityProps & {
  data: GuildType;
};

export function Guild({ data, ...props }: GuildProps) {
  return (
    <TouchableOpacity {...props} style={styles.container} activeOpacity={0.7}>
      <GuildIcon />

      <View style={styles.content}>
        <View>
          <Text style={styles.title}>{data.name}</Text>
          <Text style={styles.type}>{data.owner ? 'Administrador' : 'Convidado'}</Text>
        </View>

        <Feather name="chevron-right" color={theme.colors.heading} size={24} />
      </View>
    </TouchableOpacity>
  );
}
