/* Hamburgermenyn*/
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
const logoutButton = document.querySelector("#logoutForm");

/*kontrollerar att sidan är har laddat klart, lägger till användare i local storage, kontrollerar om någon är inloggad*/
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
/* visar loginformuläret och döljer annat innehåll, nollställer felmeddelanden samt tömmer inputfields. */
function showLoginForm(){
    loginForm.classList.remove("form--hidden");
    createMenu.classList.remove("menuLink--hidden");
    createAccountForm.classList.add("form--hidden");
    loginMenu.classList.add("menuLink--hidden");
    logoutMenu.classList.add("menuLink--hidden");
    logoutButton.classList.add("form--hidden");

    setFormMessage(loginForm, "error", " ");
    document.getElementById("loginName").value = '';
    document.getElementById("loginPw").value = '';
}

/* visar Create accountformuläret och döljer annat innehåll, nollställer felmeddelanden samt tömmer inputfields. */
function showCreateAccount(){
    createAccountForm.classList.remove("form--hidden");
    loginForm.classList.add("form--hidden");
    createMenu.classList.add("menuLink--hidden");
    logoutMenu.classList.add("menuLink--hidden");
    loginMenu.classList.remove("menuLink--hidden");
    logoutButton.classList.add("form--hidden");
    setFormMessage(createAccountForm, "error", " ");
    document.getElementById("createName").value = '';
    document.getElementById("createPw").value = '';
    document.getElementById("createPwCheck").value = '';
}

/* visar inloggat läge och döljer annat innehåll, ändrar hälsningsfras utifrån användarnamn */
function loggedIn(){
    createAccountForm.classList.add("form--hidden");
    loginForm.classList.add("form--hidden");  
    createMenu.classList.add("menuLink--hidden");
    loginMenu.classList.add("menuLink--hidden");
    logoutMenu.classList.remove("menuLink--hidden");
    logoutButton.classList.remove("form--hidden");
    helloUser()
}

/* Skapar personlig hälsning i inloggat läge */
function helloUser(){
    currentLoggedIn = JSON.parse(localStorage.getItem("currentLoggedinUser"));
    currentUser = String(currentLoggedIn.uname);
    var h = document.createElement("h1");
    h.setAttribute("id","helloUser");
    var t = document.createTextNode("Hello, " + currentUser + "!");
    h.appendChild(t);
    document.getElementById("container").prepend(h);
}

/* Skapar meddelanden i formuläret */
function setFormMessage(formElement, type, message){
    const messageElement = formElement.querySelector(".formAlert");
    messageElement.textContent = message;
    messageElement.classList.remove("formAlert--error", "formAlert--success");
    messageElement.classList.add(`formAlert--${type}`);
}

/* Skapar och sparar ner nya användare i localstorage från Create accountformulär. 
Kontrollerar att pw samt användarnamn är minst 4 tecken, kontrollerar att pw och confirm pw matchar.
kontrollerar om användarnamnet redan används. */
function store(){
    var name = document.getElementById("createName").value;
    var pw = document.getElementById("createPw").value;
    var pwCheck = document.getElementById("createPwCheck").value;
    var accounts = JSON.parse(localStorage.getItem("accounts")) || [];
    var userData = null;

    if (name.length < 4) {
        setFormMessage(createAccountForm, "error", "Username must be 4 characters or longer");
        setFormMessage()
    }

    else if (pw.length < 4){
        setFormMessage(createAccountForm, "error", "Password must be 4 characters or longer");
        setFormMessage()
    }
    else if (pw != pwCheck){
        setFormMessage(createAccountForm, "error", "Confirm password must be same as password");
        setFormMessage()
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
            setFormMessage(createAccountForm, "success", "Auccount created");
            setFormMessage()
        }
        else {
            setFormMessage(createAccountForm, "error", "Username busy");
            setFormMessage()
        }
    }
}

/* Kontrollerar om användarnamn och pw matchar mot sparade konton i localstorage, visar felmeddelanden om det blir fel */
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
        setFormMessage(loginForm, "error", "Wrong username");
    }
    else if(userPw === userData.upw){
        localStorage.setItem("currentLoggedinUser", JSON.stringify(userData));
        loggedIn()
        
    }
    else { 
        setFormMessage(loginForm, "error", "Wrong password");
        setFormMessage()
    }
}

/* Loggar ut användaren. Nollställer loginformulär, tar bort inloggad användare från localstorage, visar loginformulär*/
function logout(){
    setFormMessage(loginForm, "error", " ");
    var child = document.getElementById("helloUser");
    var parent = document.getElementById("container");
    parent.removeChild(child);
    logoutMenu.addEventListener("click", e =>{
        e.preventDefault();
        showLoginForm()   
  });
    localStorage.removeItem("currentLoggedinUser");
    showLoginForm()
}
