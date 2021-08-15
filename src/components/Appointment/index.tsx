import React from 'react';
import { View, Text } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { categories } from '../../utils/categories';

import { GuildIcon } from '../GuildIcon';

import { styles } from './styles';
import { theme } from '../../global/styles/theme';
import PlayerSvg from '../../assets/player.svg';
import CalendarSvg from '../../assets/calendar.svg';
import { GuildType } from '../Guild';

export type AppointmentType = {
  id: string;
  guild: GuildType;
  category: string;
  date: string;
  description: string;
};

type AppointmentTypeProps = RectButtonProps & {
  data: AppointmentType;
};

export function Appointment({ data, ...rest }: AppointmentTypeProps) {
  const [category] = categories.filter((item) => item.id === data.category);
  const { owner, name } = data.guild;
  const { primary, on } = theme.colors;

  return (
    <RectButton {...rest}>
      <View style={styles.container}>
        <GuildIcon iconId={data.guild.icon} guildId={data.guild.id} />

        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.text}>{name}</Text>
            <Text style={styles.category}>{category.title}</Text>
          </View>

          <View style={styles.footer}>
            <View style={styles.dateInfo}>
              <CalendarSvg />
              <Text style={styles.date}>{data.date}</Text>
            </View>

            <View style={styles.playersInfo}>
              <PlayerSvg fill={owner ? primary : on} />

              <Text style={[styles.player, { color: owner ? primary : on }]}>
                {owner ? 'Anfitrião' : 'Visitante'}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </RectButton>
  );
}
