const {palindrome} = require ('../utils/for_testing')


test('palindrome of anitaLavaLaTina', () => {
  const result = palindrome('anitaLavaLaTina')
  expect(result).toBe('aniTaLavaLatina')
})


test('palindrome of empty string', () => {
  const result = palindrome('')
  expect(result).toBe('')
})

test('palindrome of undefined', () => {
  const result = palindrome()
  expect(result).toBeUndefined()
})