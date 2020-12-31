/* eslint-disable no-multi-assign */
/* eslint-disable no-loop-func */



export default function preloadImgsSequence(images, cb) {
  if (images === undefined || images === null || !Array.isArray(images) || images.length === 0) {
    typeof cb === 'function' && cb(1, 1);
    return;
  }
  const len = images.length;
  function loadImg(i) {
    if (i >= len) return;
    const img = new Image();
    img.src = images[i];
    img.onload = img.onerror = img.onabort = function () {
      typeof cb === 'function' && cb(i + 1, len);
      img.onload = img.onerror = img.onabort = null;
      loadImg(i + 1);
    };
  }
  loadImg(0);
}
