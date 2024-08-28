import { StyleSheet } from 'react-native';
import theme from '../../../core/config/theme';

export const styles = StyleSheet.create({
    main:{
      width: '100%',
      padding: 20,
      backgroundColor: theme.color,
    borderRadius: 10
    },
    text:{
        textAlign: 'center',
        color: 'white',
        fontSize: 16
    }
});
