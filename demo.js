var consoleList = function (head) {
  if (head === null) return 'null'
  let arr = [];
  arr.push(head.val)
  while (head.next) {
    head = head.next;
    arr.push(head.val)
  }
  return arr.join(',')
}

let l = {
  val: 1,
  next: {
    val: 2,
    next: {
      val: 3,
      next: {
        val: 4,
        next: {
          val: 5,
          next: null
        }
      }
    }
  }
}

var reverseList = function (head) {
  let curr = head;
  let list = head;
  let temp = null;

  if (curr === null) return null;
  while (curr.next) {
    temp = curr.next;
    curr.next = temp.next;
    temp.next = list;
    list = temp
  }

  return list;

};
reverseList(l);