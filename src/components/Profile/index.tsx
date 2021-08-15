import React, { useCallback, useState } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { useAuth } from '../../hooks/useAuth';
import { Signout } from '../../screens/Signout';
import { Avatar } from '../Avatar';
import { ModalView } from '../ModalView';

import { styles } from './styles';

export function Profile() {
  const { user, signOut } = useAuth();

  const [showModalSignout, setShowModalSignout] = useState<boolean>(false);

  function handleOpenModalSignout() {
    setShowModalSignout(true);
  }

  const handleCloseModalSigout = useCallback(() => {
    setShowModalSignout(false);
  }, []);

  return (
    <TouchableWithoutFeedback onPress={handleOpenModalSignout}>
      <View style={styles.container}>
        <Avatar urlImage={user.avatar} />
        <View>
          <View style={styles.user}>
            <Text style={styles.greeting}>Olá</Text>

            <Text style={styles.username}>{user.firstName}</Text>
          </View>

          <Text style={styles.message}>Hoje é dia de vitória</Text>
        </View>

        <ModalView
          visible={showModalSignout}
          closeModal={handleCloseModalSigout}
          style={{
            height: 200,
            position: 'absolute',
            bottom: 0,
            width: '100%',
          }}
        >
          <Signout closeModal={handleCloseModalSigout} />
        </ModalView>
      </View>
    </TouchableWithoutFeedback>
  );
}
