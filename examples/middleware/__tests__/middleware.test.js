const MiddlewareManager = require('../middleware_manager');

describe('MiddlewareManager', () => {
  const logMiddleware = function(data, next) {
    console.log(data.user);
    next();
  };
  const defaultData = {
    user: {
      name: 'Jhon Doe',
    },
    end: () => {},
  };

  it('should create a new instance of MiddlewareManager', () => {
    const middlewareManager = new MiddlewareManager();
    expect(middlewareManager).toBeInstanceOf(MiddlewareManager);
  });

  it('should start the processing pipeline', () => {
    const middlewareManager = new MiddlewareManager();
    expect(middlewareManager.process()).toBe(true);
  });

  it('should finish the processing pipeline when reaching end', () => {
    const endSpy = jest.spyOn(defaultData, 'end');
    const middlewareManager = new MiddlewareManager();
    middlewareManager.use(logMiddleware);
    middlewareManager.process(defaultData);
    expect(endSpy).toHaveBeenCalled();
  });

  it('should process all middlewares before reaching the end', () => {
    const middlewareManager = new MiddlewareManager();
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
