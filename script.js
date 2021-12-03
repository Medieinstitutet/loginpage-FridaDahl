function hamMenu() {
    var x = document.getElementById("myLinks");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
}
const loginForm = document.querySelector("#login");
const createAccountForm = document.querySelector("#createAccount");
const logoutMenu = document.querySelector("#logoutMenu");
const loginMenu = document.querySelector("#loginMenu");
const createMenu = document.querySelector("#createMenu");



function showLoginForm(){
    loginForm.classList.remove("form--hidden");
    createMenu.classList.remove("menuLink--hidden");
    createAccountForm.classList.add("form--hidden");
    loginMenu.classList.add("menuLink--hidden");
    logoutMenu.classList.add("menuLink--hidden");
}

function showCreateAccount(){
    createAccountForm.classList.remove("form--hidden");
    loginForm.classList.add("form--hidden");
    createMenu.classList.add("menuLink--hidden");
    logoutMenu.classList.add("menuLink--hidden");
    loginMenu.classList.remove("menuLink--hidden");
    
}

function loggedIn(){
    createAccountForm.classList.add("form--hidden");
    loginForm.classList.add("form--hidden");  
    createMenu.classList.add("menuLink--hidden");
    loginMenu.classList.add("menuLink--hidden");
    logoutMenu.classList.remove("menuLink--hidden");
  
}


  document.addEventListener("DOMContentLoaded", () =>{
      loginMenu.addEventListener("click", e =>{
            e.preventDefault();
            showLoginForm()
            
      });

      createMenu.addEventListener("click", e =>{
        e.preventDefault();
        showCreateAccount()
       

      });

      if (localStorage.getItem("accounts") === null) {
          localStorage.setItem("accounts", JSON.stringify([{
            uname: "janne",
            upw: "test"
          },{
              uname: "frida",
              upw: "test2"
          }
          ]))
      }
    
      if (localStorage.getItem("currentLoggedinUser") !== null){
        loggedIn()

      }
      
});

function setFormMessage(formElement, type, message){
    const messageElement = formElement.querySelector(".formAlert");
    messageElement.textContent = message;
    messageElement.classList.remove("formAlert--error", "formAlert--success");
    messageElement.classList.add(`formAlert--${type}`);
}

function store(){
    var name = document.getElementById("createName").value;
    var pw = document.getElementById("createPw").value;
    var pwCheck = document.getElementById("createPwCheck").value;
    var accounts = JSON.parse(localStorage.getItem("accounts")) || [];
    var userData = null;

    if (name.length < 4) {
         alert('Username must be 4 characters or longer');
    }
    else if (pw.length < 4){
        alert('Password must be 4 characters or longer');
    }
    else if (pw != pwCheck){
        alert('Confirm password must be same as password');
    }
    else{
        for (i = 0 ; i < accounts.length; i++){
            if(accounts[i].uname === name){
                userData = accounts[i];
                break
            }
        }
        if(userData === null){
            accounts.push({uname:name, upw: pw});
            localStorage.setItem("accounts", JSON.stringify(accounts));
            JSON.parse(localStorage.getItem("accounts"))
            console.log(JSON.parse(localStorage.getItem("accounts")))
            alert('Account created');
        }
        else {
            alert ("Username busy");
        }
    }
}

function check(){
    var username = document.getElementById("loginName").value;
    var userPw = document.getElementById("loginPw").value;
    var userData = null;
    var accounts = JSON.parse(localStorage.getItem("accounts")) || [];
    
    for (i = 0 ; i < accounts.length; i++){
        if(accounts[i].uname === username){
            userData = accounts[i];
            break
        }
    }
    if (userData === null){
        alert("User dosn't exist")
        console.log(accounts)
    }
    else if(userPw === userData.upw){
        loggedIn()
        localStorage.setItem("currentLoggedinUser", JSON.stringify(userData))
    }
    else { 
        alert("Wrong password")
    }
}

function logout(){
    localStorage.removeItem("currentLoggedinUser");
}