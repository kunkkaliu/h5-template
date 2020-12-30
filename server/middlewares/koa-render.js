const path = require('path');
const Events = require('../events');

const koaRender = (app, basePath) => {
  const filePath = path.join(basePath, 'index.html');
  app.context.render = function () {
    const ctx = this;
    return new Promise((resolve) => {
      process.send({
        action: Events.EVENT_FILE_READ,
        filename: filePath,
      });
      process.on(Events.EVENT_MSG, async (data) => {
        if (data.action === Events.EVENT_FILE_READ_DONE) {
          ctx.type = 'text/html';
          ctx.body = data.content;
          resolve(data.content);
        }
      });
    });
  };
};

module.exports = koaRender;
