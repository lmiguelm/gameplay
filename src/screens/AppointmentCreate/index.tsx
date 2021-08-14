import React, { useCallback, useState } from 'react';
import { Text, View, ScrollView, KeyboardAvoidingView, Platform, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { CategorySelect } from '../../components/CategorySelect';
import { Header } from '../../components/Header';
import { GuildIcon } from '../../components/GuildIcon';
import { SmallInput } from '../../components/SmallInput';
import { Textarea } from '../../components/TextArea';
import { Button } from '../../components/Button';

import { styles } from './styles';
import { theme } from '../../global/styles/theme';
import { RectButton } from 'react-native-gesture-handler';
import { ModalView } from '../../components/ModalView';
import { Guilds } from '../Guilds';
import { GuildType } from '../../components/Guild';
import { useRef } from 'react';
import { Background } from '../../components/Background';

export function AppointmentCreate() {
  const textFieldDay = useRef<TextInput>(null);
  const textFieldMounth = useRef<TextInput>(null);
  const textFieldHour = useRef<TextInput>(null);
  const textFieldMinute = useRef<TextInput>(null);
  const textFieldDescriptopn = useRef<TextInput>(null);

  const [day, setDay] = useState<string>('');
  const [mounth, setMounth] = useState<string>('');
  const [hour, setHour] = useState<string>('');
  const [minute, setMinute] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const [category, setCategory] = useState<string>('');
  const [openGuildsModal, setOpenGuildsModal] = useState<boolean>(false);
  const [guild, setGuild] = useState<GuildType>({} as GuildType);

  function handleOpenGuilds() {
    setOpenGuildsModal(true);
  }

  const handleCloseGuilds = useCallback(() => {
    setOpenGuildsModal(false);
  }, []);

  function handleGuildSelect(guildSelected: GuildType) {
    setGuild(guildSelected);
    setOpenGuildsModal(false);
  }

  function handleSubmitForm() {
    console.log({ day, mounth, minute, hour, description });
    clearInputs();
  }

  const handleCategorySelect = useCallback(
    (categoryId: string) => {
      setCategory(categoryId);
    },
    [category]
  );

  function clearInputs() {
    setDay('');
    setMounth('');
    setHour('');
    setMinute('');
    setDescription('');
  }

  function onChangeTextDates(
    field: 'textFieldDay' | 'textFieldMounth' | 'textFieldHour',
    value: string
  ) {
    switch (field) {
      case 'textFieldDay':
        setDay(value);
        value.length === 2 && textFieldMounth.current?.focus();
        break;
      case 'textFieldMounth':
        setMounth(value);
        value.length === 2 && textFieldHour.current?.focus();
        break;
      case 'textFieldHour':
        setHour(value);
        value.length === 2 && textFieldMinute.current?.focus();
        break;
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={30}
    >
      <Background>
        <ScrollView>
          <Header title="Agendar partida" />

          <Text style={[styles.label, { marginLeft: 24, marginTop: 36, marginBottom: 18 }]}>
            Categoria
          </Text>

          <View>
            <CategorySelect
              hashCheckBox
              setCategory={handleCategorySelect}
              categorySelected={category}
            />
          </View>

          <View style={styles.form}>
            <RectButton onPress={handleOpenGuilds}>
              <View style={styles.select}>
                {guild.icon ? <GuildIcon /> : <View style={styles.image} />}

                <View style={styles.selectBody}>
                  <Text style={styles.label}>
                    {guild.name ? guild.name : 'Selecione um servidor'}
                  </Text>
                </View>

                <Feather name="chevron-right" color={theme.colors.heading} size={18} />
              </View>
            </RectButton>

            <View style={styles.field}>
              <View>
                <Text style={[styles.label, { marginBottom: 12 }]}>Dia e mês</Text>

                <View style={styles.column}>
                  <SmallInput
                    ref={textFieldDay}
                    maxLength={2}
                    returnKeyType="next"
                    onSubmitEditing={() => textFieldMounth.current?.focus()}
                    value={day}
                    onChangeText={(value) => onChangeTextDates('textFieldDay', value)}
                  />

                  <Text style={styles.divider}>/</Text>

                  <SmallInput
                    ref={textFieldMounth}
                    maxLength={2}
                    returnKeyType="next"
                    onSubmitEditing={() => textFieldHour.current?.focus()}
                    value={mounth}
                    onChangeText={(value) => onChangeTextDates('textFieldMounth', value)}
                  />
                </View>
              </View>

              <View>
                <Text style={[styles.label, { marginBottom: 12 }]}>Hora e minuto</Text>

                <View style={styles.column}>
                  <SmallInput
                    ref={textFieldHour}
                    maxLength={2}
                    returnKeyType="next"
                    onSubmitEditing={() => textFieldMinute.current?.focus()}
                    value={hour}
                    onChangeText={(value) => onChangeTextDates('textFieldHour', value)}
                  />

                  <Text style={styles.divider}>:</Text>

                  <SmallInput
                    ref={textFieldMinute}
                    maxLength={2}
                    returnKeyType="done"
                    value={minute}
                    onChangeText={(value) => setMinute(value)}
                  />
                </View>
              </View>
            </View>

            <View style={[styles.field, { marginBottom: 12 }]}>
              <Text style={styles.label}>Descrição</Text>
              <Text style={styles.caracteresLimit}>Max 100 caracteres</Text>
            </View>

            <Textarea
              ref={textFieldDescriptopn}
              multiline
              maxLength={100}
              numberOfLines={5}
              autoCorrect
              value={description}
              onChangeText={(value) => setDescription(value)}
            />

            <View style={styles.footer}>
              <Button onPress={handleSubmitForm}>Agendar</Button>
            </View>
          </View>
        </ScrollView>
      </Background>

      <ModalView visible={openGuildsModal} closeModal={handleCloseGuilds}>
        <Guilds handleGuildSelected={handleGuildSelect} />
      </ModalView>
    </KeyboardAvoidingView>
  );
}
