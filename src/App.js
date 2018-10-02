import React, { Component } from 'react';
import ClickCard from "./components/ClickCard";
import Jumbotron from "./components/Jumbotron";
import Nav from "./components/Nav";
import Wrapper from "./components/Wrapper";
import characters from "./characters.json";
import './App.css';

class App extends Component {
  state = {
    characters,
    currentScore: 0,
    highScore: 0,
    clickedCharacters: [],
    message: "Click a card to begin!"
  };

  // Shuffles array
  handleShuffle = characters => {
    for (let i = characters.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [characters[i], characters[j]] = [characters[j], characters[i]]
    }
    return characters;
  }

  // Updates high score if current score is greater
  handleHighScoreCheck = () => {
    if (this.state.currentScore >= this.state.highScore) {
      this.state.highScore = this.state.currentScore
    } else {
      this.state.highScore = this.state.highScore
    }
    return this.state.highScore
  }

  handleClick = id => {
    let clickedCharacters = this.state.clickedCharacters;

    // If you guessed incorrectly game will reset
    if(clickedCharacters.includes(id)) {
      this.setState({
        characters,
        clickedCharacters: [],
        currentScore: 0,
        highScore : this.handleHighScoreCheck(),
        message: "You clicked the same card twice! Try again"
      })
      this.handleShuffle(characters);
    }
    // If you guessed correctly
    else {
      clickedCharacters.push(id)
      this.setState({
        characters,
        currentScore: clickedCharacters.length,
        message: "Nice! You guessed correctly!"
      })  
      this.handleShuffle(characters);
      // If you win
      if(clickedCharacters.length === 18) {
        this.setState({
          characters,
          currentScore: 0,
          highScore: 18,
          clickedCharacters: [],
          message: "You Win!"
        })
      }
    }
  }

  render() {
    return (
      <Wrapper>
        <Nav
          title="Boku No Hero Clicky Game"
          currentScore={this.state.currentScore}
          highScore={this.state.highScore}
        />
        <Jumbotron
          message={this.state.message}
        />
        {this.state.characters.map(character => (
          <ClickCard
            id={character.id}
            key={character.id}
            name={character.name}
            image={character.image}
            handleClick={this.handleClick}
          />
        ))}
      </Wrapper>
    );
  }
}

export default App;
