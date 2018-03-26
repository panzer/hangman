import { Component, OnInit, enableProdMode } from "@angular/core";
import { Http, Response } from "@angular/http";
import words from "../assets/words-clean";
//enableProdMode();

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "The Hangman Challenge";

  // Initial values are found in reset()
  guessLetter;
  incorrectLetters;
  word;
  letters;
  maxIncorrect;
  error;
  figureSrc;

  ngOnInit() {
    this.reset();
  }

  onGuess = guessLetter => {
    // Make lowercase
    guessLetter = guessLetter.toLowerCase();

    // Show error if not a single letter
    if (!/^[a-z]{1}$/.test(guessLetter)) {
      this.error = "Please enter a single letter";
      return;
    }
    // This letter was guessed and it was incorrect
    if (this.incorrectLetters.includes(guessLetter)) {
      this.error = `You've already guessed ${guessLetter}`;
      return;
    }
    // This letter was guessed and it was incorrect
    if (this.letters.includes(guessLetter)) {
      this.error = `You've already guessed ${guessLetter}`;
      return;
    }

    if (this.word.includes(guessLetter)) {
      // If the letter is in the word
      this.letters.push(guessLetter);
    } else {
      // Letter is not found in the word
      this.incorrectLetters.push(guessLetter);
    }

    this.updateFigureSrc();
    console.log(this.winCondition());

    // Clear guess input and error
    this.guessLetter = "";
    this.error = "";
    let input = document.getElementById("input");
    input.focus();
  };

  reset = () => {
    this.guessLetter = "";
    this.incorrectLetters = [];
    this.word = this.randomWord();
    this.letters = [];
    this.maxIncorrect = 10;
    this.error = "";
    this.figureSrc = "./assets/Drawing-0.png";
  };

  randomWord = () => {
    let len = words.length;
    let i = Math.floor(Math.random() * len);
    return words[i];
  };

  updateFigureSrc = () => {
    let n = this.incorrectLetters.length;
    this.figureSrc = `./assets/Drawing-${n}.png`;
  };

  winCondition = () => {
    for (let c of this.word) {
      if (!this.letters.includes(c)) {
        return false;
      }
    }
    return true;
  };
  loseCondition = () => this.incorrectLetters.length >= this.maxIncorrect;
}
