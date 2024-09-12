import { Dimensions, StyleSheet } from 'react-native';

const { height } = Dimensions.get('window');
const headerHeight = 50
const footerHeight = 60

export const baseStyles = StyleSheet.create({
    wrapper: {
        height: height + 20,
    },
    container: {
        marginVertical: 30
    },
    header: {
        height: headerHeight,
    },
    footer: {
        height: footerHeight,
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "space-around"
    },
    scrollView: {
        height: height - (headerHeight + footerHeight) + 17,

    },
    horizContainer: {
        paddingTop: 30,
        paddingBottom: 30,
    },
    vertContainer: {
        paddingLeft: 20,
        paddingRight: 20,
    },
    point: {
        borderRadius: 2.5,
        width: 5,
        height: 5
    },
    center: {
        display: 'flex',
        justifyContent: 'center',
        overflow: 'scroll',
        height: '100%'
    }
});
