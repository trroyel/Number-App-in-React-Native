import React from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';
import Colors from '../../constants/colors';
import MainButton from '../MainButton';

const GameOverScreen = props => {
    return (
        <View style={styles.screen}>
            <Text>Prepare for new game!</Text>
            <View style={styles.imageContainer}>
                <Image
                    source={require('../../assets/success.png')}
                    fadeDuration={1000}
                    style={styles.image}
                    resizeMode="cover" />
            </View>
            <Text style={styles.resultText}>
                Your phone needs
                <Text style={styles.text}> {props.roundNumber} </Text>
                steps to guess the number
                <Text style={styles.text}> {props.userNumber} </Text>
            </Text>
            <MainButton onPress={props.onRestartGame} >
                NEW GAME
            </MainButton>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageContainer: {
        width: 300,
        height: 300,
        borderRadius: 150,
        borderWidth: 3,
        borderColor: 'black',
        overflow: 'hidden',
        marginVertical: 30
    },
    image: {
        width: '100%',
        height: '100%'
    },
    resultText: {
        textAlign: "center",
        fontSize: 20,
        margin: 20
    },
    text: {
        color: Colors.primary
    }
});

export default GameOverScreen;