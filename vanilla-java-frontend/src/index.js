document.addEventListener("DOMContentLoaded", () => {
    renderLoginPage()
    renderIngredientsForm()
    newIngredient()
    userInfo()
    drinkNameUpdate()
})

const BASE_URL = "http://localhost:3000"
const USER_URL = `${BASE_URL}/users`
const DRINK_URL = `${BASE_URL}/drinks`
const INGREDIENTS_URL = `${BASE_URL}/ingredients`
const DRINK_INGREDIENT = `${BASE_URL}/drink_ingredients`

//DATA
function createUser(e) {
    fetch(USER_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: e.target.user_name.value
        })
    })
    .then(res => res.json())
    .then(data => {
        document.querySelector('.found-user').id = data[0]["id"]
        document.querySelector('#drink-container div').id = data[1]["id"]
        document.querySelector('#loginContainer').style.display = "none"
    })
}

function getAllIngredients(){
        fetch(INGREDIENTS_URL)
        .then(res => res.json())
        .then(ingredient => {
            let option;
            for (let i = 0; i < ingredient.length; i++) {
                option = document.createElement('option')
                option.text = ingredient[i].name
                option.value = ingredient[i].name
                option.id = ingredient[i].id
                dropdown.add(option)
            }
        })
}

function createIngredient(ingredient) {
    fetch(INGREDIENTS_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(ingredient)
    })
    .then(res => res.json())
    .then((ni) => {
        let newOption = document.createElement('option')
        newOption.id = ni.id
        newOption.value = ni.name
        newOption.innerText = ni.name

        document.querySelector('#dropdown').append(newOption)
    })
}

function userPatch(id, e) {
    fetch(`${USER_URL}/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: e.target.user_name.value
        })
    })
    .then(res => res.json())
    .then(user => {
        let userInfo = document.querySelector('.userDiv')
        newName = userInfo.querySelector('h2')
        newHeader = userInfo.querySelector('h1')
        newName.textContent = user.name
        newHeader.textContent = `${user.name}, your name has been updated!`
    })
}

function patchDrinkName(id, e){
    fetch(`${DRINK_URL}/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: e.target.drink_name.value
        })
    })
    .then(res => res.json())
    .then(() => {
        document.querySelector('#drink-container').innerHTML = ""
        createDrink()

        // document.querySelector('#postDrinkContainer')
    })
}

function createDrink(){
    console.log(document.querySelector('.found-user').id)
    fetch (DRINK_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: '',
            id: document.querySelector('.found-user').id
        })
    })
    .then(res => res.json())
    .then((drink) => {
        let idDiv = document.createElement('div')
        idDiv.id = drink.id
        console.log(drink)
        idDiv.className = 'drink-id-div'
        document.querySelector('#drink-container').append(idDiv)
        drinkNameUpdate()
    })
}

// DOM
function renderLoginPage() {
    //create divcontainer, header, form
    let loginDiv = document.getElementById('loginContainer')
    let title = document.createElement('h1')
    title.textContent = "Welcome to VanillaJavaBean"
    let formDiv = document.createElement('div')
    formDiv.id = 'form-div'
    let form = document.createElement('form')
    form.setAttribute('method', 'post')
    let input = document.createElement('input')
    input.type = 'text'
    input.name = 'user_name'
    input.id = 'user_name1'
    let submitBtn = document.createElement('button')
    submitBtn.textContent = "Let's get caffeinated"
    submitBtn.type = 'submit'

    form.append(input,submitBtn)
    formDiv.appendChild(form)
    loginDiv.append(title,formDiv)
    
    form.addEventListener('submit', (e) => handleSubmit(e))
}

function renderIngredientsForm(drinkIngredient) {
    let ingredientDiv = document.getElementById('ingredient-container')
    let header = document.createElement('h2')
    header.textContent = "Add the good stuff!"

    let ingFormDiv = document.createElement('div')
    ingFormDiv.id = 'ingredient-div'

    let form = document.createElement('form')
    // form.setAttribute('method', 'post')

    let select = document.createElement('select')
    let defaultOption = document.createElement('option')

    select.name = 'ingredients'
    select.id = 'dropdown'
    select.length = 0

    select.add(defaultOption)
    select.selectedIndex = 0

    getAllIngredients()

    let addBtn = document.createElement('button')
    addBtn.textContent = 'Mix it in'

    select.appendChild(defaultOption)
    form.append(select,addBtn)
    ingFormDiv.appendChild(form)
    ingredientDiv.append(header,ingFormDiv)

    form.addEventListener('submit', (e) => submitIngredient(e))
}

