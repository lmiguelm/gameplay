import React, { useState, useCallback } from 'react';
import { View, FlatList, RefreshControl, ActivityIndicator } from 'react-native';

import { Appointment, AppointmentType } from '../../components/Appointment';
import { ButtonAdd } from '../../components/ButtonAdd';
import { CategorySelect } from '../../components/CategorySelect';
import { ListDivider } from '../../components/ListDivider';
import { ListHeader } from '../../components/ListHeader';
import { Profile } from '../../components/Profile';
import { Background } from '../../components/Background';

import { styles } from './styles';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import { Empty } from '../../components/Empty';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLLECTION_APPOINTMENTS } from '../../config/database';
import { theme } from '../../global/styles/theme';
import { ModalView } from '../../components/ModalView';
import { Signout } from '../Signout';
import { ApppointmentRemove } from '../AppointmentRemove';

export function Home() {
  const { navigate } = useNavigation();

  const [category, setCategory] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [showAppointmentRemove, setShowAppointmentRemove] = useState<boolean>(false);
  const [appointmentIdSeleted, setAppointmentIdSelected] = useState<string | undefined>(undefined);
  const [appointments, setAppointments] = useState<AppointmentType[]>([]);

  useFocusEffect(
    useCallback(() => {
      loadAppointments();
    }, [category])
  );

  async function loadAppointments() {
    setLoading(true);
    const storage = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);

    const appointments = storage
      ? (JSON.parse(storage) as AppointmentType[])
      : ([] as AppointmentType[]);

    if (category === '') {
      setAppointments(appointments);
    } else {
      setAppointments(
        appointments.filter((appointment) => Number(appointment.category) === Number(category))
      );
    }

    setLoading(false);
  }

  const handleCategorySelect = useCallback(
    (categoryId: string) => {
      categoryId === category ? setCategory('') : setCategory(categoryId);
    },
    [category]
  );

  function handleAppointmentDetails(guildSelected: AppointmentType) {
    navigate('AppointmentDetails', { guildSelected });
  }

  function handleAppointmentCreate() {
    navigate('AppointmentCreate');
  }

  const onLongPress = useCallback((id: string) => {
    setShowAppointmentRemove(true);
    setAppointmentIdSelected(id);
  }, []);

  const hideModal = useCallback(() => {
    setShowAppointmentRemove(false);
    loadAppointments();
  }, []);

  return (
    <Background>
      <View style={styles.header}>
        <Profile />
        <ButtonAdd onPress={handleAppointmentCreate} />
      </View>

      <View>
        <CategorySelect
          hashCheckBox
          categorySelected={category}
          setCategory={handleCategorySelect}
        />
      </View>

      <ListHeader title="Partidas agendadas" subtitle={`Total ${appointments.length}`} />

      {loading ? (
        <ActivityIndicator size="large" color={theme.colors.primary} style={{ flex: 1 }} />
      ) : (
        <FlatList
          data={appointments}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Appointment
              onPress={() => handleAppointmentDetails(item)}
              onLongPress={() => onLongPress(item.id)}
              data={item}
            />
          )}
          ItemSeparatorComponent={() => <ListDivider />}
          showsVerticalScrollIndicator={false}
          style={styles.matches}
          contentContainerStyle={{ paddingBottom: 69 }}
          ListEmptyComponent={() => (
            <Empty
              title={
                category === ''
                  ? 'Não há nenhuma partida agendada'
                  : 'Não há nenhuma partida nesta categoria'
              }
            />
          )}
          refreshControl={
            <RefreshControl
              size={24}
              colors={[theme.colors.primary]}
              refreshing={false}
              onRefresh={loadAppointments}
            />
          }
        />
      )}

      <ModalView
        visible={showAppointmentRemove}
        closeModal={hideModal}
        style={{
          height: 200,
          position: 'absolute',
          bottom: 0,
          width: '100%',
        }}
      >
        <ApppointmentRemove id={appointmentIdSeleted} closeModal={hideModal} />
      </ModalView>
    </Background>
  );
}
