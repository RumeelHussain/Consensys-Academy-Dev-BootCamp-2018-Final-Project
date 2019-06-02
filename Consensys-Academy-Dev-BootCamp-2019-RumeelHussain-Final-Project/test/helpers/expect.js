'use strict';

async function throwError(promise, message) {
  try {
    await promise;
  }
  catch (error) {
    if (message) {
      error.message.should.include(message, 'Expected \'' + message + '\', got \'' + error + '\' instead');
    }
    else {
      const invalidJump = error.message.search('invalid JUMP') >= 0;
      const outOfGas = error.message.search('out of gas') >= 0;
      const isRevert = error.message.search('revert') >= 0;

      assert(invalidJump || outOfGas || isRevert, "Expected throw, got '" + error + "' instead");
    }
    return;
  }
  assert.fail('Expected throw not received');
};

module.exports = {
  throwError
};
