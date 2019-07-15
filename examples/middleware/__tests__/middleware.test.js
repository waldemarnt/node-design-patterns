const MiddlewareManager = require('../middleware_manager');

describe('MiddlewareManager', () => {
  /**
   * One middlewareManager instance can run multiple pipilines
   */
  const middlewareManager = new MiddlewareManager();
  const logMiddleware = (data, next) => {
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
    const nameEnhanceMiddleware = (data, next) => {
      data.user.firstName = data.user.name.split(' ')[0];
      next();
    };
    const expectMiddleware = (data, next) => {
      expect(data.user.firstName).toBe('Jhon');
      next();
    };
    middlewareManager.use(logMiddleware);
    middlewareManager.use(nameEnhanceMiddleware);
    middlewareManager.use(expectMiddleware);
    middlewareManager.process(defaultData);
  });

  it('should process finish the pipeline when done is called', () => {
    let middlewareCalled = false;
    /**
     * Add a middleware after the expectMiddleware
     * just to make it clear that the chain is stopping
     * right after the end is called
     */
    const testOrderMiddleware = () => {
      middlewareCalled = true;
    };
    const expectMiddleware = data => {
      /**
       * similar to res.send on express
       */
      data.end();
      expect(data.user.firstName).toBe('Jhon');
      expect(middlewareCalled).toBe(false);
    };

    middlewareManager.use(expectMiddleware);
    middlewareManager.use(testOrderMiddleware);
    middlewareManager.use(logMiddleware);
    middlewareManager.process(defaultData);
  });
});
