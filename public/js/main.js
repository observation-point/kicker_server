const ROOT = document.getElementById('root');

function createInput(name) {
    const input = document.createElement('input');
    input.type = name;
    input.id = name;
    input.name = name;
    input.placeholder = name.toUpperCase();

    return input;
}

function createButton() {

}

function getRegistrationForm() {
    event.preventDefault();
    const loginScreen = document.getElementById('loginScreen');
    const form = document.getElementById('formAuth');
    loginScreen.removeChild(form);

    loginScreen.appendChild(createRegistrationForm());
}

function getLoginForm() {
    event.preventDefault();
    const loginScreen = document.getElementById('loginScreen');
    const form = document.getElementById('formAuth');
    loginScreen.removeChild(form);

    loginScreen.appendChild(createLoginForm());
}

function actionLobby() {

}

async function actionLogin(event) {
    event.preventDefault();
    const login = document.getElementById("login").value;
    const password = document.getElementById("password").value;

    const { user } = (await axios.post(`http://localhost:3000/auth/${login}`, { password })).data;

    const form = document.getElementById("loginScreen");
    form.parentNode.removeChild(form);

}

async function actionRegistartion(event) {
    event.preventDefault();
    const login = document.getElementById("login").value;
    const password = document.getElementById("password").value;

    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;

    const { user } = (await axios.post(`http://localhost:3000/user/`, { 
        id: uuidv4(),
        login,
        password,
        firstName,
        lastName,
        avatar: " "
    })).data;

    const form = document.getElementById("loginScreen");
    form.parentNode.removeChild(form);

}

function createLoginForm() {
    const form = document.createElement('form');
    form.id = "formAuth";
    form.className = "from";
    form.action = "/index.html";
    form.method = "post";
    const LOGIN = "login";
    const loginInput = createInput(LOGIN);

    const PASSWORD = "password";
    const passInput = createInput(PASSWORD);

    const button = document.createElement('button');
    button.type = "submit";
    button.id = "formButton";
    button.innerText = "ok".toUpperCase();

    form.appendChild(loginInput);
    form.appendChild(passInput);
    form.appendChild(button);

    form.onsubmit = actionLogin;

    return form;
    
}

function createRegistrationForm() {
    const form = document.createElement('form');
    form.id = "formAuth";
    form.className = "from";
    form.action = "/index.html";
    form.method = "post";

    const LOGIN = "login";
    const loginInput = createInput(LOGIN);

    const PASSWORD = "password";
    const passInput = createInput(PASSWORD);

    const FIRST_NAME = "firstName";
    const fnameInput = createInput(FIRST_NAME);

    const LAST_NAME = "lastName";
    const lnameInput = createInput(LAST_NAME);

    const button = document.createElement('button');
    button.type = "submit";
    button.id = "formButton";
    button.innerText = "ok".toUpperCase();

    form.appendChild(loginInput);
    form.appendChild(passInput);
    form.appendChild(fnameInput);
    form.appendChild(lnameInput);
    form.appendChild(button);

    form.onsubmit = actionRegistartion;

    return form;
    
}

class Game {
    constructor() {
        this.div = document.createElement('div');
        this.div.id = "gamefield";

        this.players = [];
        this.count = [];
        this.isRunning = false;
    }

    async init() {
        const { data } = await axios.get('http://localhost:3000/game');
        this.players = data.players;
        this.count = data.count;
        this.isRunning = data.isRunning;
    }

    get state() {
        return {
            playes: this.players,
            count: this.count,
            isRunning: this.isRunning
        }
    }

    draw() {
        ROOT.appendChild(this.div);

        const redAtack = document.createElement('div');
        redAtack.className = "lobby red attack";
        const redDefense = document.createElement('div');
        redDefense.className = "lobby red defense";
        const blackAtack = document.createElement('div');
        blackAtack.className = "lobby black defense";
        const blackDefense = document.createElement('div');
        blackDefense.className = "lobby black defense";

        this.div.appendChild(redAtack);
        this.div.appendChild(blackAtack);
        this.div.appendChild(redDefense);
        this.div.appendChild(blackDefense);

        this.div.onclick = addToLobby;
    }

}

async function addToLobby(event) {
    const classes = event.target.classList;
    const request = {
        role: 0,
        side: 0
    }
    
    if (classes.value.indexOf('lobby') !== -1){
        if (classes.value.indexOf('defense') !== -1){
            request.role += 1;
        }
        if (classes.value.indexOf('black') !== -1){
            request.side += 1;

        }
    }

    const { data } = await axios.post('http://localhost:3000/game', request);
    console.log(data);

}

class LoginScreen {
    static async checkAuthorize() {
        const test = await axios.get('http://localhost:3000/auth');

        return test.data.isAuthorized;
    }
    constructor() {
        this.div = document.createElement('div');
        this.div.id = "loginScreen";
    }
    
    draw() {
        ROOT.appendChild(this.div);

        const loginScrenLink = document.createElement('a');
        loginScrenLink.innerText = "LOG IN";
        loginScrenLink.onclick = getLoginForm;

        const regScrenLink = document.createElement('a');
        regScrenLink.innerText = "REGISTRATION";
        regScrenLink.onclick = getRegistrationForm;
        
        this.div.appendChild(loginScrenLink);
        this.div.appendChild(regScrenLink);

        this.div.appendChild(createLoginForm());
    }
    
}

const game = new Game();
const loginScreen = new LoginScreen();

(async function() {
    await game.init();
    game.draw();
    if (!(await LoginScreen.checkAuthorize())) {
        loginScreen.draw();
    }
})();