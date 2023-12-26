var hangmanGame = {
  wordsToPick: {
    coldplay: {
      song: "Yellow",
    },
    rammstein: {
      song: "Deutschland",
    },
    seventeen: {
      song: "God of Music",
    },
    abba: {
      song: "Gimme! Gimme! Gimme!",
    },
    radiohead: {
      song: "Every In Its Right Place",
    },
    maneskin: {
      song: "HONEY(ARE U COMMING?)",
    },
    twice: {
      song: "MOONLIGHT SUNRISE",
    },
    nirvana: {
      song: "Smels Like Teen Spirit",
    },
    morat: {
      song: "No Se Va",
    },
    metallica: {
      song: "Enter Sandman",
    },
    blackpink: {
      song: "How You Like That",
    }
  },

  wordInPlay: null,
  lettersOfTheWord: [],
  matchedLetters: [],
  guessedLetters: [],
  guessesLeft: 0,
  totalGuesses: 0,
  letterGuessed: null,
  wins: 0,

  setupGame: function() {
    var objKeys = Object.keys(this.wordsToPick);
    this.wordInPlay = objKeys[Math.floor(Math.random() * objKeys.length)];

    this.lettersOfTheWord = this.wordInPlay.split("");
    this.rebuildWordView();
    this.processUpdateTotalGuesses();
  },

  updatePage: function(letter) {
    if (this.guessesLeft === 0) {
      this.restartGame();
    }
    else {
      this.updateGuesses(letter);
      this.updateMatchedLetters(letter);
      this.rebuildWordView();

      if (this.updateWins() === true) {
        this.restartGame();
      }
    }
  },

  updateGuesses: function(letter) {
    if ((this.guessedLetters.indexOf(letter) === -1) && (this.lettersOfTheWord.indexOf(letter) === -1)) {
      this.guessedLetters.push(letter);
      this.guessesLeft--;

      document.querySelector("#guesses-remaining").innerHTML = this.guessesLeft;
      document.querySelector("#guessed-letters").innerHTML =
      this.guessedLetters.join(", ");
    }
  },

  processUpdateTotalGuesses: function() {
    this.totalGuesses = this.lettersOfTheWord.length + 5;
    this.guessesLeft = this.totalGuesses;

    document.querySelector("#guesses-remaining").innerHTML = this.guessesLeft;
  },

  updateMatchedLetters: function(letter) {
    for (var i = 0; i < this.lettersOfTheWord.length; i++) {
      if ((letter === this.lettersOfTheWord[i]) && (this.matchedLetters.indexOf(letter) === -1)) {
        this.matchedLetters.push(letter);
      }
    }
  },

  rebuildWordView: function() {
    var wordView = "";
    for (var i = 0; i < this.lettersOfTheWord.length; i++) {
      if (this.matchedLetters.indexOf(this.lettersOfTheWord[i]) !== -1) {
        wordView += this.lettersOfTheWord[i];
      }
      else {
        wordView += "&nbsp;_&nbsp;";
      }
    }
    document.querySelector("#current-word").innerHTML = wordView;
  },

  restartGame: function() {
    document.querySelector("#guessed-letters").innerHTML = "";
    this.wordInPlay = null;
    this.lettersOfTheWord = [];
    this.matchedLetters = [];
    this.guessedLetters = [];
    this.guessesLeft = 0;
    this.totalGuesses = 0;
    this.letterGuessed = null;
    this.setupGame();
    this.rebuildWordView();
  },

  updateWins: function() {
    var win;
    if (this.matchedLetters.length === 0) {
      win = false;
    }
    else {
      win = true;
    }
    for (var i = 0; i < this.lettersOfTheWord.length; i++) {
      if (this.matchedLetters.indexOf(this.lettersOfTheWord[i]) === -1) {
        win = false;
      }
    }
    if (win) {
      this.wins = this.wins + 1;
      document.querySelector("#wins").innerHTML = this.wins;
      document.querySelector("#music").innerHTML = this.wordsToPick[this.wordInPlay].song + " By " + this.wordInPlay;

      return true;
    }
    return false;
  }
};

hangmanGame.setupGame();

document.onkeyup = function(event) {
  hangmanGame.letterGuessed = String.fromCharCode(event.which).toLowerCase();
  hangmanGame.updatePage(hangmanGame.letterGuessed);
};