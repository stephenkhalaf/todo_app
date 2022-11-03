const form = document.getElementById('form')
const textarea = document.getElementById('textarea')
const msg = document.querySelector('.msg')
const posts = document.querySelector('.posts')
const addnew = document.getElementById('addnew')
const myform = document.getElementById('myform')
const info = document.getElementById('info')
const title = document.getElementById('title')
const error = document.querySelector('.error')
const date = document.getElementById('date')
const description = document.getElementById('description')
const tasks = document.getElementById('tasks')
const close = document.getElementById('close')
const cancel = document.querySelector('.cancel')
const add = document.getElementById('add')


form.addEventListener('submit', (e)=>{
    e.preventDefault()
    formValidation()
})

form.addEventListener('keyup', e=>{
    if(e.key == 'Enter') formValidation()
})

function formValidation(){
    if(textarea.value.trim() != ''){
        msg.innerHTML = ''
        acceptData()
        textarea.value = ''
    }else{
        msg.innerHTML = 'post cannot be blank'
    }
}
let data = []

let myData = [];

function acceptData(){
    data.push({
        text: textarea.value
    })
    localStorage.setItem('data', JSON.stringify(data))
    createPost()
}

function createPost(){
    posts.innerHTML = ''
    data.forEach(item=>{
        posts.innerHTML +=`<div>
        <p>${item.text}</p>
        <span class="options">
            <button onclick= deletePost(this) style='color: red'>delete</button>
            <button onclick = editPost(this) style='color: green'>edit</button>
        </span>
    </div>`
    })
}

function deletePost(e){
    e.parentElement.parentElement.remove()
    data = data.filter(item=>item.text != e.parentElement.parentElement.children[0].innerHTML)
    localStorage.setItem('data', JSON.stringify(data))
}

function editPost(e){
    data.forEach(item=>{
        if(item.text == e.parentElement.previousElementSibling.innerHTML){
            textarea.value = e.parentElement.previousElementSibling.innerHTML
        }
    })
    
    deletePost(e)
}


/****
 * 
 * 
 * new code
 */


addnew.addEventListener('click', ()=>{
    myform.style.display = 'block'
    cancel.style.display = 'block'
    close.style.display = 'block'
    add.textContents = 'add'
})

info.addEventListener('submit', (e)=>{
    e.preventDefault()
    myFormValidation(e)
    
})


function acceptFormData(){
    myData.push({
        title: title.value,
        date: date.value,
        description: description.value
    })
    localStorage.setItem('myData', JSON.stringify(myData ))
    createFormPost()
}


function createFormPost(){
    tasks.innerHTML = ''
    myData.forEach(item=>{
        tasks.innerHTML += `
    <div>
    <span style="font-weight: bold; font-size: 18px;">${item.title}</span>
    <span style="font-size: 11px; color:gray">${item.date}</span>
    <p>${item.description}</p>
    <span class="options">
        <button  style='color: red' onclick='deleteFormPost(event)'>delete</button>
        <button  style='color: green' onclick='editFormPost(event)'>edit</button>
    </span>
</div>
    `
    title.value  = ''
    date.value=''
    description.value =''

    })
    

}

function myFormValidation(e){
    if(title.value.trim() != ''){
        error.innerHTML = ''
        acceptFormData()
        e.target.parentElement.style.display = 'none'
    }else{
        error.innerHTML = 'Task cannot be blank'
    }

}


function deleteFormPost(e){
     e.target.parentElement.parentElement.remove()
    myData = myData.filter(item => item.title != e.target.parentElement.parentElement.children[0].innerHTML)
    localStorage.setItem('myData', JSON.stringify(myData ))
    console.log(myData)
    
}
  

function editFormPost(e){
    myform.style.display = 'block'

    myData.forEach(item=>{
        if(e.target.parentElement.parentElement.children[0].innerHTML == item.title){
            title.value  = item.title
            date.value = item.date
            description.value = item.description

        }
    })
    cancel.style.display = 'none'
    close.style.display = 'none'
    add.textContent = 'save'
    deleteFormPost(e)


}

cancel.addEventListener('click', ()=>myform.style.display = 'none')
close.addEventListener('click', ()=>myform.style.display = 'none');



(()=>{
    data = (JSON.parse(localStorage.getItem('data')) || []);
    myData  = (JSON.parse(localStorage.getItem('myData')) || []);
    createFormPost()
    createPost()
})()

