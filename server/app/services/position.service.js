function makeCharSet(minChar, maxChar, maxLen, increment) {
  const charSet = {
    minChar: minChar.charCodeAt(0),
    maxChar: maxChar.charCodeAt(0),
    maxSize: maxLen,
    offsets: [],
    increment,
  };
  charSet.charCount = charSet.maxChar - charSet.minChar + 1;
  for (let i = 0; i < charSet.maxSize; i++) {
    // eslint-disable-next-line max-len
    charSet.offsets[i] =
      BigInt(charSet.charCount) ** BigInt(i) + (charSet.offsets[i - 1] || BigInt(0));
  }
  charSet.offsets = charSet.offsets.reverse();
  charSet.maxVal = charSet.offsets[0] * BigInt(charSet.charCount) - BigInt(1);
  charSet.midVal = charSet.maxVal / BigInt(2);
  return charSet;
}

function toAlpha(num) {
  let result = String.fromCharCode(charSet.minChar + Number(num / charSet.offsets[0]));
  num %= charSet.offsets[0];
  let i = 1;
  while (num > 0 && i < charSet.maxSize) {
    const intVal = (num + charSet.offsets[i] - BigInt(1)) / charSet.offsets[i] - BigInt(1);
    result += String.fromCharCode(charSet.minChar + Number(intVal));
    if (num > 0) {
      num -= BigInt(1);
    }
    num %= charSet.offsets[i];
    i += 1;
  }
  return result;
}

function toNum(alpha) {
  let result = BigInt(0);
  for (let i = 0; i < alpha.length; i++) {
    const val = BigInt(alpha.charCodeAt(i) - charSet.minChar);
    result = result + val * charSet.offsets[i] + BigInt(i > 0 ? 1 : 0);
  }
  return result;
}

// a should be the smaller value
// b should be the larger value
// if adding to the start of the list, pass `a` as ""
// if adding to the end of the list, pass `b` as ""
// if adding the first item to an empty list, pass both as ""
function midString(a, b) {
  if (a && b && a > b) {
    const temp = a;
    a = b;
    b = temp;
  }

  if (!a && !b) {
    return toAlpha(charSet.midVal);
  }

  let aNum = !a ? BigInt(0) : toNum(a);
  let bNum = !b ? charSet.maxVal : toNum(b);

  // keep values roughly centered in the possible range
  if (!a && bNum > charSet.midVal) {
    bNum = charSet.midVal;
  }
  if (!b && aNum < charSet.midVal) {
    aNum = charSet.midVal;
  }

  // if adding to the start of the list, decrease by step value
  if (!a && bNum > charSet.increment) {
    return toAlpha(bNum - charSet.increment);
  }
  // if adding to the end of the list, increase by step value
  if (!b && aNum + charSet.increment < charSet.maxVal) {
    return toAlpha(aNum + charSet.increment);
  }

  // if adding between 2 values, find the midpoint
  const mid = toAlpha(aNum + (bNum - aNum) / BigInt(2));
  if (mid === a || mid === b) {
    const msg = `aw crap, can't find midpoint of ${a} and ${b}`;
    throw msg;
  }
  return mid;
}

const charSet = makeCharSet(' ', '~', 20, BigInt(2) ** BigInt(100));

module.exports = {
  midString,
};
