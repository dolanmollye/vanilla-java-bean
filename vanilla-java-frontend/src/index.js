document.addEventListener("DOMContentLoaded", () => {
    renderLoginPage()
    renderIngredientsForm()
    newIngredient()
    // renderDrinkCard()
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
        document.querySelector('#drink-container div').id = data[1]["id"]
        document.getElementById('loginContainer').remove()
    })
    // .then((foundUser) => {
    //     document.querySelector('.found-user').id = foundUser.id
    //     document.getElementById('loginContainer').remove()
    // })
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

// function createIngredient(ingredient) {
//     fetch(`${INGREDIENTS_URL}/${id}`, {
//         method: 'PATCH',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(ingredient)
//     })
//     .then(res => res.json())
// }

function getDrinkIngredients(id){
    fetch(`${DRINK_INGREDIENT}/${id}`)
    .then(res => res.json())
    .then(drinkIngredient => {renderDrinkCard(drinkIngredient)})
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
    loginDiv.append(title, formDiv)
    
    form.addEventListener('submit', (e) => handleSubmit(e))
}

function renderIngredientsForm(drinkIngredient) {
    let ingredientDiv = document.getElementById('ingredient-container')
    let header = document.createElement('h2')
    header.textContent = "Add the good stuff!"

    let ingFormDiv = document.createElement('div')
    ingFormDiv.id = 'ingredient-div'

    let form = document.createElement('form')
    form.setAttribute('method', 'post')

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
    form.setAttribute('method', 'post')
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


function renderDrinkCard(drinkIngredient) {
    let drinkDiv = document.querySelector('#drink-container div') 
    let p = document.createElement('p')
    let ul = document.createElement('ul')

    drinkIngredient.forEach(drinkIngredient => {
        let li = document.createElement('li')
        console.log(drinkIngredient)
        li.textContent = drinkIngredient.ingredient.name
        let deleteBtn = document.createElement('button')
        deleteBtn.id = drinkIngredient.id
        deleteBtn.textContent = 'x'
        deleteBtn.addEventListener('click', (e) => deleteIngredient(drinkIngredient.id))

        li.appendChild(deleteBtn)
        ul.appendChild(li)
    })
    drinkDiv.append(p,ul)
}





// HANDLERS
function handleSubmit(e) {
    e.preventDefault()
    createUser(e)
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
    .then(() => getDrinkIngredients(id))
}

function addNewIngredient(e) {
    e.preventDefault()
    console.log(e)
    let ingredient = {
        name: e.target.ingredient_name1.value
    }
    createIngredient(ingredient)
}

function deleteIngredient(id) {
    fetch(`${DRINK_INGREDIENT}/${id}`, {
      method: 'DELETE'
    })
    .then(() => {document.querySelector('#drink-container div ul li').remove()})
}