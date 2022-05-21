function at<T extends unknown[] | string, I extends number>(
  arr: T,
  index: I
): T[I] {
  let n = Math.trunc(index) || 0;
  if (n < 0) n += this.length;
  if (n < 0 || n >= this.length) return undefined;
  return arr[n];
}

const dedentStr = (str: string) => {
  const indents = str
    .trim()
    .split(/\r\n|\n/)
    .slice(1)
    .map((s) => s.match(/^[ ]*/)[0].length);
  const margin = Math.min(...indents);
  return str.trim().replace(new RegExp(`^ {${margin}}`, "gm"), "");
};

const dedent = <T extends readonly unknown[]>(
  strs: TemplateStringsArray,
  ...vars: T
) => dedentStr(strs.reduce((a, b, i) => a + vars[i - 1] + b));

const range = (len: number, start = 0) =>
  [...Array(len)].map((_, i) => start + i);

const repeat = (char: string, len: number) =>
  range(len)
    .map(() => char)
    .join("");

type ShouldFold<T> = (current: T, prev: T, folded: T[], all: T[]) => boolean;

const fold = <T>(arr: T[], shouldFold: ShouldFold<T>) => {
  if (arr.length <= 1) return [arr];
  let folded: T[] = [];
  let prev: null | T = null;
  const result = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const item of arr) {
    if (prev !== null && shouldFold(item, prev, folded, arr)) {
      folded.push(item);
    } else {
      folded = [item];
      result.push(folded);
    }
    prev = item;
  }
  return result as T[][];
};

export { at, dedent, range, repeat, fold };
