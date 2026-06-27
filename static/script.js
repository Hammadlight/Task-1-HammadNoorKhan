async function loadTasks(){

    let response = await fetch("/tasks");

    let tasks = await response.json();

    let list = document.getElementById("taskList");

    list.innerHTML="";

    tasks.forEach((task,index)=>{

        list.innerHTML+=`

        <div class="task">

            <span>${task}</span>

            <div class="icons">

                <span class="icon" onclick="editTask(${index},'${task}')">✏️</span>

                <span class="icon" onclick="deleteTask(${index})">🗑️</span>

            </div>

        </div>

        `;

    });

}

async function addTask(){

    let input=document.getElementById("taskInput");

    if(input.value.trim()=="")
        return;

    await fetch("/add",{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({
            task:input.value
        })

    });

    input.value="";

    loadTasks();

}

async function deleteTask(index){

    await fetch("/delete/"+index,{
        method:"DELETE"
    });

    loadTasks();

}

async function editTask(index,task){

    let newTask=prompt("Edit task",task);

    if(newTask==null)
        return;

    await fetch("/edit/"+index,{

        method:"PUT",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({
            task:newTask
        })

    });

    loadTasks();

}

loadTasks();