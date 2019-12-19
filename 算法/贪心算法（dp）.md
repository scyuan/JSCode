### 0-1 背包问题

> 有一个背包，背包容量是M=150kg。有7个物品，物品不可以分割成任意大小。要求尽可能让装入背包中的物品总价值最大，但不能超过总容量。



物品|A| B | C | D | E | F | G
---|---|---|---|---|---|---|---
重量|35kg|30kg|6kg|50kg|40kg|10kg|25kg
价值|10$|40$|30$|50$|35$|40$|30$

一般来说，贪心算法的证明围绕着：整个问题的最优解一定由在贪心策略中存在的子问题的最优解得来的。

但是01背包问题不具备贪心选择性质：通过局部最优，达不到全局最优

### 最大子序和

> 给定一个整数数组 nums ，找到一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。

- 当前元素
- 当前元素位置的最大和
- 迄今为止的最大和

```JavaScript
function maxArrSum(arr){
  if(arr.length === 1) return arr[0];
  // 赋值当前元素位置的最大和和最大和
  let currSum = arr[0];
  let maxSum = arr[0];
  for(let i = 1;i<arr.length;i++){
    // 当前位置的最大和
    currSum = Math.max(arr[i],arr[i]+currSum);
    // 迄今为止的最大和
    maxSum = Math.max(currSum,maxSum);
  }
  return maxSum;
}

```