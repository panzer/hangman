import { Component, OnInit, enableProdMode } from "@angular/core";
import { WordService } from "./word.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "The Hangman Challenge";

  // Initial values are found in reset()
  guessLetter; // Most recent guess
  incorrectLetters; // Guessed letters that are incorrect
  word; // The correct word (answer)
  letters; // Correctly guessed letters
  maxIncorrect = 10; // Maximum incorrect guesses allowed before loss
  error; // Error message to be displayed for input
  figureSrc; // Drawing (stick figure) url
  loading = true;

  constructor(private wordService: WordService) {}

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
      this.error = `You've already guessed ${guessLetter.toUpperCase()}`;
      return;
    }
    // This letter was guessed and it was incorrect
    if (this.letters.includes(guessLetter)) {
      this.error = `You've already guessed ${guessLetter.toUpperCase()}`;
      return;
    }

    if (this.word.includes(guessLetter)) {
      // If the letter is in the word
      this.letters.push(guessLetter);
    } else {
      // Letter is not found in the word
      this.incorrectLetters.push(guessLetter);
    }

    // Update drawing (stick figure)
    this.updateFigureSrc();

    // Clear guess input and error
    this.guessLetter = "";
    this.error = "";

    // Focus on input (makes it easier to put another letter)
    let input = document.getElementById("input");
    input.focus();
  };

  reset = () => {
    this.guessLetter = "";
    this.incorrectLetters = [];
    this.loading = true;
    this.getRandomWord(r => {
      this.word = r.json();
      this.loading = false;
    });
    this.letters = [];
    this.error = "";
    this.figureSrc = "./assets/Drawing-0.png";
  };

  getRandomWord = callback => {
    this.wordService.getWord().subscribe(r => callback(r));
  };

  updateFigureSrc = () => {
    let n = this.incorrectLetters.length;
    this.figureSrc = `./assets/Drawing-${n}.png`;
  };

  winCondition = () => {
    // For each character of the answer, if it's not in "guessed letters"
    //  then we haven't won
    for (let c of this.word) {
      if (!this.letters.includes(c)) {
        return false;
      }
    }
    return true;
  };
  loseCondition = () => this.incorrectLetters.length >= this.maxIncorrect;
}
