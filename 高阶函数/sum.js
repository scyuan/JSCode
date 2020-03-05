function sum() {
  let nums = [].slice.call(arguments, 0);
  let fn = function () {
    let args = [].slice.call(arguments, 0);
    if (args.length === 0) {
      let a = nums.reduce((total, curr) => {
        total = total + curr;
        return total;
      })
      return a;
    } else {
      nums = nums.concat(args);
      return fn;
    }
  }
  return fn;
}

let fn = sum(1)(2)(3, 4);

let result = fn();

console.log(result);