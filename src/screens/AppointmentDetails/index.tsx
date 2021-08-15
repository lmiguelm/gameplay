import React, { useState } from 'react';
import {
  ImageBackground,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  Share,
  Platform,
} from 'react-native';

import * as Linking from 'expo-linking';

import { BorderlessButton } from 'react-native-gesture-handler';
import { Fontisto } from '@expo/vector-icons';

import { Background } from '../../components/Background';
import { ListHeader } from '../../components/ListHeader';
import { Header } from '../../components/Header';

import { styles } from './styles';
import { theme } from '../../global/styles/theme';
import bannerImg from '../../assets/banner.png';
import { Member, MemberData } from '../../components/Member';
import { ListDivider } from '../../components/ListDivider';
import { ButtonIcon } from '../../components/ButtonIcon';
import { useRoute } from '@react-navigation/native';
import { AppointmentType } from '../../components/Appointment';
import { api } from '../../services/api';
import { useEffect } from 'react';
import { Error } from '../Error';

type ParamsType = {
  guildSelected: AppointmentType;
};

type GuildWidgetType = {
  id: string;
  name: string;
  instant_invite: string;
  members: MemberData[];
};

export function AppointmentDetails() {
  const { params } = useRoute();
  const { guildSelected } = params as ParamsType;

  const { primary } = theme.colors;

  const [widget, setWidget] = useState<GuildWidgetType>({} as GuildWidgetType);
  const [loading, setLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<string | undefined>(undefined);

  useEffect(() => {
    fetchGuildWidget();
  }, []);

  async function fetchGuildWidget() {
    try {
      const response = await api.get(`/guilds/${guildSelected.guild.id}/widget.json`);
      setWidget(response.data);
    } catch {
      setHasError('Verifique as configurações do servidor. Será que o Widget está habilitado?');
    } finally {
      setLoading(false);
    }
  }

  function handleOpenGuild() {
    Linking.openURL(widget.instant_invite);
  }

  function handleShareInvitation() {
    const message =
      Platform.OS === 'ios' ? `Junte-se a ${guildSelected.guild.name}` : widget.instant_invite;

    Share.share({
      message,
      url: widget.instant_invite,
    });
  }

  if (!!hasError) {
    return <Error errorMessage={hasError} />;
  }

  return (
    <Background>
      <Header
        title="Detalhes"
        action={
          widget.instant_invite && (
            <BorderlessButton onPress={handleShareInvitation}>
              <Fontisto name="share" color={primary} size={24} />
            </BorderlessButton>
          )
        }
      />

      <ImageBackground source={bannerImg} style={styles.banner}>
        <View style={styles.bannerContent}>
          <Text style={styles.title}>{guildSelected.guild.name}</Text>

          <Text style={styles.subtitle}>{guildSelected.description}</Text>
        </View>
      </ImageBackground>

      {loading ? (
        <ActivityIndicator style={{ flex: 1 }} size="large" color={theme.colors.primary} />
      ) : (
        <>
          <ListHeader title="Jogadores" subtitle={`Total ${widget.members.length}`} />

          <FlatList
            data={widget.members}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <Member data={item} />}
            ItemSeparatorComponent={() => <ListDivider />}
            style={styles.members}
            refreshControl={
              <RefreshControl
                refreshing={false}
                onRefresh={fetchGuildWidget}
                size={24}
                colors={[theme.colors.primary]}
              />
            }
          />
        </>
      )}

      {widget.instant_invite ? (
        <View style={styles.footer}>
          <ButtonIcon onPress={handleOpenGuild}>Entrar na partida</ButtonIcon>
        </View>
      ) : (
        <View style={styles.footer} />
      )}
    </Background>
  );
}
