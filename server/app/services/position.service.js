const CHARMAP = {
  BEGINNING: 96,
  A: 97,
  B: 98,
  Z: 122,
  END: 123,
};

function safeCharAt(str, pos, fallback) {
  return pos < str.length ? str.charCodeAt(pos) : fallback;
}

function midString(prev, next) {
  let p; let n; let pos; let str;

  // Find leftmost non-matching character
  for (pos = 0; p === n; pos++) {
    p = safeCharAt(prev, pos, CHARMAP.BEGINNING);
    n = safeCharAt(next, pos, CHARMAP.END);
  }

  str = prev.slice(0, pos - 1); // Copy identical part of string

  if (p === CHARMAP.BEGINNING) {
    // Prev string equals beginning of next
    while (n === CHARMAP.A) {
      n = safeCharAt(next, pos++, CHARMAP.END); // Get char from next
      str += 'a'; // Insert an 'a' to match the 'a'
    }

    // If the next char is 'b', then we need to insert another character so
    // that we can find a middle value.
    if (n === CHARMAP.B) {
      str += 'a'; // Insert an 'a' to go ahead of the 'b'
      n = CHARMAP.END; // Set to end of alphabet
    }
  } else if (p + 1 === n) {
    // If we have consecutive characters
    str += String.fromCharCode(p); // Insert character from prev
    n = CHARMAP.END; // Set to end of alphabet

    // eslint-disable-next-line no-cond-assign
    while ((p = safeCharAt(prev, pos++, CHARMAP.BEGINNING)) === CHARMAP.Z) {
      str += 'z'; // Insert 'z' to match 'z'
    }
  }
  return str + String.fromCharCode(Math.ceil((p + n) / 2)); // append middle character
}

module.exports = {
  midString,
};
