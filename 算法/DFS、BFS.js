// 递归实现深度优先

const yeye = {
  name: '爷爷',
  children: {
    "爸爸": {
      name: '爸爸',
      children: {
        "哥哥": {
          name: '哥哥',
          children: {
            "侄子": {
              name: "侄子"
            },
            "侄女": {
              name: "侄女"
            }
          }
        },
        "弟弟": {
          name: '弟弟'
        },
        "我": {
          name: '我'
        }
      }
    },
    "姑姑": {
      name: "姑姑",
      children: {
        "姑表弟": {
          name: "姑表弟"
        },
      }
    }
  }
}

function deepTraversal(obj, arr = []) {
  if (obj) {
    arr.push(obj.name);
    if (obj.children) {
      for (key in obj.children) {
        deepTraversal(obj.children[key], arr);
      }
    }

  }
  return arr;
}

const s = deepTraversal(yeye);
console.log('DFS递归实现  ', s);

// 非递归实现
function deepTraversalNoRecursive(obj, arr = []) {
  if (obj && obj.children) {
    let tasks = [];
    tasks.push(obj);
    while (tasks.length > 0) {
      let curr = tasks.pop();
      arr.push(curr.name);
      if (curr.children) {
        let keys = Object.keys(curr.children);
        for (let i = keys.length - 1; i >= 0; i--) {
          tasks.push(curr.children[keys[i]]);
        }
      }

    }
  }
  return arr;
}
const s1 = deepTraversalNoRecursive(yeye);
console.log('DFS非递归实现', s1);

function breadthTraversal(obj, arr = []) {
  if (obj) {
    let tasks = [];
    tasks.push(obj);
    while (tasks.length > 0) {
      let curr = tasks.pop();
      arr.push(curr.name);
      if (curr.children) {
        for (key in curr.children) {
          tasks.unshift(curr.children[key]);
        }
      }
    }
  }
  return arr;
}

const s2 = breadthTraversal(yeye);
console.log('BFS非递归实现', s2);