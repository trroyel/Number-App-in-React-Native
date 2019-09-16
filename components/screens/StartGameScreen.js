import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button,
    TouchableWithoutFeedback,
    Keyboard,
    Alert,
    Dimensions
} from 'react-native';

import Card from '../Card';
import Input from '../Input';
import MainButton from '../MainButton';
import Colors from '../../constants/colors';
import NumberContainer from '../NumberContainer';

const StartGameScreen = props => {
    const [enteredValue, setEnteredValue] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [slectedValue, setSelectedvalue] = useState();

    const numberInputHandler = inputText => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ''))
    };

    const resetInputHandler = () => {
        setEnteredValue('');
        setConfirmed(false);
    };

    const confirmInputHandler = () => {
        const choosenNumber = parseInt(enteredValue);

        if (isNaN(choosenNumber) || choosenNumber <= 0 || choosenNumber > 99) {
            Alert.alert(
                'Invalid Input',
                'choose a number between 1-99',
                [{ text: 'Okay', style: 'destructive', onPress: resetInputHandler }]
            );
            return;
        };
        setConfirmed(true);
        setSelectedvalue(choosenNumber);
        setEnteredValue('');
        Keyboard.dismiss();
    };

    let confirmedOutput;

    if (confirmed) {
        confirmedOutput = (
            <Card style={styles.summaryContainer}>
                <Text>You Selected</Text>
                <NumberContainer>{slectedValue}</NumberContainer>
                <MainButton
                    onPress={props.onStartGame.bind(this, slectedValue)} >
                    START GAME
                </MainButton>
            </Card>
        );
    };

    return (
        <TouchableWithoutFeedback
            onPress={() => Keyboard.dismiss()}>
            <View style={styles.screen}>
                <Text style={styles.title} >Start a New Game!</Text>
                <Card style={styles.inputContainer}>
                    <Text style={styles.inputTitle}>Select a Number</Text>
                    <Input
                        style={styles.input}
                        blurOnSubmit
                        autoCapitalize="none"
                        autoCorrect={false}
                        keyboardType="number-pad"
                        maxLength={2}
                        onChangeText={numberInputHandler}
                        value={enteredValue} />

                    <View style={styles.buttonContainer}>
                        <View style={styles.buttonLeft}>
                            <Button
                                title="Reset"
                                color={Colors.accent}
                                onPress={resetInputHandler} />
                        </View>

                        <View style={styles.buttonRight}>
                            <Button
                                title="Submit"
                                color={Colors.primary}
                                onPress={confirmInputHandler} />
                        </View>
                    </View>
                </Card>

                {confirmedOutput}
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
    },
    inputContainer: {
        width: 300,
        maxWidth: '80%',
        alignItems: 'center',
    },
    inputTitle: {
        fontSize: 18
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
    },
    buttonLeft: {
        width: Dimensions.get('window').width /4,
        borderTopLeftRadius: 30,
        borderBottomLeftRadius: 30,
        overflow: 'hidden'
    },
    buttonRight: {
        width: Dimensions.get('window').width /4,
        borderTopRightRadius: 30,
        borderBottomRightRadius: 30,
        overflow: 'hidden'
    },
    input: {
        width: 50,
        textAlign: 'center',
        marginBottom: 20
    },
    summaryContainer: {
        width: '70%',
        marginTop: Dimensions.get('window').height < 800 ? 10 : 20,
        alignItems: 'center',
        marginTop: 20
    }
})

export default StartGameScreen;