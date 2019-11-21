require('colors');
const Diff = require('diff');

function getPartWithColor(part) {
  if (part.added) {
    return `\x1b[0m\x1b[32m${part.value}`; // green
  }
  if (part.removed) {
    return `\x1b[0m\x1b[31m${part.value}`; // red
  }

  return `\x1b[0m\x1b[2m${part.value}` // dim;
}

function stringDiff(string1, string2, stream = null) {
  const diff = Diff.diffChars(string1, string2);

  const returnDiff = stream === null;

  let actualStream = stream;
  let data = '';

  if (returnDiff) {
    actualStream = {
      write: chunk => {
        data += chunk
      }
    };
  }

  diff.forEach(part => {
    actualStream.write(getPartWithColor(part));
  });

  if (returnDiff) {
    return data;
  }

  return null;
}

module.exports = stringDiff;
