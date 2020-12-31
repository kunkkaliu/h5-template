import FastClick from 'fastclick';
import Swiper from 'swiper';
import SwiperAnimation from '@cycjimmy/swiper-animation';
import 'common/less/base.less';
import 'swiper/swiper.min.css';
import 'animate.css/animate.min.css';
// import preloadImgs from 'utils/preloadImgs';
import preloadImgsSequence from 'utils/preloadImgsSequence';
import './index.less';

class Index {
  constructor() {
    this.init();
  }

  init() {
    document.addEventListener('DOMContentLoaded', function () {
      FastClick.attach(document.body);
    });
    const images = [
      require('../../assets/images/bg.png'),
      require('../../assets/images/bg1.png'),
      require('../../assets/images/bg2.png'),
      require('../../assets/images/bg3.png'),
      require('../../assets/images/intro.jpg'),
    ];
    preloadImgsSequence(images, (len, total) => {
      document.querySelector('.loaded').style.width = `${len * 100 / total}%`;
      document.querySelector('.progress').innerText = `${len * 100 / total}%`;
      if (len < total) return;
      setTimeout(() => {
        document.querySelector('.loading-container').classList.add('hide');
        document.querySelector('.swiper-container').classList.remove('hide');
        const swiperAnimation = new SwiperAnimation();
        new Swiper('.swiper-container', {
          direction: 'vertical',
          preloadImages: false,
          lazy: true,
          on: {
            init: function () {
              swiperAnimation.init(this).animate();
            },
            slideChange: function () {
              swiperAnimation.init(this).animate();
            },
          },
        });
      }, 500);
    });
  }
}

new Index();

if (module.hot) {
  module.hot.accept();
}
