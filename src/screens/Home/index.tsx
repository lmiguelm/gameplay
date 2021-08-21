import React, { useState, useCallback, useEffect } from 'react';
import { View, FlatList, RefreshControl, ActivityIndicator } from 'react-native';

import { Appointment, AppointmentType } from '../../components/Appointment';
import { ButtonAdd } from '../../components/ButtonAdd';
import { CategorySelect } from '../../components/CategorySelect';
import { ListDivider } from '../../components/ListDivider';
import { ListHeader } from '../../components/ListHeader';
import { Profile } from '../../components/Profile';
import { Background } from '../../components/Background';

import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';

import { Empty } from '../../components/Empty';
import { theme } from '../../global/styles/theme';
import { ModalView } from '../../components/ModalView';
import { ApppointmentRemove } from '../AppointmentRemove';
import { useAppointment } from '../../hooks/useAppointment';

export function Home() {
  const { loading, appointments, fetchAppointments } = useAppointment();
  const { navigate } = useNavigation();

  const [category, setCategory] = useState<string>('');
  const [showAppointmentRemove, setShowAppointmentRemove] = useState<boolean>(false);
  const [appointmentIdSeleted, setAppointmentIdSelected] = useState<string | undefined>(undefined);
  const [filteredAppointments, setFilteredAppointments] = useState<AppointmentType[]>([]);

  useEffect(() => {
    setFilteredAppointments(appointments);
  }, [appointments]);

  useEffect(() => {
    if (category === '') {
      setFilteredAppointments(appointments);
      return;
    }

    setFilteredAppointments(
      appointments.filter((appointment) => appointment.category === category)
    );
  }, [category]);

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
          data={filteredAppointments}
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
              onRefresh={fetchAppointments}
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
