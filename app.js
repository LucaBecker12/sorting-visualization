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

/**
 * This function generates a random number
 * @returns A random number between 10 and 450
 */
function getRandomNumber() {
  return Math.floor(Math.random() * 440 + 10);
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
      ctx.fillStyle = "blue";
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

function sort() {
  console.log("Sort called");

  const elem = document.getElementsByClassName("selectAlgorithm")[0];

  switch (elem.value) {
    case "bubble_sort":
      console.log("Bubble");
      bubbleSort();
      break;
    case "merge_sort":
      console.log("Merge");
      break;
    case "insertion_sort":
      insertionSort();
      break;
    case "selection_sort":
      selectionSort();
      break;
    case "heap_sort":
      heapSort();
      break;
    default:
      console.error("Nothing working");
      break;
  }
}

async function bubbleSort() {
  console.log("bubble called");
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data.length - i - 1; j++) {
      if (data[j] > data[j + 1]) {
        swap(j, j + 1);
        draw([j, j + 1]);
        await sleep(speed() * 100);
      }
    }
  }
}

async function insertionSort() {
  for (let i = 0; i < data.length; i++) {
    let key = data[i];
    let j = i - 1;

    while (j >= 0 && data[j] > key) {
      data[j + 1] = data[j];
      j--;

      draw([j, j + 1]);
      await sleep(speed() * 1000);
    }
    data[j + 1] = key;
  }
  draw();
}

async function selectionSort() {
  for (let i = 0; i < data.length - 1; i++) {
    var min = i;

    for (let j = i + 1; j < data.length; j++) {
      if (data[j] < data[min]) min = j;
    }

    if (min != i) {
      swap(i, min);
      draw([i, min]);
      await sleep(speed() * 1000);
    }
  }

  draw();
}

async function heapSort() {
  for (let i = data.length / 2 - 1; i >= 0; i--) {
    await heapify(data.length, i);
  }

  for (let i = data.length - 1; i > 0; i--) {
    swap(0, i);
    draw([0, i]);
    await sleep(speed() * 1000);
    await heapify(i, 0);
  }

  draw();
}

async function heapify(n, i) {
  let max = i;
  let left = 2 * i + 1;
  let right = 2 * i + 2;

  if (left < n && data[left] > data[max]) max = left;

  if (right < n && data[right] > data[max]) max = right;

  if (max != i) {
    swap(i, max);
    draw([i, max]);
    await sleep(speed() * 1000);

    await heapify(n, max);
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function swap(a, b) {
  const temp = data[a];
  data[a] = data[b];
  data[b] = temp;
}

function speed() {
  switch (document.getElementsByClassName("speed")[0].value) {
    case "slow":
      return 1;
    case "medium":
      return 0.1;
    case "fast":
      return 0.01;
    case "very_fast":
      return 0.001;
    default:
      return 0.5;
  }
}
