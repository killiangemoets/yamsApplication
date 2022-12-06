import React, { useState, useEffect } from "react";
// import { Route, Link } from "react-router-dom";
// import { Route, Link, withRouter } from "react-router-dom";
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dice from "./components/dice.jsx";
import Buttons from "./components/buttons";
import Combinations from "./components/combinations";
import Numbers from "./components/numbers";
import Header from "./components/header";
import CurrentPlayer from "./components/currentPlayer";
import StartMenu from "./components/startMenu";
import PauseMenu from "./components/pauseMenu";
import Rules from "./components/rules";
import EndGame from "./components/endGame.jsx";
import Usernames from "./components/usernames";
import KikiStore from "./components/kikistore";
import BlackScreen from "./components/balckscreen";

import * as modele from "./components/modele";
import "./App.css";
import "./AppStyleMenu.css";
import "./Queries.css";

function App() {
  const [diceValues, setDiceValues] = useState([]);
  const [rollsCount, setRollsCount] = useState(modele.state.rollsCount);
  const [possibilities, setPossibilities] = useState(
    modele.state.possibilities
  );
  const [scores, setScores] = useState([...modele.state.scores]);
  const [gameBoard, setGameBoard] = useState(
    modele.state.gameBoards[modele.state.currentPlayer]
  );
  const [blockDices, setBlockDices] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(
    modele.state.currentPlayer
  );
  const [bestScores, setbestScores] = useState([]);
  const [usernames, setUsernames] = useState([]);
  const [invalidUsernames, setInvalidUsernames] = useState("");

  async function getAllBestScores() {
    var rawResponse = await fetch("https://yamsapplicationbackend-production.up.railway.app/allscores");
    var response = await rawResponse.json();

    const bestScores = response.data.scores.sort((a, b) => b.score - a.score);
    setbestScores(() => bestScores);
  }

  // async function addBestScore(username, score) {
  //   await fetch("/addscore", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/x-www-form-urlencoded",
  //     },
  //     body: `username=${username}&score=${score}`,
  //   });
  // }

  async function updateBestScores(NewBestScores) {
    await fetch("https://yamsapplicationbackend-production.up.railway.app/replaceallscores", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(NewBestScores),
    });
  }

  function init() {
    document
      .querySelectorAll(".background-menu")
      .forEach((menu) => menu.classList.add("hidden"));
    document.querySelector(".start").classList.remove("hidden");

    modele.initGame();
    modele.createGameBoards();
    setDiceValues([]);
    setRollsCount(modele.state.rollsCount);
    setPossibilities(modele.state.possibilities);
    setScores([...modele.state.scores]);
    setGameBoard(modele.state.gameBoards[modele.state.currentPlayer]);
    setBlockDices([]);
    setCurrentPlayer(modele.state.currentPlayer);
    getAllBestScores();
  }

  useEffect(() => {
    init();
    setTimeout(function () {
      document.querySelector(".black-screen").classList.add("hidden");
    }, 1000);
    setTimeout(function () {
      document.querySelector(".background-kikistore").classList.add("hidden");
    }, 3000);
  }, []);

  function startGame(numPlayers) {
    if (
      !usernames.filter((el) => el === "").length &&
      !usernames.filter((el) => el.length > 12).length
    ) {
      modele.setNumPlayers(numPlayers);
      setScores([...modele.state.scores]);
      modele.createGameBoards();
      setGameBoard(modele.state.gameBoards[modele.state.currentPlayer]);
      document.querySelector(".usernames").classList.add("hidden");
    } else if (usernames.filter((el) => el === "").length) {
      setInvalidUsernames("Please enter a username for each player!");
    } else if (usernames.filter((el) => el.length > 12).length) {
      setInvalidUsernames("A username cannot be longer than 12 characters!");
    }
  }

  function getUsernames(username, i) {
    setUsernames((previousState) => {
      const newState = [...previousState];
      newState.splice(i, 1, username);
      return newState;
    });
  }

  function chooseNumPlayers(numPlayers) {
    modele.setNumPlayers(numPlayers);
    setScores([...modele.state.scores]);
    modele.createGameBoards();
    setGameBoard(modele.state.gameBoards[modele.state.currentPlayer]);
    setUsernames(() => Array(numPlayers).fill(""));
    document.querySelector(".start").classList.add("hidden");
    document.querySelector(".usernames").classList.remove("hidden");
  }

  async function handleEndGame() {
    let allScoresArray = bestScores.map((el) => {
      return {
        username: el.username,
        score: +el.score,
      };
    });
    modele.state.scores.forEach((score, i) => {
      allScoresArray.push({
        username: usernames[i],
        score,
      });
    });
    allScoresArray = allScoresArray.sort((a, b) => b.score - a.score);
    if (allScoresArray.length > 10)
      allScoresArray = allScoresArray.slice(0, 10);
    await updateBestScores(allScoresArray);
    await getAllBestScores();
  }

  function handleRollDices() {
    if (rollsCount === 0) return;
    document
      .querySelectorAll(".score")
      .forEach((el) => el.classList.remove("selected-possibility"));
    document.querySelector(".btn--play").classList.add("btn--off");

    setDiceValues(modele.rollTheDices());
    setRollsCount(modele.decreaseRollCount());
    modele.calculateNumberPossibilities();
    modele.calculateCombinationPossibilities();
    setPossibilities(modele.state.possibilities);
  }

  function handleSelectPossibility(e, value, type) {
    if (diceValues.length && !e.target.classList.contains("previous-score")) {
      modele.updateSelectedPossibility(value, type);
      document
        .querySelectorAll(".score")
        .forEach((el) => el.classList.remove("selected-possibility"));
      e.target.classList.add("selected-possibility");
      document.querySelector(".btn--play").classList.remove("btn--off");
    }
  }

  function handleBlockDice(i) {
    setBlockDices([...modele.blockADice(i)]);
  }

  function handlePlay() {
    if (document.querySelector(".btn--play").classList.contains("btn--off"))
      return;
    modele.updateScoreCurrentPlayer();

    modele.updateGameBoard();
    const gameState = modele.nextPlayer();
    setCurrentPlayer(modele.state.currentPlayer);
    setGameBoard(modele.state.gameBoards[modele.state.currentPlayer]);

    modele.clearDices();
    setDiceValues(modele.state.currentDices);
    setBlockDices(modele.state.blockDices);

    modele.restartRollsCount();
    setRollsCount(modele.state.rollsCount);

    modele.clearPossibilities();
    setPossibilities(modele.state.possibilities);

    document
      .querySelectorAll(".score")
      .forEach((el) => el.classList.remove("selected-possibility"));
    document.querySelector(".btn--play").classList.add("btn--off");
    setDiceValues(modele.state.currentDices);
    setScores(() => [...modele.state.scores]);

    if (gameState) {
      handleEndGame();
      document.querySelector(".end").classList.remove("hidden");
    }
  }

  return (
    <div className="app">
      <div className="container">
        <header>
          <Header scores={scores} usernames={usernames} />
        </header>
        <main>
          <section className="title-section">
            <CurrentPlayer currentUsername={usernames[currentPlayer]} />
          </section>
          <section className="possibilities-section">
            <div className="numbers">
              <Numbers
                possibleScores={possibilities.numbers}
                handleSelectPossibility={handleSelectPossibility}
                gameBoard={gameBoard}
              />
            </div>
            <div className="combinations">
              <Combinations
                possibleScores={possibilities.combinations}
                handleSelectPossibility={handleSelectPossibility}
                gameBoard={gameBoard}
              />
            </div>
          </section>
          <section className="dices-section">
            <Dice
              diceValues={diceValues}
              handleBlockDice={handleBlockDice}
              blockDices={blockDices}
            />
          </section>
          <section className="buttons-section">
            <Buttons
              rollsCount={rollsCount}
              handleRollDices={handleRollDices}
              handlePlay={handlePlay}
            />
          </section>
        </main>
      </div>
      {/* <Router>
        <Switch>
          <Route exact path="*" component={StartMenu} />
          <Route path="/end" component={EndGame} />
          <Route path="/pause" component={PauseMenu} />
          <Route path="/rules" component={Rules} />
          <Route path="/game" />
        </Switch>
      </Router> */}
      <StartMenu chooseNumPlayers={chooseNumPlayers} />
      <PauseMenu init={init} />
      <Rules />
      <EndGame
        scores={scores}
        init={init}
        bestScores={bestScores}
        usernames={usernames}
      />
      <Usernames
        startGame={startGame}
        numPlayers={scores.length}
        getUsernames={getUsernames}
        invalidUsernames={invalidUsernames}
      />
      <KikiStore />
      <BlackScreen />
    </div>
  );
}

export default App;
