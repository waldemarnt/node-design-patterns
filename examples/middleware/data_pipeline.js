class DataPipeline {
  constructor(middlewares, data) {
    this.middlewares = middlewares;
    //Informs whether the pipiline has finished
    this.finished = false;
    /**
     * Adds a static end function to the data object
     */
    data.end = () => {
      console.log('Pipeline has ended');
      this.finished = true;
    };
    this.data = data;
  }

  /**
   * @data stays in a closure here
   */
  dispatch() {
    // Itarator used to iterate on the middlewares list
    let iterator = 0;
    if (iterator < this.middlewares.length) {
      const firstMiddleware = this.middlewares[iterator];
      /**
       * The next() is a wrap function, this way the middleware doesn't need to
       * pass data as parameter for the next middleware, the next() function
       * is responsible for getting it from the closure scope and
       * injecting for the next middleware
       */
      const next = () => {
        iterator++;
        if (!this.finished && iterator < this.middlewares.length) {
          //Increases the iterator and get the next middleware
          const nextMiddleware = this.middlewares[iterator];
          nextMiddleware(this.data, next);
        } else {
          this.data.end();
        }
      };
      firstMiddleware(this.data, next);
    }
  }
}

module.exports = DataPipeline;
