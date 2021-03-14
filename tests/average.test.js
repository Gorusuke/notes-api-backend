const {average} = require ('../utils/for_testing')

describe('average', () => {
  test('of one array is calculate correctly', () => {
    const numeros = [1, 4, 5, 7, 15]
    const result = average(numeros)
    expect(result).toBe(6.4)
  })  

  test('of one value is the value itself', () => {
    const result = average([1])
    expect(result).toBe(1)
  }) 

  test('of empty array', () => {
    const result = average([])
    expect(result).toBe(0)
  }) 

  test('of a string', () => {
    const result = average('hola')
    expect(result).toBeUndefined()
  })
})