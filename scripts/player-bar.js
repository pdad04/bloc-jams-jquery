$( document ).ready(function() {
  $('button#play-pause').click(function() {
    player.playPause();
    $(this).attr('playState',player.playState);
  });

  $('button#next').click(function() {
    if(player.playState !== 'playing') {return;}

    const currentSongIndex = album.songs.indexOf(player.currentlyPlaying);
    const nextSongIndex = currentSongIndex + 1;
    if (nextSongIndex >= album.songs.length) {return;}

    const nextSong = album.songs[nextSongIndex];
    player.playPause(nextSong);
  });

  $('button#previous').click(function() {
    if(player.playState !== 'playing') { return; }

    const currentSongIndex = album.songs.indexOf(player.currentlyPlaying);
    const lastSongIndex = currentSongIndex - 1;
    if (lastSongIndex < 0) { return; }

    const lastSong = album.songs[lastSongIndex];
    player.playPause(lastSong);
  });

  $('#time-control input').on('input', function(event) {
    player.skipTo(event.target.value);
  });

  $('#volume-control input').on('input', function(event) {
    player.setVolume(event.target.value);
  })

  setInterval( () => {
    const currentTime = player.getTime();
    const duration = player.getDuration();
    const percent = (currentTime / duration) * 100;
    $('#time-control .current-time').text(player.prettyTime(currentTime));
    $('#time-control input').val(percent);
  }, 1000);
});