function newIngredient() {
    let ingredientDiv = document.getElementById('ingredient-container')

    let formDiv = document.createElement('div')
    formDiv.id = 'new-ing-div'

    let header = document.createElement('h2')
    header.textContent = 'Add a new ingredient'

    let form = document.createElement('form')
    // form.setAttribute('method', 'post')
    let input = document.createElement('input')
    input.type = 'text'
    input.name = 'ingredient_name'
    input.id = 'ingredient_name1'

    let submitBtn = document.createElement('button')
    submitBtn.textContent = "Add"
    submitBtn.type = 'submit'

    form.append(input,submitBtn)
    formDiv.append(header,form)
    ingredientDiv.appendChild(formDiv)

    form.addEventListener('submit', (e) => addNewIngredient(e))
}

function userInfo() {
    let userDiv = document.getElementById('user-info')
    let userBtn = document.createElement('button')
    userBtn.textContent = 'Update Your Info'
    let switchBtn = document.createElement('button')
    switchBtn.textContent = ('Switch User')

    userDiv.append(userBtn,switchBtn)

    switchBtn.addEventListener('click', switchUser)
    userBtn.addEventListener('click', handleUserInfo)
}

function drinkNameUpdate() {
    let drinkDiv = document.querySelector('#drink-container')
    let formDiv = document.createElement('div')
    let nameForm = document.createElement('form')
    let nameInput = document.createElement('input')
    let label = document.createElement('label')
    label.innerText = 'Done? Name your masterpiece:'
    nameInput.type = 'text'
    nameInput.name = 'drink_name'

    let submitBtn = document.createElement('button')
    submitBtn.textContent = 'Post'
    submitBtn.type = 'submit'

    nameForm.append(label,nameInput,submitBtn)
    formDiv.appendChild(nameForm)
    drinkDiv.appendChild(formDiv)

    nameForm.addEventListener('submit', (e) => updateDrinkHandler(e))
}

/////////////////////////////////////// HANDLERS
function handleSubmit(e) {
    e.preventDefault()
    createUser(e)
    e.target.reset()
}

function submitIngredient(e) {
    e.preventDefault()
    let x = e.target.ingredients.value
    let id = parseInt(Array.from(document.querySelectorAll("select option")).find(i => (i.value === x)).id)
    fetch(DRINK_INGREDIENT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ingredient_id: id,
            drink_id: document.querySelector('#drink-container div').id
        })
    })
    .then(res => res.json())
    .then((di) => {
        // getDrinkIngredients(id)/////////////////////////////////////////////BOOKMARK
        let id = di.id
        let ul = document.createElement('ul')
        let ingredientLi = document.createElement('li')
        ingredientLi.textContent = di.ingredient.name
        let deleteBtn = document.createElement('button')
        deleteBtn.textContent = 'x'


        ingredientLi.appendChild(deleteBtn)
        ul.appendChild(ingredientLi)
        document.querySelector('#drink-container').append(ul)

        deleteBtn.addEventListener('click', () => deleteIngredient(id))
    })
    
}

function addNewIngredient(e) {
    e.preventDefault()
    let ingredient = {
        name: e.target.ingredient_name.value
    }
    createIngredient(ingredient)
    e.target.reset()
}

function deleteIngredient(id) {
    fetch(`${DRINK_INGREDIENT}/${id}`, {
      method: 'DELETE'
    })
    .then(() => {document.querySelector('#drink-container ul li').remove()})
}

function handleUserInfo() {
    fetch(`${USER_URL}/${document.querySelector('.found-user').id}`)
    .then(res => res.json())
    .then(user => {
        let userInfo = document.getElementById('current-user')
        let userDiv = document.createElement('div')
        userDiv.className = ('userDiv')

        let greeting = document.createElement('h1')
        greeting.textContent = `Hey ${user.name}. Update or Delete your account below`

        let userName = document.createElement('h2')
        userName.textContent = `${user.name}`
        let form = document.createElement('form')
        form.setAttribute('method','patch')
        let input = document.createElement('input')
        input.type = 'text'
        input.name = 'user_name'
        let editBtn = document.createElement('button')
        editBtn.textContent = "Edit User"
        editBtn.type = 'submit'
        let deleteBtn = document.createElement('button')
        deleteBtn.textContent = "Delete User"

        form.append(input,editBtn)
        userDiv.append(greeting,userName,form, deleteBtn)
        userInfo.appendChild(userDiv)

        form.addEventListener('submit', (e) => editUserSubmit(e))
        deleteBtn.addEventListener('click',() => deleteUser(document.querySelector('.found-user').id))
    })
}

function switchUser(){
    document.querySelector('#current-user').innerHTML = ""
    document.querySelector('#loginContainer').style.display = 'block'
}

function editUserSubmit(e) {
    e.preventDefault()
    const id = `${document.querySelector('.found-user').id}`
    userPatch(id, e)
    e.target.reset()
}

function deleteUser(id){
    fetch(`${USER_URL}/${id}`,{
        method: 'DELETE'
    })
    document.querySelector('#current-user').innerHTML = ""
    document.querySelector('#loginContainer').style.display = 'block'
}

function updateDrinkHandler(e) {
    e.preventDefault()
    const id = `${document.querySelector('.drink-id-div').id}`
    patchDrinkName(id, e)
}