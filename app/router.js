'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/list', controller.home.list);
  router.get('/user', controller.user.index);
  router.get('/user/read/:id', controller.user.read);
  router.get('/user/readQuery', controller.user.readQuery);
  router.post('/user/create', controller.user.create);
  router.post('/user/update/:id', controller.user.update);
  router.post('/user/destroy/:id', controller.user.destroy);
  router.post('/upload', controller.file.upload);
};
