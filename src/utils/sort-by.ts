const getSortByInterator = <T extends Object>(key: keyof T) => {
  return (a: T, b: T) => {
    if (a[key] > b[key]) {
      return 1
    }
    if (b[key] > a[key]) {
      return -1
    }
    return 0
  }
}

export const sortBy = <T extends Object>(list: T[], key: keyof T) => {
  return list.sort(getSortByInterator(key))
}
