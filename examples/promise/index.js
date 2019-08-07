class NPromise {
  /**
   * Promise constructor
   * http://www.ecma-international.org/ecma-262/6.0/#sec-promise-constructor
   */
  constructor(executor) {
    if (typeof executor !== 'function') {
      throw new Error('Executor must be a function');
    }
    this.state = 'pending';
    this.value = 'undefined';
    this.callChain = [];
    this.rejectReactions = [];
    this.errorHandler = null;

    /**
     * Let completion be
     * Call(executor, undefined, «resolvingFunctions.[[Resolve]], resolvingFunctions.[[Reject]]»).
     * It calls executor function passing the
     * resolve and reject parameters to the promise itself
     */
    executor(this.resolveFunction.bind(this), this.rejectFunction.bind(this))
  }

  then(onResolve) {
    this.callChain.push(onResolve);
    return this;
  }

  catch(onReject){
    this.errorHandler = onReject;
    return this;
  }

  /**
   * Promise resolve function
   * http://www.ecma-international.org/ecma-262/6.0/#sec-promise-resolve-functions
   */
  resolveFunction(value) {
    this.value = value;
    if(this.state === 'pending') {
      this.state = 'fulfilled';
      return value;
    }

    try {
      this.callChain.forEach(nextFunc => {
        this.state = 'fulfilled';
        this.value = nextFunc(this.value);
      });
    } catch (error) {
      this.callChain = [];

      this.rejectFunction(error)
    }
  }

  /**
   * Promise reject function
   * http://www.ecma-international.org/ecma-262/6.0/#sec-promise-reject-functions
   */
  rejectFunction(value) {
    this.state = 'rejected';
    if(!this.errorHandler) {
      throw value;
    }

    this.errorHandler(value)
  }
}

module.exports = NPromise;
