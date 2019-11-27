window.addEventListener('load', initializeApp);

var showsImages = [
  "assets/shows/arrest_development.jpg",
  "assets/shows/southpark.jpg",
  "assets/shows/community.jpg",
  "assets/shows/silicon.jpg",
  "assets/shows/itsalways.jfif",
  "assets/shows/tdhbo.jfif",
  "assets/shows/bettrcallsaul.jpg",
  "assets/shows/fisfor.jpg",
  "assets/shows/sherlock.jpg"
];

var movieImages = [
  "assets/movies/goodwill.jpg",
  "assets/movies/harrsally.jpg",
  "assets/movies/inception.jpg",
  "assets/movies/lambs.jpg",
  "assets/movies/prestige.jpg",
  "assets/movies/superbad.jpg",
  "assets/movies/nocountry.jpg",
  "assets/movies/nightcrawler.jpg",
  "assets/movies/avatar.webp"
]

var gameImages = [
  "assets/games/ac2.jfif",
  "assets/games/fonv.jpg",
  "assets/games/heavyrain.jpg",
  "assets/games/lou.jpg",
  "assets/games/me2.png",
  "assets/games/rdr.jpg",
  "assets/games/uncharted.jpg",
  "assets/games/walkingdead.jpg",
  "assets/games/xcom.jpg"
]

var showBackImage = "assets/shows/netflix-seeklogo.com.svg"
var movieBackImage = "assets/movies/admitone.png"
var gameBackImage = "assets/games/playstation.png"

function initializeApp(){
  document.querySelectorAll(".nav-buttons").forEach(function(elem) {
    elem.addEventListener("click", panelClick)
  })
  document.querySelector('.close').addEventListener("click", function() {
    document.getElementById('winModal').style.display = 'none';
  })
  document.querySelectorAll('.close-1').forEach(function (elem) {
    elem.addEventListener("click", function () {
      document.getElementById('winModal').style.display = 'none';
    })
  })

  var tvShowBoard = new GameBoard('tvshows', showsImages, showBackImage);
  tvShowBoard.buildBoard();
  var movieBoard = new GameBoard('movies', movieImages, movieBackImage);
  movieBoard.buildBoard();
  var gameBoard = new GameBoard('games', gameImages, gameBackImage);
  gameBoard.buildBoard();
}

function panelClick(event) {
  document.querySelectorAll('.panel').forEach(function(elem){
    if (elem.classList.contains('currentlyShown')){
      elem.classList.remove("currentlyShown")
    }
  })
  var panelRef = event.target.attributes.href.value;
  document.querySelector(panelRef).classList.add('currentlyShown')
}
