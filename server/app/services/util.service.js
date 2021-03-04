function charRange(start, stop) {
  const result = [];
  let index = start.charCodeAt(0);
  const last = stop.charCodeAt(0) + 1;

  for (index; index < last; index++) {
    result.push(String.fromCharCode(index));
  }
  return result;
}

function base26EncodeNum(num) {
  const chars = charRange('a', 'z');
  let result = '';

  if (num < 1) {
    return result;
  }

  let quotient = num;
  let remainder = '';
  while (quotient !== 0) {
    // Compensate for 0-based array
    const index = quotient - 1;

    quotient = Math.floor(index / 26);
    remainder = index % 26;

    result = chars[remainder] + result;
  }
  return result;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max + 1));
}

function randomStringGenerator(len) {
  const chars = charRange('a', 'z');
  let result = '';
  for (let index = 0; index < len; index++) {
    result = chars[getRandomInt(25)] + result;
  }
  return result;
}

module.exports = {
  charRange,
  base26EncodeNum,
  getRandomInt,
  randomStringGenerator,
};
