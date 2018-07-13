export const getValue = function (item) {
  return typeof item === 'object' ? item.title||item.dname : item
}

export const getKey = function (item) {
  return typeof item === 'object' ? item.itemid||item.id : item
}
