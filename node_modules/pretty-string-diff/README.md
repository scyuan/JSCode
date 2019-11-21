# string-diff

Diffs two strings and prints a pretty output.

## CLI usage:

```bash
npm install -g pretty-string-diff

pretty-string-diff foo1 foo2

# or, string-diff files

pretty-string-diff --file file1 file2
```

## Programmatic usage:

```js
const stringDiff = require('pretty-string-diff');

const diff = stringDiff('foo1', 'foo2');

console.log(diff);
```
