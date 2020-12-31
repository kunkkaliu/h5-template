/* eslint-disable no-multi-assign */
/* eslint-disable no-loop-func */

export default function preloadImgs(images, cb) {
  if (images === undefined || images === null || !Array.isArray(images) || images.length === 0) {
    typeof cb === 'function' && cb(1, 1);
    return;
  }
  const len = images.length;
  let index = 0;
  for (let i = 0; i < len; i++) {
    const img = new Image();
    img.src = images[i];
    img.onload = img.onerror = img.onabort = function () {
      index += 1;
      typeof cb === 'function' && cb(index, len);
      img.onload = img.onerror = img.onabort = null;
    };
  }
}
