const NPromise = require('../index');

describe('Promise', () => {
  it('should instantiate a new Promise with in pending state', done => {
    const nPromise = new NPromise(resolve => {
      setTimeout(() => resolve(true), 10);
    });
    const testPromise = new Promise((resolve) => {
      setTimeout(() => resolve(true), 10);
    });
    setTimeout(() => console.log(testPromise), 1000)
    setTimeout(() => console.log(nPromise), 1000)
    setTimeout(() => done(), 2001)
  });
});
