const suma = (a, b) => {
  return a + b
}

// if(suma(0, 0) !== 0) {
//   new Error ('suma of 0 and 0 expected to be 0')
// }

// if(suma(1, 5) !== 6) {
//   new Error ('suma of 1 and 5 expected to be 6')
// }

const checks = [
  {a: 0, b: 10, result: 10},
  {a: 8, b: 1, result: 9},
  {a: 4, b: 5, result: 9},
  {a: 1, b: 9, result: 10},
  {a: 5, b: 2, result: 7}
]

checks.forEach(check => {
  const {a, b, result} = check
  console.assert(
    suma(a, b) === result, 
    `suma of ${a} and ${b} expected to be ${result}`
  )
})

console.info(`${checks.length} checks performed...!!`)