import { StyleSheet } from 'react-native';
import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottie: {
    height: 200,
    width: 200,
  },
  title: {
    fontSize: 18,
    fontFamily: theme.fonts.title500,
    color: theme.colors.primary,
    marginTop: 30,
    textAlign: 'center',
  },
});
