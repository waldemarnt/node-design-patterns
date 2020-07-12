const STATE = {
  PENDING: 'pending',
  FULFILLED: 'fulfilled',
  REJECTED: 'rejected',
};
/**
 * NewPromise
 */
class NPromise {
  /**
   * Promise constructor
   * http://www.ecma-international.org/ecma-262/6.0/#sec-promise-constructor
   */
  constructor(executor) {
    if (typeof executor !== 'function') {
      throw new Error('Executor must be a function');
    }
    this.state = STATE.PENDING;
    this.value = undefined;
    this.onFulfillChain = [];
    this.onRejectCallChain = [];

    /**
     * Call(executor, undefined, «resolvingFunctions.[[Resolve]], resolvingFunctions.[[Reject]]»).
     * It calls executor function passing the
     * resolve and reject parameters to the promise itself
     * NOTE: process.nextTick can be added ir order to allow async execution
     * process.nextTick(() => executor(this.resolve.bind(this), this.reject.bind(this)));
     */
    executor(this.resolve.bind(this), this.reject.bind(this));
  }

  then(onFulfill) {
    /**
     * A Promise always return a new Promise
     */
    return new NPromise((resolve, reject) => {
      const onFulfilled = res => {
        resolve(onFulfill(res));
      };

      const onRejected = res => {
        reject(res);
      };
      /**
       * If then was called from an already fulfilled promise
       * it doens't need to wait and can resolve straight
       */
      if (this.state === STATE.FULFILLED) {
        onFulfilled(this.value);
      } else if (this.state == STATE.REJECTED) {
        /**
         * If it was called from a rejected promise
         * it doens't need to wait and should be rejected straight
         */
        onRejected(this.value);
      } else {
        /**
         * If the promise before this is in PENDING
         * the fulfill/reject callback will be pushed to a list
         * to be resolved afterwards
         */
        this.onFulfillChain.push({ onFulfilled, onRejected });
      }
    });
  }

  catch(onReject) {
    return new NPromise((resolve, reject) => {
      const onRejected = res => {
        try {
          resolve(onReject(res));
        } catch (error) {
          /**
           * If an error in thrown inside a catch, it should
           * reject and next catch will be called
           */
          reject(error);
        }
      };

      /**
       * If the promise is not fulfilled, which means its resolving something
       * put it in an array to be resolved afterwards
       */
      if (this.state === STATE.REJECTED) {
        onRejected(this.value);
      } else {
        this.onRejectCallChain.push(onRejected);
      }
    });
  }

  /**
   * Promise resolve function
   * http://www.ecma-international.org/ecma-262/6.0/#sec-promise-resolve-functions
   */
  resolve(res) {
    /**
     * It prevents resolved to be called more than
     * once for the same Promise
     */
    if (this.state !== STATE.PENDING) {
      return;
    }

    /**
     * In case when a Promise returns a promise in PENDING
     * state, the next then has to be called
     */
    if (res != null && typeof res.then === 'function') {
      return res.then(this.resolve.bind(this));
    }

    /**
     * sets it's state to FULFILLED
     */
    this.state = STATE.FULFILLED;
    this.value = res;

    /**
     * Resolves the all thens for a given Promise
     */
    for (const { onFulfilled } of this.onFulfillChain) {
      onFulfilled(res);
    }
  }

  /**
   * Promise reject function
   * http://www.ecma-international.org/ecma-262/6.0/#sec-promise-reject-functions
   */
  reject(error) {
    /**
     * if not pending return
     */
    if (this.state !== STATE.PENDING) {
      return;
    }

    this.state = STATE.REJECTED;
    this.value = error;

    /**
     * call all the catchs for a given Promise
     */
    for (const onRejected of this.onRejectCallChain) {
      onRejected(error);
    }

    /**
     * Rejects the all thens for a given Promise
     */
    for (const { onRejected } of this.onFulfillChain) {
      onRejected(error);
    }
  }
}

module.exports = NPromise;
