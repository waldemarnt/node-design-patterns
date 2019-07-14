const MiddlewareManager = require('../middleware_manager');

describe('MiddlewareManager', () => {
  /**
   * One middlewareManager instance can run multiple pipilines
   */
  const middlewareManager = new MiddlewareManager();
  const logMiddleware = function(data, next) {
    console.log('logMiddleware', data.user);
    next();
  };
  const defaultData = {
    user: {
      name: 'Jhon Doe',
    },
  };

  it('should create a new instance of MiddlewareManager', () => {
    expect(middlewareManager).toBeInstanceOf(MiddlewareManager);
  });

  it('should process all middlewares in order before reaching the end', () => {
    const nameEnchancerMiddleware = function(data, next) {
      data.user.firstName = data.user.name.split(' ')[0];
      next();
    };
    const expectMiddleware = function(data, next) {
      expect(data.user.firstName).toBe('Jhon');
      next();
    };
    middlewareManager.use(logMiddleware);
    middlewareManager.use(nameEnchancerMiddleware);
    middlewareManager.use(expectMiddleware);
    middlewareManager.process(defaultData);
  });
});
