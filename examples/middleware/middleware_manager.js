const DataPipeline = require('./data_pipeline');

class MiddlewareManager {
  constructor() {
    //All the middlewares are stored on the MiddlewareManager's instance
    this.middlewares = [];
  }

  process(data = {}) {
    //A new instance of DataPipeline is instantiate, it will keep the pipeline's state
    const dataPipeline = new DataPipeline(this.middlewares, data);
    //Starts the flow
    dataPipeline.dispatch();
  }

  use(middleware) {
    //Add the middlewares to the middlewares list
    this.middlewares.push(middleware);
  }
}

module.exports = MiddlewareManager;
