import { StyleSheet } from 'react-native';
import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 30,
  },
  animation: {
    height: 300,
    width: 300,
  },
  textContainer: {
    marginTop: -60,
  },
  title: {
    fontFamily: theme.fonts.title700,
    color: theme.colors.heading,
    fontSize: 32,
    textAlign: 'center',
    marginBottom: 10,
  },
  errorMessage: {
    fontFamily: theme.fonts.text400,
    color: theme.colors.heading,
    fontSize: 18,
    textAlign: 'center',
  },
});
