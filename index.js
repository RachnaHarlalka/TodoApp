import { v4 } from "uuid";




const inputTodo = document.getElementById("inputTodo");
const addBtn = document.querySelector("#addBtn")
const todoForm = document.getElementById("todoForm")
const todoList = document.querySelector(".todo-list");
const listItems = document.querySelectorAll(".todoText")
const downloadBtn= document.querySelector("#downloadBtn");
const STORE_KEY = "todos"
let todos=loadtodos();

renderTodo();

//Adding todo
todoForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    const todoName = inputTodo.value;
    if(todoName=="") return;
    const todo={
        Name:todoName,
        checked:false,
        id:v4()
    }
    inputTodo.value="";
    todos.push(todo);
    renderTodo();
})

//display todo in list
function renderTodo(){
    todoList.innerHTML="";
    todos.forEach((todo)=>{
        const div=`<li class="todo-list-items" data-todo-id=${todo.id}>
                    <input class="todoText text-white" id="todoName" type="text" value="${todo.Name}"  disabled>
                    <button class="red" id="deleteBtn"><i class="fa fa-trash fa-sm" aria-hidden="true"></i></button>
                    <button class="blue" id="editBtn"><i class="fas fa-edit fa-sm"></i></button>
                </li>`
    todoList.innerHTML+=div;
    saveTodos();

    })
}

//get todo from storage
function loadtodos(){
    const todoArray = JSON.parse(localStorage.getItem(STORE_KEY)) || [];
    return todoArray;
}



//delete todo 
document.addEventListener("click",(e)=>{
        const parent = e.target.closest(".todo-list-items");
        // const id=parent.dataset.todoId;
        if(e.target.id==="deleteBtn"){
            parent.remove();
            const id=parent.dataset.todoId;
            removeFromLocalStorage(id);
            
        }
        //update todo
        if(e.target.id==="editBtn"){
            // console.log("hello");
            if(e.target.innerText=="Edit"){
                const inputElement = parent.children[0];
                inputElement.removeAttribute("disabled");
                inputElement.classList.remove("text-white");
                e.target.innerText="Save";
                e.target.classList.remove("blue");
                e.target.classList.add("green");
            } 
            else
            {
                // console.log("Edit here");
                e.target.innerText="Edit";
                const inputElement=parent.children[0];
                const todoName=inputElement.value;
                console.log(todoName)
                const id=parent.dataset.todoId;
                console.log(id)
                todos.map((todo)=>{
                    if(todo.id===id){
                        todo.Name=todoName;
                    }
                    return todo;
                })
                saveTodos();
                inputElement.setAttribute("disabled","");
                inputElement.classList.add("text-white");
                e.target.classList.remove("green");
                e.target.classList.add("blue");
            }
        }
})



//delete todo from local storage
function removeFromLocalStorage(id){
    todos=todos.filter((todo)=>{
        return todo.id!==id;
    })
    saveTodos();
}


//save todo in the local storage
function saveTodos(){
    localStorage.setItem(STORE_KEY,JSON.stringify(todos))
}
// const Todos = JSON.stringify(todos);
console.log(todos[0].Name)
let string = "";
todos.forEach((t)=>{
    string+=t.Name;
    string+="\n";

})

console.log(string)
function CreateTextFile() {
    var blob = new Blob([string], {
       type: "text/plain;charset=utf-8",
    });
    saveAs(blob, "TodosList.txt");
 }

downloadBtn.addEventListener("click",()=>{
    CreateTextFile();
})