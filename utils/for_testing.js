const palindrome = (string) => {
  if(typeof string === 'undefined') return
  return string
    .split('')
    .reverse()
    .join('')
}

const average = array => {
  if(array.length === 0) return 0
  if(typeof array !== 'object') return undefined

  let suma = 0
  array.forEach(element => suma += element)
  
  return suma / array.length
  
}

module.exports = {palindrome, average}