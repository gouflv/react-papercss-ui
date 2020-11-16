const contains = (a, b) => new Set([...a, ...b]).size === a.length
export const isArrayEqual = (a, b) => contains(a, b) && contains(b, a)
