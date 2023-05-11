export function mergeSort(array) {
  if (array.length <= 1) {
    return array
  }
  const middle = Math.floor(array.length / 2)
  const left = array.slice(0, middle);
  const right = array.slice(middle);
  return merge(mergeSort(left), mergeSort(right))
}

function merge(left, right) {
  const array = [];
  while (left.length && right.length) {
    if (left[0][1].totalPoints > right[0][1].totalPoints) {
      array.push(left.shift());
    } else {
      array.push(right.shift())
    }
  }
  // console.log(array);
  return array.concat(left.slice()).concat(right.slice());
}

export function countSelected(queensList, category) {
  let count = 0;
  queensList.forEach((queen) => {
    if (queen.selected[category]) {
      count++;
    }
  })
  return count;
}

export function isAlreadySelected(queen, category) {
  const numSelected = Object.values(queen.selected).filter(Boolean).length;
  if (numSelected > 0) {
    if (queen.selected.mini && numSelected < 2) {
      return false
    }
    if (category === "mini") {
      return false
    }
    return true;
  }
  return false;
}

export function createColumnGroups(queens, isMobile) {

  const columnGroups = {};

  if (isMobile) {
    columnGroups["1"] = [];
    columnGroups["2"] = [];
    queens && queens.forEach((queen, i) => {
      if (i % 2 === 0) {
        columnGroups["1"].push(queen)
      }
      if (i % 2 === 1) {
        columnGroups["2"].push(queen)
      }
    })
  }
  if (!isMobile) {
    columnGroups["1"] = [];
    columnGroups["2"] = [];
    columnGroups["3"] = [];
    queens && queens.forEach((queen, i) => {
      if (i % 3 === 0) {
        columnGroups["1"].push(queen)
      }
      if (i % 3 === 1) {
        columnGroups["2"].push(queen)
      }
      if (i % 3 === 2) {
        columnGroups["3"].push(queen)
      }
    })
  }
  return columnGroups;
}

export function parseDate(date) {
  const day = date.slice(-2)
  const month = Number(date.slice(0, -2)) + 1
  return month + "/" + day
}