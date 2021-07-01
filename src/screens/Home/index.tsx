import React, { useState, useCallback } from 'react';
import { View, FlatList, Text } from 'react-native';
import { Appointment } from '../../components/Appointment';

import { ButtonAdd } from '../../components/ButtonAdd';
import { CategorySelect } from '../../components/CategorySelect';
import { ListDivider } from '../../components/ListDivider';
import { ListHeader } from '../../components/ListHeader';
import { Profile } from '../../components/Profile';

import { styles } from './styles';

export function Home() {
  const [category, setCategory] = useState<string>('');

  const appointments = [
    {
      id: '1',
      guild: {
        id: '1',
        name: 'Lendários',
        icon: null,
        owner: true,
      },
      category: '1',
      date: '22/06 ás 20:30h',
      description: 'É hoje que vamos chegar ao challenger sem perder uma partida da md10',
    },
    {
      id: '2',
      guild: {
        id: '2',
        name: 'Lendários',
        icon: null,
        owner: true,
      },
      category: '1',
      date: '22/06 ás 20:30h',
      description: 'É hoje que vamos chegar ao challenger sem perder uma partida da md10',
    },
  ];

  const handleCategorySelect = useCallback(
    (categoryId: string) => {
      categoryId === category ? setCategory('') : setCategory(categoryId);
    },
    [category]
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Profile />
        <ButtonAdd />
      </View>

      <View>
        <CategorySelect categorySelected={category} setCategory={handleCategorySelect} />
      </View>

      <View style={styles.content}>
        <ListHeader title="Partidas agendadas" subtitle="Total 6" />

        <FlatList
          data={appointments}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Appointment data={item} />}
          ItemSeparatorComponent={() => <ListDivider />}
          showsVerticalScrollIndicator={false}
          style={styles.matches}
        />
      </View>
    </View>
  );
}
