// 基本类型：number,string,undefined,null,symbol,boolean,object,function
// 内置对象：Date,Number,String,Array,Boolean,RegExp,Math

function deepclone(obj) {
  if (!obj) {

  }
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