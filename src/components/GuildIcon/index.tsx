import React from 'react';
import { Image } from 'react-native';

import { styles } from './styles';

export function GuildIcon() {
  const uri =
    'https://e1.pngegg.com/pngimages/916/717/png-clipart-clay-os-6-a-macos-icon-discord-round-blue-icon.png';
  return <Image source={{ uri }} style={styles.image} resizeMode="cover" />;
}
