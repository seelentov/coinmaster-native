import { StyleSheet } from 'react-native';
import theme from '../../../core/config/theme';

export const styles = StyleSheet.create({
    main: {
        borderTopColor: theme.desc,
        borderTopWidth: 1,
        position: 'static',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '8%',
        backgroundColor: 'white',
        paddingLeft: 20,
        paddingRight: 20,
    },
    list: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        height: '100%',
    },
    item: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});
