import React from 'react';
import { Image } from 'react-native';
import { CDN_IMAGE } from '../../config';

import { styles } from './styles';

type GuildIconProps = {
  guildId?: string | null;
  iconId?: string | null;
};

export function GuildIcon({ guildId, iconId }: GuildIconProps) {
  let uri =
    'https://e1.pngegg.com/pngimages/916/717/png-clipart-clay-os-6-a-macos-icon-discord-round-blue-icon.png';
  if (guildId && iconId) {
    uri = `${CDN_IMAGE}/icons/${guildId}/${iconId}.png`;
  }
  return <Image source={{ uri }} style={styles.image} resizeMode="cover" />;
}
