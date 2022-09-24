import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.on('play', function () {
  console.log('played the video!');
});

player.getVideoTitle().then(function (title) {
  console.log('title:', title);
});

const onPlay = function (data) {
  // data is an object containing properties specific to that event
  console.log(data);
  localStorage.setItem('videoplayer - current - time', JSON.stringify(data));
};

player.on('timeupdate', throttle(onPlay, 1000));

const dateVideo = JSON.parse(
  localStorage.getItem('videoplayer - current - time')
);
if (dateVideo) {
  player
    .setCurrentTime(dateVideo.seconds)
    .then(function (seconds) {
      seconds = dateVideo.seconds;
    })
    .catch(function (error) {
      switch (error.name) {
        case 'RangeError':
          console.log(`not in range`);
          break;

        default:
          console.log(`Error`);
          break;
      }
    });
}