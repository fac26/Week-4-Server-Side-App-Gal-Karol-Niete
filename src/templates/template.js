const { sanitize, validate } = require('./templates/helper.js');

//Overall layout

function layout ({title,content}){
    return /*HTML*/`  
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <link rel ="stylesheet" href ="../styles.css">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title}</title>
    </head>
    <body>
        <main>
            ${content}
        </main>
    </body>
    </html>`;
    }

//Nav Bar layout
function navBar(id) {
    return /*html */ `
      <header>
        <div class="container">
          <nav class ="nav_container"> 
              <h1>I &hearts; food!</h1> 
              <ul class ="nav_items">
                  <li><a href="/all-food">All food</a></li>
                  <li><a href="/my-food/${id}">My food</a></li>
                  <li><form method="POST" action="/log-out"><button class="form_button">Log Out</button></form></li>
              </ul>
          </nav>
        </div>
      </header>
      `;
  }



//Home layout

function Home (){
    return /*HTML*/` 
    <div class="home-container">
    <h1>I &hearts; food!</h1>
    
    <div class ="img_container">
       <img src="../public/images/donut.png" alt="Donut image">
    </div>

    <div class="button_container">
        <a href="/sign-up">Sign Up</a>
        <a href="/log-in">Log In</a>
    </div>
    </div>
    `
}

// Sign up form layout
function signUpForm(title, errors = {}, values = {}) {
    return /*html*/ `
   <div class="signUp-container" >  
  
    <h1>${title}</h1>
  <form  method="POST">
  
      <label for="name">Name <span aria-hidden="true">*</span></label>
      <input id="name" name="name" value= '${sanitize(values.name)}' required>
      ${validate(errors.name)}
  
      <label for="email">Email <span aria-hidden="true">*</span></label>
      <input type="email" id="email" name="email" value= '${sanitize(values.email)}' required>
      ${validate(errors.email)}
  
      <label for="password">Password <span aria-hidden="true">*</span></label>
      <input type="password" id="password" name="password" required>
      ${validate(errors.password)}

      <button>Sign up</button>
  </form>
  </div>
      `;
  }

//Login form  

function loginForm(errors = {}, values = {}) {
    return /*html*/ `
    <div class="logIn-container" >  
  
    <h1>Log in</h1>
        <form  method="POST">
            <label for="email">Email <span aria-hidden="true">*</span></label>
            <input type="email" id="email" name="email" value='${sanitize(values.email)}' required>
            ${validate(errors.email)}

            <label for="password">Password <span aria-hidden="true">*</span></label>
            <input type="password" id="password" name="password" required>
            ${validate(errors.password)}
        
        <button>Log in</button>
        </form>
  </div>
      `;
  }

  function errorPage() {
    return /* html */ `
    <div class="home-container">
     <h1>Login Failed</h1>
     <p>Something went wrong. Please enter the correct email or password.</p>
     <div class="button_container">
     <a href="/log-in">Log in</a>
     <span>or</span>
     <a href="/sign-up"> Sign up</a>
     </div>
     </div>`;
  }

  function existingUser() {
    return /*html */ `
      <div class="home-container">
      <h1>This email already exists on our database</h1>
      <p>Please either sign up or try to log in</p>
      <div class="button_container">
      <a href="/log-in">Log in</a>
      or
      <a href="/sign-up">Sign up</a>
      </div>
      </div>
    `;
  }

 

  function allFood(foodList, id) {
    const foods = foodList.map(
        (food) =>/*HTML*/ `
        <div class="allFood-container">
          <li class="food-post">
            <h2>${food.dish_name}</h2>
            <p>${food.food_desc}</p>
              <div class="image_container">
              <img src="${food.image_path}" alt="${food.dish_name}" />
              </div>
          </li>
        </div>
        `
      );
    return /*html */ `
      ${navBar(id)}
      <h1>All Food</h1>
      <div class="container">
      <ul class="food-list">
          ${foods.join("")}
      </ul>
      </div>
      `;
  }

  function myFood(foodList, id) {
    const foods = foodList.map(
        (food) =>/*HTML*/ `
        <div class="allFood-container">
          <li class="food-post">
            <h2>${food.dish_name}</h2>
            <p>${food.food_desc}</p>
              <div class="image_container">
              <img src="${food.image_path}" alt="${food.dish_name}" />
              </div>
          </li>
        </div>
        `
      );
      return /*html */ `
      ${navBar(id)}
      <h1>Submit a picture of your food!</h1>
      <div class="container">
        ${addfoodForm(errors = {}, values = {})}
      <ul>
          ${foods.join("")}
      </ul>
      </div>
      `;
  }

  function addfoodForm (errors = {}, values = {}){
    const foodForm = /*HTML*/`
    <form method="POST" class="food-form">
        <label for="dishName">Dish name<span aria-hidden="true">*</span></label>
        <input type="text" id="dishName" name="dishName" value='${sanitize(values.dish_name)}'>
        ${validate(errors.dish_name)}

        <label for="foodDesc">Tell us about the dish<span aria-hidden="true">*</span></label>
        <input type="text" id="foodDesc" name="foodDesc" value='${sanitize(values.food_desc)}'>
        ${validate(errors.food_desc)}

        <label for="foodImg">Food Image<span aria-hidden="true">*</span></label>
        <input id="foodImg" name="foodImg" type="file" >
        ${validate(errors.foodImg)}
        
        <label for="sharing">Do you want to share with other users?  
        <span aria-hidden="true">*</span>
        <input id="sharing" name="sharing" type="checkbox">
        </label>
        
        <button>Submit</button>
    </form>
    `
    return foodForm;
  }

  module.exports = {
    layout,
    Home,
    signUpForm,
    loginForm,
    allFood,
    myFood,
    errorPage,
    existingUser,
  };