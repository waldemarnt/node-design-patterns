class MiddlewareManager {
  constructor() {
    this.middlewares = [];
  }

  process(data) {
    if (this.middlewares.length > 0) {
      const firstMiddleware = this.middlewares.pop();
      const next = () => {
        if (this.middlewares.length > 0) {
          const nextMiddleware = this.middlewares.pop();
          nextMiddleware(data, next);
        } else {
          data.end();
        }
      };
      firstMiddleware(data, next);
    }
    return true;
  }

  use(middleware) {
    this.middlewares.unshift(middleware);
  }
}

module.exports = MiddlewareManager;
