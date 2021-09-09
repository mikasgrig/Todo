async function getTodos(){
  let response = await fetch('https://localhost:5001/todos');
  var todos =  await response.json();

  return todos;
} 
async function crateTodo(title, description, difficulty){
  let response= await fetch('https://localhost:5001/todos', {
 method: 'POST',
 body: JSON.stringify({
      title: `${title}`,
      description: `${description}`,
      difficulty: `${difficulty}`
 }),
 headers: {
   'Content-type': 'application/json; charset=UTF-8',
 },
})
let body = await response.json();
console.log(body)
return body
}
async function deleteTodo(id){
 let response = await fetch('https://localhost:5001/' + id, {
method: 'DELETE',
});
};
async function uptadeTodo(id, title, description, difficulty){
  let response = await fetch('https://localhost:5001/todos', {
    method: 'PUT',
    body: JSON.stringify({
      id:`${id}`,
      title: `${title}`,
      description: `${description}`,
      difficulty: `${difficulty}`,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    }
  })
  let body = await response.json();
  return body;
};
async function updateIsDoneTodo(id, isDone){
  let response = await fetch('https://localhost:5001/todos/' + id, {
    method: 'PUT',
    body: JSON.stringify({
      isDone: isDone,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    }
  })
  let body = await response.json();
  return body;
};