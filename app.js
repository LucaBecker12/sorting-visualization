var data = [];
const BLACK = "#000000";
const RED = "#FF5733";

/**
 * This function generates a new Array with 50 random numbers
 * Then it draws the Array on the Canvas
 */
function generateArray() {
  var temp = [];
  for (let i = 0; i < 100; i++) {
    temp.push(getRandomNumber());
  }
  data = temp;
  draw();
}

function draw(colors = []) {
  const can = document.getElementsByClassName("canvas")[0];
  const ctx = can.getContext("2d");

  ctx.clearRect(0, 0, can.width, can.height);

  const barWidth = can.width / data.length;

  const spacing = 2;

  for (let i = 0; i < data.length; i++) {
    ctx.beginPath();
    if (colors.includes(i)) {
      ctx.fillStyle = "red";
    } else {
      ctx.fillStyle = "black";
    }
    ctx.rect(
      i * barWidth,
      0,
      barWidth - spacing,
      (data[i] / Math.max(...data)) * can.height
    );

    ctx.fill();
  }
}

async function sort() {
  const elem = document.getElementsByClassName("selectAlgorithm")[0];

  if (data.length == 0) {
    alert("You have to generate an array first\nor Array is already sorted.");
    return;
  }

  switch (elem.value) {
    case "bubble_sort":
      await bubbleSort();
      break;
    case "insertion_sort":
      await insertionSort();
      break;
    case "selection_sort":
      await selectionSort();
      break;
    case "heap_sort":
      await heapSort();
      break;
    case "quick_sort":
      await quickSort(0, data.length - 1);
      break;
    default:
      console.error("Nothing working");
      break;
  }

  data = [];
}

async function bubbleSort() {
  const time = speed() * 1000;
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data.length - i - 1; j++) {
      if (data[j] > data[j + 1]) {
        swap(j, j + 1);
        draw([j, j + 1]);
        await sleep(time);
      }
    }
  }
  draw();
}

async function insertionSort() {
  const time = speed() * 1000;
  for (let i = 0; i < data.length; i++) {
    let key = data[i];
    let j = i - 1;

    while (j >= 0 && data[j] > key) {
      data[j + 1] = data[j];
      j--;

      draw([j, j + 1]);
      await sleep(time);
    }
    data[j + 1] = key;
  }
  draw();
}

async function selectionSort() {
  const time = speed() * 1000;
  for (let i = 0; i < data.length - 1; i++) {
    var min = i;

    for (let j = i + 1; j < data.length; j++) {
      if (data[j] < data[min]) min = j;
    }

    if (min != i) {
      swap(i, min);
      draw([i, min]);
      await sleep(time);
    }
  }
  draw();
}

async function heapSort() {
  const time = speed() * 1000;
  for (let i = data.length / 2 - 1; i >= 0; i--) {
    await heapify(data.length, i);
  }

  for (let i = data.length - 1; i > 0; i--) {
    swap(0, i);
    draw([0, i]);
    await sleep(time);
    await heapify(i, 0);
  }

  draw();
}

async function quickSort(low, high) {
  if (low >= high) {
    return;
  }

  let index = await partition(low, high);

  await quickSort(low, index - 1);
  await quickSort(index + 1, high);

  draw();
}

async function partition(low, high) {
  const time = speed() * 1000;
  const pivotValue = data[high];
  let piv = low;
  for (let i = low; i < high; i++) {
    if (data[i] < pivotValue) {
      swap(i, piv);
      await sleep(time);
      draw([i, piv]);
      piv++;
    }
  }
  swap(piv, high);
  draw([piv, high]);
  return piv;
}

async function heapify(n, i) {
  const time = speed() * 1000;
  let max = i;
  let left = 2 * i + 1;
  let right = 2 * i + 2;

  if (left < n && data[left] > data[max]) max = left;

  if (right < n && data[right] > data[max]) max = right;

  if (max != i) {
    swap(i, max);
    draw([i, max]);
    await sleep(time);

    await heapify(n, max);
  }
}

/**
 * A small helper function which helps animating the sorting algorithms
 * @param {*} ms How long the function should sleep for in ms
 * @returns a new Promise
 */
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Swaps two values from the main array
 * @param {*} a Index 1
 * @param {*} b Index 2
 */
function swap(a, b) {
  const temp = data[a];
  data[a] = data[b];
  data[b] = temp;
}

/**
 * This is a function which determines the speed factor for the sorting speed
 * @returns speed factor for the sorting Speed
 */
function speed() {
  const elem = document.getElementsByClassName("selectSpeed")[0];
  console.log(elem.value);
  switch (elem.value) {
    case "slow":
      return 1;
    case "medium":
      return 0.1;
    case "fast":
      return 0.01;
    case "very_fast":
      return 0.001;
    default:
      console.log("default");
      return 0.5;
  }
}

/**
 * This function generates a random number
 * @returns A random number between 10 and 450
 */
function getRandomNumber() {
  return Math.floor(Math.random() * 440 + 10);
}
