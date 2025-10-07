const todoList = [{
  name: 'review course',
  dueDate: '2025-09-29'
}];

renderTodoList();

function renderTodoList() {
  let todoListHTML = '';
  todoList.forEach((todoObject, index) => {
    const {name, dueDate} = todoObject;
    const html = `
      <div>${name}</div>
      <div>${dueDate}</div>
      <button class="js-delete-button" data-index="${index}">Delete</button>
    `;
    todoListHTML += html;
    document.querySelector('.js-todo-list').innerHTML = todoListHTML;

    document.querySelectorAll('.js-delete-button').forEach((button) => {
      button.addEventListener('click', (event) => {
        deleteTodo(event);
      });
    });
  }
  );

  // Loop over every toDo object and append it to "todoListHTML"
  // Show the objects inside the class "js-todo-list"
  // Loop over evey delete button and add an eventListener that deletes the toDo and rerender the Tasks


}

document.querySelector('.js-add-todo-button')
  .addEventListener('click', () => {
    addTodo();
  });

  document.querySelector('.js-delete-button').addEventListener('click', (event) => {  
    deleteTodo(event);
  }
  );

function addTodo() {
  const inputElement = document.querySelector('.js-name-input');
  const name = inputElement.value;

  const dateInputElement = document.querySelector('.js-due-date-input');
  const dueDate = dateInputElement.value;

  // Add these values to the variable "todoList"
  todoList.push({
    name: name,
    dueDate: dueDate
  }); 
  console.log(todoList);
  dateInputElement.value = '';
  inputElement.value = '';
  renderTodoList();
}

function deleteTodo(event) {
  const index = event.target.dataset.index;
  todoList.splice(index, 1);
  renderTodoList();
}