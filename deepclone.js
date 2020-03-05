// 基本类型：number,string,undefined,null,symbol,boolean,object,function
// 内置对象：Date,Number,String,Array,Boolean,RegExp,Math


function checkType(obj, type) {
  return Object.prototype.toString.call(obj).slice(8, -1) === type;
}

function deepclone(obj) {
  if (!obj) return obj;
  let result;
  if (checkType(obj, 'Object')) {
    result = {};
  } else if (checkType(obj, 'Array')) {
    result = [];
  } else {
    return obj;
  }
  for (let key in obj) {
    let val = obj[key];
    if (checkType(val, 'Object') || checkType(val, 'Array')) {
      result[key] = deepclone(val);
    } else {
      result[key] = val;
    }
  }
  return result;
}

let obj = {
  "number": 1,
  "string": "str",
  "undefined": undefined,
  "null": null,
  "symbol": Symbol("symbol"),
  "boolean": true,
  "object": {
    obj: 'obj'
  },
  "function": function (params) {
    console.log(params ? params : 'function')
  },
  "Date": new Date,
  "Number": new Number(2),
  "String": new String("STR"),
  "Array": [1, 2, 3],
  "Boolean": new Boolean(1),
  "RegExp": new RegExp('ggg', 'i'),
}

let copy = JSON.parse(JSON.stringify(obj));
copy.object = {
  obj: 'obj1'
};

let copy1 = deepclone(obj);

console.log(copy1 === obj, copy === obj);
console.log(copy1);