/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import Header from './components/Header';
import GameScreen from './components/screens/GameScreen';
import StartGameScreen from './components/screens/StartGameScreen';
import GameOverScreen from './components/screens/GameOverScreen';

export default function App() {

  //React Hook for state management
  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);
  const [title, setTitle] = useState('Guess a Number');

  const configureNewGamehandler = () => {
    setGuessRounds(0);
    setUserNumber(null);
    setTitle('Guess a Number');
  }

  const startGameHandler = selectedNumber => {
    setUserNumber(selectedNumber);
    setGuessRounds(0);
  }

  const gameOverHandler = numOfRounds => {
    setGuessRounds(numOfRounds);
  }

  const changeTitleHandler = title =>{
    setTitle(title);
  }

  let content;

  if (userNumber && guessRounds <= 0) {
    content = <GameScreen
      userChoice={userNumber}
      onGameOver={gameOverHandler}
      onChangeTitle = {changeTitleHandler} />

  } else if (guessRounds > 0) {
    content = <GameOverScreen
      userNumber={userNumber}
      roundNumber={guessRounds}
      onRestartGame={configureNewGamehandler} />

  } else {
    content = <StartGameScreen
      onStartGame={startGameHandler} />;
  }

  return (
    <View style={styles.screen}>
      <Header
        title={title} />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
});