let promise = await fetch('https://jsonplaceholder.typicode.com/todos/1')
export let data = await promise.json()

console.log(data)
