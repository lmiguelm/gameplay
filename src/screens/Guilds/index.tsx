import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

import { View, Text, FlatList, ActivityIndicator, Alert } from 'react-native';
import { Empty } from '../../components/Empty';

import { Guild, GuildType } from '../../components/Guild';
import { ListDivider } from '../../components/ListDivider';
import { theme } from '../../global/styles/theme';
import { api } from '../../services/api';

import { styles } from './styles';

type GuildsProps = {
  handleGuildSelected: (guild: GuildType) => void;
};

export function Guilds({ handleGuildSelected }: GuildsProps) {
  const [guilds, setGuilds] = useState<GuildType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchGuilds();
  }, []);

  async function fetchGuilds() {
    try {
      setLoading(true);
      const { data } = await api.get<GuildType[]>('/users/@me/guilds');
      // const response = await api.get(`/guilds/${data[2].id}/widget.json`);
      setGuilds(data);
    } catch (error) {
      console.log(error);
      Alert.alert('Ops!', 'Não foi possível carregar a lista de servidores');
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator style={{ flex: 1 }} size="large" color={theme.colors.primary} />
      ) : (
        <FlatList
          style={styles.guilds}
          data={guilds}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Guild data={item} onPress={() => handleGuildSelected(item)} />}
          ListHeaderComponent={() => (guilds.length > 0 ? <ListDivider isCentered /> : <View />)}
          ListEmptyComponent={() => <Empty title="Não encontramos nenhum servidor em sua conta" />}
          ItemSeparatorComponent={() => <ListDivider isCentered />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 68, paddingTop: 104 }}
        />
      )}
    </View>
  );
}
