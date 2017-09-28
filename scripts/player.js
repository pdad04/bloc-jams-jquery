class Player {
  constructor () {
    this.currentlyPlaying = album.songs[0];
    this.playState = 'stopped';
    this.volume = 80;
    this.soundObject = new buzz.sound(this.currentlyPlaying.soundFileUrl);
  }

  getDuration() {
    return this.soundObject.getDuration();
  }

  getTime() {
    if(this.playState == 'stopped') {return;}
    return this.soundObject.getTime();
  }

  prettyTime(timeInSeconds) {
    if(timeInSeconds === undefined) {return;}

    // Convert number to whole seconds
    var wholeTime = Math.floor(timeInSeconds);

    // Get number of minutes
    var minutes = (wholeTime / 60 );

    // Convert decimal portion back into seconds and round to nearest whole
    //var seconds = Math.round((minutes % 1) * 60);
    var seconds = Math.round(timeInSeconds % 60);

    // For proper formating, if seconds < 10, add a '0' as a place holder
    // so time reads as 0:00
    if(seconds < 10) {
      return Math.floor(minutes).toString() + ":" + "0" + seconds.toString();
    }
    return Math.floor(minutes).toString() + ":" + seconds.toString();
  }

  playPause (song = this.currentlyPlaying) {
    if (this.currentlyPlaying !== song) {
      // Stop the currently playing sound file (even if nothing is playing)
      this.soundObject.stop();
      // Clear classes on the song that's currently playing
      this.currentlyPlaying.element.removeClass('playing paused');

      // Update our currentlyPlaying and playState properties
      this.currentlyPlaying = song;
      this.playState = 'stopped';
      this.soundObject = new buzz.sound(this.currentlyPlaying.soundFileUrl);
    }
    if (this.playState === 'paused' || this.playState === 'stopped') {
      this.soundObject.setVolume( this.volume );
      this.soundObject.play();
      this.playState = 'playing';
      this.currentlyPlaying.element.removeClass('paused').addClass('playing');
    } else {
      this.soundObject.pause();
      this.playState = 'paused';
      this.currentlyPlaying.element.removeClass('playing').addClass('paused');
    }

    // Set the total time in the player bar each time a new song is played.
    $('#time-control .total-time').text(this.prettyTime(this.currentlyPlaying.duration));
  }

  skipTo (percent) {
    if (this.playState !== 'playing') { return }
    this.soundObject.setTime( (percent / 100) * this.soundObject.getDuration() );
  }

  setVolume (percent) {
    this.volume = percent;
    this.soundObject.setVolume(percent);
  }
}

const player = new Player();
