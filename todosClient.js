const baseadres = 'https://localhost:5001/todos/';
async function getTodos(){
  let response = await fetch(baseadres);
  var todos =  await response.json();

  return todos;
} 
async function crateTodo(todoItem){
  let response= await fetch(baseadres, {
 method: 'POST',
 body: JSON.stringify(todoItem),
 headers: {
   'Content-type': 'application/json; charset=UTF-8',
 },
})
let body = await response.json();
console.log(body)
return body
}
 async function deleteTodo(id){
 await fetch('https://localhost:5001/' + id, {
method: 'DELETE',
});
};
async function uptadeTodo(todo){
  let response = await fetch(baseadres, {
    method: 'PUT',
    body: JSON.stringify(todo),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    }
  })
  let body = await response.json();
  return body;
};
async function updateIsDoneTodo(id, isDone){
  let response = await fetch(baseadres + id +"/status", {
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