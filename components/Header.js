import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

import Colors from '../constants/colors';

const Header = props => (
    <View style={styles.header}>
        <Text style={styles.headerTitle}>
            {props.title}
        </Text>
    </View>
);

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 90,
        paddingTop: Dimensions.get('window').height > 800 ? 36 : 20,
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomStartRadius: 35,
        borderBottomEndRadius: 35
    },
    headerTitle: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 22
    }
});

export default Header;