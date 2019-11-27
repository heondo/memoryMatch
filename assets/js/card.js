class Card {
  constructor(parent){ // parent is the gameboard Object
    this.boardLevel = parent.boardLevel;
    this.isFlipped = false;
    this.isPaired = false;
    this.frontImage = null;
    this.backImage = parent.backImage;
    this.increaseMatchedPairs = parent.increaseMatchedPairs;
    this.isMatched = false;
    this.cardsClicked = parent.cardsClicked;
    this.cardDomElement = null;
    this.flipCard = this.flipCard.bind(this);
    this.compareImages = this.compareImages.bind(this);
    this.rotateCard = this.rotateCard.bind(this);
    this.resetTwoCards = this.resetTwoCards.bind(this);
  }
  // so create a Card, and then with that card you want to
  createCardDiv(image) {
    this.cardDomElement = document.createElement("div");
    this.cardDomElement.setAttribute("class", "card");
    this.frontImage = image;
    var innerCard = document.createElement("div");
    innerCard.setAttribute("class", "card-inner");
    var cardFront = document.createElement("div");
    cardFront.setAttribute("class", "cardFront");
    cardFront.style.cssText=`background-image:url('${image}')`;
    var cardBack = document.createElement("div");
    cardBack.setAttribute("class", "cardBack toRefCardBack");
    cardBack.style.cssText = `background-image:url('${this.backImage}')`
    innerCard.appendChild(cardFront);
    innerCard.appendChild(cardBack);
    this.cardDomElement.appendChild(innerCard).addEventListener("click", this.flipCard);
  }

  unFlip() {
    this.isFlipped =  false;
    this.isPaired = false;
    if (this.cardsClicked.firstCard) {
      this.cardsClicked.firstCard = null;
      this.cardsClicked.secondCard = null;
    }
    this.cardDomElement.classList.remove("flipped");
    this.cardDomElement.querySelector(".card-inner").classList.remove("rotateXCard");

  }

  flipCard(){
    // this is going to be a click handler so bind is needed
    // when you flip a single card, set it to flipped
    if (this.isFlipped || this.isPaired || (this.cardsClicked.firstCard && this.cardsClicked.secondCard)) {
      return false;
    }
    if (!this.cardsClicked.firstCard){
      this.rotateCard()
      this.cardsClicked.firstCard = this;
      return;
    }
    else if (!this.cardsClicked.secondCard){
      this.rotateCard();
      this.cardsClicked.secondCard = this;
      // store it into the second card. Okay,
    }
    if (this.compareImages()){
      // cards are a match. Make paired true
      this.cardsClicked.firstCard.isPaired = true;
      this.cardsClicked.secondCard.isPaired = true;
      this.cardsClicked.firstCard = null;
      this.cardsClicked.secondCard = null;
    }
    else{
      setTimeout(this.resetTwoCards, 750);
    }
  }


  compareImages(){
    var image1 = this.cardsClicked.firstCard.frontImage;
    var image2 = this.cardsClicked.secondCard.frontImage;
    if (image1 === image2){
      var numMatched = this.increaseMatchedPairs();
      if (numMatched === 9) {
        var boardLevelText = this.boardLevel;
        var descriptionText;
        if (boardLevelText === 'tvshows') {
          descriptionText = "It's almost impossible to pick only 9 favorite shows but it's all about comedy or a great story.<br>Also if you love Breaking Bad <strong>please</strong> give Better Call Saul a try.";
          boardLevelText = 'tv shows';
        }
        if (boardLevelText === 'movies') {
          descriptionText = "Personally more of a TV show guy myself but I always surprise myself when I find a great movie. I guess I'm just so sad it does not fulfill the rule of 'Six Seasons and a Movie!'.";
        }
        if (boardLevelText === 'games') {
          descriptionText = "I can't describe myself as a 'gamer' because there are very few games that I <strong>must</strong> play right away.<br>But when I first saw Uncharted 2 for the PS3 I was blown away and bought the console just for that game. ";
        }
        document.getElementById('modal-text').innerHTML = descriptionText;
        document.getElementById('modal-header').innerHTML = `My favorite ${boardLevelText}`;
        document.getElementById('winModal').style.display = 'block';
      }
      // if its 9, open a win modal
      return true;
    }
    else{
      return false;
    }
  }

  resetTwoCards(){
    this.cardsClicked.firstCard.rotateCard();
    this.cardsClicked.secondCard.rotateCard();
    this.cardsClicked.firstCard = null;
    this.cardsClicked.secondCard = null;
  }

  rotateCard(){
    this.isFlipped = !this.isFlipped;
    // this could toggle a class to allow the hover
    this.cardDomElement.classList.toggle("flipped");
    this.cardDomElement.querySelector(".card-inner").classList.toggle("rotateXCard");
  }

  render(){
    document.querySelector(`#${this.boardLevel} .content`).appendChild(this.cardDomElement);
  }
}
