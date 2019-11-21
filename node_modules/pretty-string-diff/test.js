const assert = require('assert');

const stringDiff = require('./index');

describe('stringDiff', () => {
  it('outputs a string diff (using a stream)', () => {
    let data = '';
    const stream = {
      write: chunk => {
        data += chunk;
      }
    };

    const result = stringDiff('foo1', 'foo2', stream);

    assert.equal(data, '\x1b[0m\x1b[2mfoo\x1b[0m\x1b[31m1\x1b[0m\x1b[32m2');
    assert.equal(result, null);
  });

  it('outputs a string diff (without using a stream)', () => {
    const data = stringDiff('foo1', 'foo2');

    assert.equal(data, '\x1b[0m\x1b[2mfoo\x1b[0m\x1b[31m1\x1b[0m\x1b[32m2');
  });
});
