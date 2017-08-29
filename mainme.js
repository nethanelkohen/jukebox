let audio = document.getElementById("audio");
let list = document.getElementById("playlist");

function JukeBox(audioObj) {
  this.audioObj = audioObj;
  this.songList = [];
  this.load = function(song) {
    this.songList.push(song);
    let songId = this.songList.indexOf(song);
    list.innerHTML += `<li>${song}</li>`;
    audioObj.src = song;
  };
}

JukeBox.prototype.pause = function() {
  this.audioObj.pause();
};

JukeBox.prototype.play = function() {
  this.audioObj.play();
};

JukeBox.prototype.stop = function() {
  this.audioObj.pause();
  audio.currentTime = 0;
};

let myJukeBox = new JukeBox(audio);
let controller = document.getElementById('controller');
myJukeBox.load("Ophelia.mp3");

play.addEventListener('mouseover', function(event) {
  myJukeBox.play();
});

controller.addEventListener('click', function(event) {
  let btn = event.target.id;
  if (btn === "submit") {
    myJukeBox.load(document.getElementById("urllocation").value);
    document.getElementById("urllocation").value = "";
  } else if (btn === "pause") {
    myJukeBox.pause();
  } else if (btn === "add") {
    controller.innerHTML += `<input id='urllocation' placeholder="Please enter the file path">
      <button id="submit">Load</button>`;
  }
});

document.addEventListener('keypress', function(e) {
  if (e.which === 13) {
    myJukeBox.stop();
  }
});

SC.initialize({
  client_id: 'fd4e76fc67798bfa742089ed619084a6'
});

var image;
var songTitle;
var songID;
var userLink;
var description;
var genre;
var username;
var trackLink;
var tracks;

var scTitle = document.getElementById("title");
var scInfo = document.getElementById("info");

document.getElementById('scSubmitButton').addEventListener('click', function(event) {
  var userSearch = document.getElementById('scSearch').value;
  SC.get('/tracks', {
    q: userSearch,

  }).then(function(tracks) {
    console.log(tracks);
    image = tracks[0]["artwork_url"];
    songTitle = tracks[0]["title"];
    songID = tracks[0]["id"];
    userLink = tracks[0]["user"]["permalink_url"];
    trackLink = tracks[0]["permalink_url"];
    description = tracks[0]["description"];
    genre = tracks[0]["genre"];
    username = tracks[0]["user"]["username"];
    scTitle.innerHTML += `<h2>${songTitle} by ${username}</h2>
  <a href=${userLink}>Artist Link</a>
  <br>
  <a href=${trackLink}>Track Link</a>`;
    scInfo.innerHTML += `<h3><img src=${image}>
  <br>
  Genre: ${genre}
  <br>
  Description: ${description}</h3>`;
  });
});

var stream = '';

scplayBtn.addEventListener('click', function(event) {
  if (stream === '') {
    SC.stream("/tracks/" + songID).then(function(player) {
      stream = player;
      player.play();
    });
  } else {
    stream.play();
  }
});

scpauseBtn.addEventListener('click', function(player) {
  stream.pause();
  console.log(stream);
});
