import React from 'react';

import { View, Text, FlatList } from 'react-native';

import { Guild, GuildType } from '../../components/Guild';
import { ListDivider } from '../../components/ListDivider';

import { styles } from './styles';

type GuildsProps = {
  handleGuildSelected: (guild: GuildType) => void;
};

export function Guilds({ handleGuildSelected }: GuildsProps) {
  const guilds = [
    {
      id: '1',
      name: 'Lendários',
      icon: null,
      owner: true,
    },
    {
      id: '2',
      name: 'Lendários',
      icon: null,
      owner: true,
    },
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={guilds}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Guild data={item} onPress={() => handleGuildSelected(item)} />}
        ItemSeparatorComponent={() => <ListDivider />}
        showsVerticalScrollIndicator={false}
        style={styles.guilds}
      />
    </View>
  );
}
