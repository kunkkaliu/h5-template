import FastClick from 'fastclick';
import Swiper from 'swiper';
import SwiperAnimation from '@cycjimmy/swiper-animation';
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
    });
    const swiperAnimation = new SwiperAnimation();
    this.swiper = new Swiper('.swiper-container', {
      direction: 'vertical',
      on: {
        init: function () {
          swiperAnimation.init(this).animate();
        },
        slideChange: function () {
          swiperAnimation.init(this).animate();
        },
      },
    });
  }
}

new Index();

if (module.hot) {
  module.hot.accept();
}
