import './style.css';

interface Todo{
  title:string;
  isCompleted: boolean;
  readonly id: string;
}

const todos:Todo[] = [];

//Selecting DOM elements
const todoContainer = document.querySelector(".todoContainer") as HTMLDivElement; //Selecting a div with classname of todoContainer.
const todoInput = document.getElementsByName("title")[0] as HTMLInputElement; //Selecting an input element.
const myForm = document.getElementById("myform") as HTMLFormElement; //Selecting form element.


//Handle form submission
myForm.onsubmit = (e:SubmitEvent)=>{
  e.preventDefault(); //Prevent feafult submit behaviour

  const todo:Todo = {
    title: todoInput.value,
    isCompleted: false,
    id: String(Math.random() * 1000),

  };

  todos.push(todo);
  todoInput.value = "";
  renderTodo(todos);
};



const generateTodoItem = (title:string, isCompleted:boolean, id:string) =>{

  //Creating a div element in Todo container.
  const todo: HTMLDivElement = document.createElement("div");
  todo.className = "todo"; //Giving div tag a class name of todo.


  //Creating an input element in Todo container.
  const checkBox:HTMLInputElement = document.createElement("input");
  checkBox.setAttribute("type", "checkbox"); //Setting an input type of checkbox.
  checkBox.className = "isCompleted"; //Giving it a classname of isCompleted
  checkBox.checked = isCompleted;
  checkBox.onchange = ()=>{

    todos.find(item=>{
      if(item.id===id) item.isCompleted=checkBox.checked;
      paragraph.className = checkBox.checked?"textCut" : "";

    })
  }

  //Creating a p element in Todo container.
  const paragraph:HTMLParagraphElement = document.createElement("p");
  paragraph.innerText = title;
  paragraph.className = isCompleted ? "textCut" : "";


  //Creating a button element in Todo container.
  const btn:HTMLButtonElement = document.createElement("button");
  btn.innerText = "X";
  btn.className = "deleteBtn";
  btn.onclick = ()=>{
    deleteTodo(id);
  }


  //Appends checkbox, paragraph and button elements in todo div.
  todo.append(checkBox, paragraph, btn);

  //Appends todo element in todoContainer.
  todoContainer.append(todo);

}

const deleteTodo = (id:string)=>{
  const idx = todos.findIndex((item)=> item.id === id);
  todos.splice(idx,1);
  renderTodo(todos);
};

const renderTodo = (todos:Todo[])=>{
  todoContainer.innerText = "";
  todos.forEach((item)=>{
    generateTodoItem(item.title, item.isCompleted, item.id);
  });
}