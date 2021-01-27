document.addEventListener("DOMContentLoaded", () => {
    renderLoginPage()
})

const BASE_URL = "http://localhost:3000"
const USER_URL = `${BASE_URL}/users`
const DRINK_URL = `${BASE_URL}/drinks`

function renderLoginPage() {
    //create divcontainer, header, form
    let div = document.createElement('div')
    div.className = 'w3-container'

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
    div.append(title, formDiv)
    document.body.appendChild(div)
    
    form.addEventListener('submit', (e) => userCreate(e))
}

function userCreate(e) {
    e.preventDefault()
    fetch(USER_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: e.target.user_name.value
        })
    })
    .then(() => {
        //check querySelector syntax
        document.getElementsByClassName('w3-container')[0].remove()
    })
    // .then(res => res.json())
    // .then(object => console.log(object))
}
