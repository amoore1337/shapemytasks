// Bleh, using ID scalar type in graph means that id is string.
// But is int in DB so need to juggle both so Prisma stays happy.
export type DbId = string | number;

export function getCookie(cookieSrc: string, cname: string) {
  const name = `${cname}=`;
  if (cookieSrc) {
    const ca = cookieSrc.split(';');
    for (let obj of ca) {
      while (obj.charAt(0) === ' ') {
        obj = obj.substring(1);
      }
      if (obj.indexOf(name) === 0) {
        return obj.substring(name.length, obj.length);
      }
    }
  }
  return '';
}

function charRange(start: string, stop: string) {
  const result = [];
  let index = start.charCodeAt(0);
  const last = stop.charCodeAt(0) + 1;

  for (index; index < last; index++) {
    result.push(String.fromCharCode(index));
  }
  return result;
}

export function base26EncodeNum(num: number) {
  const chars = charRange('a', 'z');
  let result = '';

  if (num < 1) {
    return result;
  }

  let quotient = num;
  let remainder = 0;
  while (quotient !== 0) {
    // Compensate for 0-based array
    const index = quotient - 1;

    quotient = Math.floor(index / 26);
    remainder = index % 26;

    result = chars[remainder] + result;
  }
  return result;
}

function getRandomInt(max: number) {
  return Math.floor(Math.random() * Math.floor(max + 1));
}

export function randomStringGenerator(len: number) {
  const chars = charRange('a', 'z');
  let result = '';
  for (let index = 0; index < len; index++) {
    result = chars[getRandomInt(25)] + result;
  }
  return result;
}

export function parsedId(id: DbId) {
  if (typeof id === 'string') {
    return parseInt(id, 10);
  }

  return id;
}
