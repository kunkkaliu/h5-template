import FastClick from 'fastclick';
import Swiper from 'swiper';
import SwiperAnimation from '@cycjimmy/swiper-animation';
// import preloadImgs from 'utils/preloadImgs';
import preloadImgsSequence from 'utils/preloadImgsSequence';
import 'common/less/base.less';
import 'swiper/swiper.min.css';
import 'animate.css/animate.min.css';
import './index.less';

class Index {
  constructor() {
    this.init();
  }

  init() {
    document.addEventListener('DOMContentLoaded', function () {
      FastClick.attach(document.body);
    }, false);
    const images = [
      require('../../assets/images/bg.png'),
      require('../../assets/images/bg1.png'),
      require('../../assets/images/bg2.png'),
      require('../../assets/images/bg3.png'),
      require('../../assets/images/intro.jpg'),
      require('../../assets/images/music_icon.png'),
      require('../../assets/images/arrow.png'),
    ];
    preloadImgsSequence(images, (len, total) => {
      document.querySelector('.loaded').style.width = `${Math.floor(len * 100 / total)}%`;
      document.querySelector('.progress').innerText = `${Math.floor(len * 100 / total)}%`;
      if (len < total) return;
      setTimeout(() => {
        document.querySelector('.loading-container').classList.add('hide');
        document.querySelector('.swiper-container').classList.remove('hide');
        const swiperAnimation = new SwiperAnimation();
        new Swiper('.swiper-container', {
          direction: 'vertical',
          speed: 1000,
          on: {
            init: function () {
              swiperAnimation.init(this).animate();
            },
            slideChange: function () {
              swiperAnimation.init(this).animate();
            },
          },
        });
        this.initPlayer();
      }, 500);
    });
  }

  initPlayer() {
    const player = document.getElementById('bgmedia');
    const musicBtn = document.querySelector('.music-btn');
    player.src = require('../../assets/media/music.mp3');
    player.addEventListener('playing', function () {
      musicBtn.classList.remove('stopAnimation');
      musicBtn.classList.add('runAnimation');
    }, false);
    player.addEventListener('pause', function () {
      musicBtn.classList.remove('runAnimation');
      musicBtn.classList.add('stopAnimation');
    }, false);
    player.addEventListener('error', function () {
      musicBtn.classList.remove('runAnimation');
      musicBtn.classList.add('stopAnimation');
    }, false);
    player.addEventListener('canplay', function () {
      document.visibilityState === 'visible' && player.play().catch(() => {});
    }, false);
    document.addEventListener('visibilitychange', function () {
      document.visibilityState === 'visible' ? player.play().catch(() => {}) : player.pause();
    }, false);
    musicBtn.addEventListener('click', function () {
      if (musicBtn.classList.contains('stopAnimation')) {
        player.play();
      } else {
        player.pause();
      }
    }, false);
  }
}

new Index();

if (module.hot) {
  module.hot.accept();
}
