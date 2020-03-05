function createRandomArr(l) {
  let arr = [];
  for (let i = 0; i < l; i++) {
    arr.push(Math.floor(Math.random() * l + 1));
  }
  return arr;
}

let unSortedArr = createRandomArr(30);

// 冒泡算法
function bubbleSort(arr) {
  console.time('冒  泡')
  // 每趟都要把最大的找出来。如果长度为10的数组，则需要走9趟。外层循环表示趟数循环
  for (let i = 1; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp
      }
    }
  }
  console.timeEnd('冒  泡')
  return arr;
}
let sortedArr = bubbleSort([...unSortedArr]);

// console.log('排序前:', unSortedArr.join(','));
// console.log('排序后:', sortedArr.join(','));

// 选择排序
function selectSort(arr) {
  console.time('选  择');
  // 选择排序是每次两个数比较，然后根据是降序还是升序交换元素，最外层表示总共需要比较的次数
  for (let i = 0; i < arr.length - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
        // let temp = arr[minIndex];
        // arr[minIndex] = arr[j];
        // arr[j] = temp;
      }
    }
    // 把最小的放到前面
    if (i !== minIndex) {
      let temp = arr[minIndex];
      arr[minIndex] = arr[i];
      arr[i] = temp;
    }
  }

  console.timeEnd('选  择');
  return arr;
}
let sortedArr1 = selectSort([...unSortedArr]);

// console.log('排序前:', unSortedArr.join(','));
// console.log('排序后:', sortedArr1.join(','));

// 插入排序
// 想象成手里有副扑克牌
function insertSort(arr) {
  console.time('插  入');
  let currLength = 1;
  for (let i = 1; i < arr.length; i++) {
    for (j = 0; j < currLength; j++) {
      if (arr[i] < arr[j]) {
        // 小于则立即插入
        let temp = arr[i];
        arr.splice(i, 1);
        arr.splice(j, 0, temp);
      }
    }
    currLength++;
  }
  console.timeEnd('插  入');
  return arr;
}

let sortedArr2 = insertSort([...unSortedArr]);

console.log('排序前:', unSortedArr.join(','));
console.log('排序后:', sortedArr2.join(','));

// 快速排序
function quickSort(arr) {

  if (arr.length <= 1) return arr;

  let pivotIndex = Math.floor(arr.length / 2);
  let pivot = arr[pivotIndex];
  let left = [];
  let right = [];
  for (let i = 0; i < arr.length; i++) {
    if (i !== pivotIndex) {
      if (arr[i] <= pivot) {
        left.push(arr[i])
      } else {
        right.push(arr[i])
      }
    }
  }

  return quickSort(left).concat([pivot], quickSort(right));

}
console.time("快  排");
let sortedArr3 = quickSort([...unSortedArr]);
console.timeEnd("快  排");
// console.log('排序前:', unSortedArr.join(','));
// console.log('排序后:', sortedArr3.join(','));

// 优化快速排序