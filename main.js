// Pasimti duomenys
var add = document.getElementById('todo-form')
var card = document.getElementById('todos')
var card1 = document.getElementById('dones')
var forms = document.querySelectorAll('.needs-validation')
var button = document.querySelector('.move-todo')
var button1 = document.querySelector('.move-toback')
var myModal = document.getElementById('exampleModal')
var editInput = document.getElementById("todo-input2");
var h4;
// var duomenys = [
//   {
//     todo: "Pirmas",
//     done: true,
//   },
//   {
//     todo: "Antras",
//     done: false,
//   },
//   {
//     todo: "Trecias",
//     done: true,
//   }
// ];
// duomenys = JSON.stringify(duomenys);
// localStorage.setItem('Sarasas', duomenys)

var duomenys = localStorage.getItem("Sarasas");
duomenys = JSON.parse(duomenys);

window.onload = async ()  => {
  const todos = await getTodos();
  todos.forEach(todo => {
    var cardnew = `<div class="border border-1 shadow-sm p-3 mb-3 bg-body rounded todo-item" data-id = ${todo.id}><h3 class="mb-3 input-name mano"> ${todo.title}</h3>
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
  var title = document.getElementById("todo-input").value
  var description = document.getElementById("todo-input1").value
  var difficulty = document.getElementById("todo-input3").value
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

document.addEventListener('click', function (e) {
  if (e.target.matches('.delete')) {
    var duomenys = localStorage.getItem("Sarasas");
    duomenys = JSON.parse(duomenys);
    h4 = e.target.closest(".todo-item").querySelector("h4");
    var h4text = h4.innerText;
    var todo = h4text;
    duomenys = duomenys.filter(todoold => {
      return todoold.todo != todo
    });
    duomenys = JSON.stringify(duomenys);
    localStorage.setItem('Sarasas', duomenys);
    e.target.closest(".todo-item").remove();
  }
  else if (e.target.matches('.move-todo')) {
    var cardAll = e.target.closest('.todo-item');
    var duomenys = localStorage.getItem("Sarasas");
    duomenys = JSON.parse(duomenys);
    if (e.target.innerText == 'Move to Done') {
      e.target.innerText = 'Move to Back';
      card1.appendChild(cardAll);
      h4 = e.target.closest(".todo-item").querySelector("h4");
      var h4text = h4.innerText;
      duomenys = duomenys.map(item => item.todo == h4text? {
        ...item, done: !item.done
      } : item );
      duomenys = JSON.stringify(duomenys);
      localStorage.setItem('Sarasas', duomenys);
    } else {
      e.target.innerText = 'Move to Done';
      card.appendChild(cardAll);
      h4 = e.target.closest(".todo-item").querySelector("h4");
      var h4text = h4.innerText;
      duomenys = duomenys.map(item => item.todo == h4text? {
        ...item, done: !item.done
      } : item );
      duomenys = JSON.stringify(duomenys);
      localStorage.setItem('Sarasas', duomenys);
    }
  }
  if (e.target.matches('.edit')) {
    h4 = e.target.closest(".todo-item").querySelector("h4");
    var h4text = h4.innerText;
    editInput.value = h4text;
  }
  if (e.target.matches('.save')) {
    var newname =  editInput.value
    var h4text = h4.innerText
    var duomenys = localStorage.getItem("Sarasas");
    duomenys = JSON.parse(duomenys);

    duomenys = duomenys.map(item => item.todo == h4text? {
      ...item, todo: newname
    } : item );
    h4.innerText = newname
    duomenys = JSON.stringify(duomenys);
      localStorage.setItem('Sarasas', duomenys);
  }
  
});







