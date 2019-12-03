class GameBoard {
  constructor(boardLevel, imageArray, backImage) {
    this.resetBoard = this.resetBoard.bind(this);
    this.boardLevel = boardLevel;
    this.imageArray = this.duplicateArray(imageArray);
    this.increaseMatchedPairs = this.increaseMatchedPairs.bind(this);
    this.backImage = backImage;
    this.matchedPairs = 0;
    this.cards = [];
    this.cardsClicked = {
      firstCard: null,
      secondCard: null
    };
  }

  increaseMatchedPairs() {
    this.matchedPairs++;
    return this.matchedPairs;
  }

  resetBoard() {
    document.querySelector(`#${this.boardLevel} .content`).innerHTML = ''
    this.matchedPairs = 0;
    this.cards = [];
    this.cardsClicked = {
      firstCard: null,
      secondCard: null
    };
    this.imageArray = this.randomizeArray(this.imageArray)
    this.buildBoard();
  }

  buildBoard() {
    for (var image of this.imageArray) {
      var newCard = new Card(this);
      newCard.createCardDiv(image);
      newCard.render();
      this.cards.push(newCard);
    }
    document.getElementById(`${this.boardLevel}Reset`).addEventListener('click', this.resetBoard)
  }

  duplicateArray(array) {
    var doubled = Object.assign([], array);
    for (var i of array) {
      doubled.push(i);
    }
    return this.randomizeArray(doubled);
  }

  randomizeArray(array) {
    // using the insert method
    var newArray = []
    // insertion sort is very cool
    while (array.length > 0) {
      var index = Math.floor(Math.random() * array.length)
      newArray.push(array.splice(index, 1)[0]);
    }
    return newArray;
  }
}
