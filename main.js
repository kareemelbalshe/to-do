let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");
let delAll=document.querySelector(".del-all");


arrayOfTasks=[];

if(localStorage.getItem("tasks")){
    arrayOfTasks=JSON.parse(localStorage.getItem("tasks"));
}

getDataFromLocalStorage();

submit.onclick=function(){
    if(input.value !== ""){
        addTackToArray(input.value);
        input.value="";
    }
};

tasksDiv.addEventListener("click",(e)=>{
    deleteTaskWith(e.target.parentElement.getAttribute("data-id"));

    if(e.target.classList.contains("del")){
        e.target.parentElement.remove();
    }

    if(e.target.classList.contains("task")){
        toggleStatusTaskWith(e.target.getAttribute("data-id"))
        e.target.classList.toggle("done");
    }
});


function addTackToArray(taskText){
    const task={
        id: Date.now(),
        title: taskText,
        completed:false,
    };
    arrayOfTasks.push(task);

    addElementsToPageFrom(arrayOfTasks);

    addDataToLocalStorageFrom(arrayOfTasks);
}

delAll.onclick=function (){
    window.localStorage.removeItem("tasks");

    tasksDiv.innerHTML="";
}

function addElementsToPageFrom(arrayOfTasks){
    tasksDiv.innerHTML="";

    arrayOfTasks.forEach((task)=>{
        let div=document.createElement("div");
        div.className="task";
        if(task.completed){
            div.className="task done";
        }
        div.setAttribute("data-id",task.id);
        div.appendChild(document.createTextNode(task.title));
        let span=document.createElement("span");
        span.className="del";
        span.appendChild(document.createTextNode("Delete"));
        div.appendChild(span);
        tasksDiv.appendChild(div);
    });
}


function addDataToLocalStorageFrom(arrayOfTasks){
    window.localStorage.setItem("tasks",JSON.stringify(arrayOfTasks));
}

function getDataFromLocalStorage(){
    let data=window.localStorage.getItem("tasks");
    if(data){
        let tasks=JSON.parse(data);
        addElementsToPageFrom(tasks);
    }
}


function deleteTaskWith(taskId){
    for(let i=0;i<arrayOfTasks.length;i++){
        arrayOfTasks=arrayOfTasks.filter((task)=>task.id!=taskId);
        addDataToLocalStorageFrom(arrayOfTasks);
    }
}

function toggleStatusTaskWith(taskId){
    for(let i=0;i<arrayOfTasks.length;i++){
        if(arrayOfTasks[i].id==taskId){
            arrayOfTasks[i].completed==false?(arrayOfTasks[i].completed=true):(arrayOfTasks[i].completed=false)
        }
    }
    addDataToLocalStorageFrom(arrayOfTasks);
}