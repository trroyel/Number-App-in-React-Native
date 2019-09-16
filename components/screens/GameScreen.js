import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, FlatList } from 'react-native';

import Card from '../Card';
import MainButton from '../MainButton';
import NumberContainer from '../NumberContainer';

const generaterandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max - min)) + min;

    if (rndNum === exclude) {
        return generaterandomBetween(min, max, exclude);
    } else {
        return rndNum;
    }
};

//itemData will be provided by react-native automatically
const renderListItem = (listLength, itemData) => {
    return (
        <View style={styles.listItem}>
            <Text>#{listLength - itemData.index}</Text>
            <Text>{itemData.item}</Text>
        </View>
    );
};

const GameScreen = props => {

    const initialGuess = generaterandomBetween(1, 100, props.userChoice);

    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);

    const currentLow = useRef(1);
    const currentHigh = useRef(100);
    const { userChoice, onGameOver , onChangeTitle} = props;

    useEffect(() => {
        if (currentGuess === userChoice) {
            onGameOver(pastGuesses.length);
            onChangeTitle('Game is Over!');
        }
    }, [currentGuess, userChoice, onGameOver, onChangeTitle]);

    const nextGuessHandler = direction => {
        if ((direction === 'lower' && currentGuess < props.userChoice) ||
            (direction === 'greater' && currentGuess > props.userChoice)) {
            Alert.alert(
                'Don\'t lie!',
                'You know that, this is wrong!',
                [{ text: 'Sorry', style: 'cancel' }]
            );
            return;
        }

        if (direction === "lower") {
            currentHigh.current = currentGuess;
        } else {
            currentLow.current = currentGuess + 1;
        }

        const nextNumber = generaterandomBetween(
            currentLow.current,
            currentHigh.current,
            currentGuess);

        setCurrentGuess(nextNumber);
        setPastGuesses(current => [nextNumber.toString(), ...current]);
    };

    return (
        <View style={styles.screen}>
            <Text>Opponent's Guess</Text>

            <NumberContainer>
                {currentGuess}
            </NumberContainer>

            <Card style={styles.buttonContainer}>
                <MainButton
                    onPress={nextGuessHandler.bind(this, 'lower')} >
                    SMALLER
                </MainButton>

                <MainButton
                    onPress={nextGuessHandler.bind(this, 'greater')} >
                    GREATER
                </MainButton>
            </Card>
            <View style={styles.listContainer}>
                <FlatList
                    contentContainerStyle={styles.list}
                    keyExtractor={item => item}
                    data={pastGuesses}
                    renderItem={renderListItem.bind(this, pastGuesses.length)} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: 400,
        maxWidth: '90%'
    },
    listContainer: {
        flex: 1,
        width: '80%'
    },
    list: {
        flexGrow: 1,
        justifyContent: 'flex-end',
    },
    listItem: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        borderColor: '#ccc',
        borderWidth: 1,
        marginVertical: 5,
        padding: 10
    }
});

export default GameScreen;