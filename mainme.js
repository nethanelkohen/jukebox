$(document).ready(function() {

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

  controller.addEventListener('mouseover', function(event) {
    let btn = event.target.id;
    if (btn === "play") {
      myJukeBox.play();
    }
  });
  controller.addEventListener('click', function(event) {
    let btn = event.target.id;
    if (btn === "submit") {
      myJukeBox.load(document.getElementById("urllocation").value);
      document.getElementById("urllocation").value = "";
    } else if (btn === "pause") {
      myJukeBox.pause();
    } else if (btn === "add") {
      controller.innerHTML += `<input id='urllocation' placeholder="Please enter the url">
      <button id="submit">Load</button>`;
    }
  });
  document.addEventListener('keypress', function(e) {
    if (e.which === 13) {
      myJukeBox.stop();
    }
  });
});
