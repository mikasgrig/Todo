// Pasimti duomenys
var add = document.getElementById('todo-form')
var card = document.getElementById('todos')
var card1 = document.getElementById('dones')
var forms = document.querySelectorAll('.needs-validation')
var button = document.querySelector('.move-todo')
var button1 = document.querySelector('.move-toback')
var myModal = document.getElementById('exampleModal')
var titleInput = document.getElementById("todo-input4")
var descriptionInput = document.getElementById("todo-input5")
var difficultyInput = document.getElementById("todo-input6")
var h4;
var idUptade


var duomenys = localStorage.getItem("Sarasas");
duomenys = JSON.parse(duomenys);

window.onload = async ()  => {
  const todos = await getTodos();
  todos.forEach(todo => {
    var cardnew = `<div class="border border-1 shadow-sm p-3 mb-3 bg-body rounded todo-item" id = ${todo.id}>
    <h3 class="mb-3 input-name mano"> ${todo.title}</h3>
    <h4 class="mb-3 input-name mano"> ${todo.description}</h4>
    <h5 class="mb-3 input-name mano"> ${todo.difficulty}</h5>
    <button class="btn btn-danger delete" type="button">Delete</button>
    <button class="btn btn-warning edit" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">Edit</button>`
    if (todo.isDone === false) {
      cardnew += `<button class="btn btn-success move-todo" type="button">Move to Done</button></div>`
      card.innerHTML += cardnew
    } else {
      cardnew += `<button class="btn btn-success move-todo" type="button">Move to Back</button></div>`
      card1.innerHTML += cardnew
    }
  });
};

forms[0].addEventListener('submit',async function (e) {
  e.preventDefault()
  let title = document.getElementById("todo-input").value
  let description = document.getElementById("todo-input1").value
  let difficulty = document.getElementById("todo-input3").value
  if (title.length <= 0 && description.length <= 0) {
    document.getElementById("todo-input").classList.add('is-invalid')
    document.getElementById("todo-input1").classList.add('is-invalid')
  } if(title.length <= 0 ){
    document.getElementById("todo-input").classList.add('is-invalid')
  }if(description.length <= 0 ){
    document.getElementById("todo-input1").classList.add('is-invalid')
  }else {
    await crateTodo(title, description, difficulty);
    location.reload();
  }
});

document.addEventListener('click',async function (e) {
  if (e.target.matches('.delete')) {
    var id = e.target.closest(".todo-item").id;
    await deleteTodo(id);
    location.reload();
  }
  else if (e.target.matches('.move-todo')) {
    
    if (e.target.innerText == 'Move to Done') {
      let isDone = true;
      let id = e.target.closest(".todo-item").id;
      let body = await updateIsDoneTodo(id, isDone);
      location.reload();
    } else {
      let isDone = false;
      let id = e.target.closest(".todo-item").id;
      let body = await updateIsDoneTodo(id, isDone);
      location.reload();
    }
  }
  if (e.target.matches('.edit')) {
    let title = e.target.closest(".todo-item").querySelector("h3");
    let description = e.target.closest(".todo-item").querySelector("h4");
    let difficulty = e.target.closest(".todo-item").querySelector("h5");
    titleInput.value = title.innerText;
    descriptionInput.value = description.innerText;
    difficultyInput.value = difficulty.innerText;
    idUptade = e.target.closest(".todo-item").id;
  }
  if (e.target.matches('.save')) {
    if (titleInput.value.length <= 0 && descriptionInput.value.length <= 0) {
      document.getElementById("todo-input4").classList.add('is-invalid')
      document.getElementById("todo-input5").classList.add('is-invalid')
    } if(titleInput.value.length <= 0 ){
      document.getElementById("todo-input4").classList.add('is-invalid')
    }if(descriptionInput.value.length <= 0 ){
      document.getElementById("todo-input5").classList.add('is-invalid')
    }else {
      await uptadeTodo(idUptade, titleInput.value, descriptionInput.value, difficultyInput.value)
      location.reload();

    }
  }
});







