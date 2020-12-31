const ajax = (url, settings, isSelect) => {
    fetch(url, settings)
        .then(response => response.json())
        .then(data => isSelect ? getInfo(data) : handle())
        .catch(error => console.log(error));
};

const handle = data => {
    var url = 'https://jsonplaceholder.typicode.com/users';
    ajax(url, {method: 'GET'}, true);
};

const getInfo = data => {
    const dataInfo = data;

    var username = document.getElementById('username').value;
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var street = document.getElementById('street').value;
    var city = document.getElementById('city').value;
    var postalCode = document.getElementById('postal-code').value;

    var allCorrect = true;
    if (username) {
        if (username.length < 3 || username.length > 10) {
            const error = document.getElementById('error');
            error.innerHTML += 'Невалидно Потребителско име (трябва да е между три и десет символа)';
            allCorrect = false;
        }
    } else {
        const error = document.getElementById('error');
        error.innerHTML += ' Невалидно Потребителско име Потребителското име е задължително поле!';
        allCorrect = false;
    }

    if (name) {
        if (name.length > 50) {
            const error = document.getElementById('error');
            error.innerHTML += ' Невалидно Име и фамилия (трябва да е под петдесет символа)';
            allCorrect = false;
        }
    } else {
        const error = document.getElementById('error');
        error.innerHTML += ' Невалидно Име и фамилия Името е задължително поле!';
        allCorrect = false;
    }

    if (email == '') {
        const error = document.getElementById('error');
        error.innerHTML += ' Невалиден Email Email е задължително поле!';
        allCorrect = false;
    }

    if (password) {
        if (password.length < 6 || password.length > 10) {
            const error = document.getElementById('error');
            error.innerHTML += ' Невалидна Парола (трябва да е между шест и десет символа)';
            allCorrect = false;
        } else {
            var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,10}$/;
            if (!password.match(passw)) {
                const error = document.getElementById('error');
                error.innerHTML += ' Невалидна Парола (трябва да съдържа поне една малка, една главна букви и поне една цифра)';
                allCorrect = false;
            }
        }
    } else {
        const error = document.getElementById('error');
        error.innerHTML += ' Невалидна Парола Паролата е задължително поле!';
        allCorrect = false;
    }

    if (postalCode) {
        var postalC = /(^[0-9]{5})\-([0-9]{4})/;
        if (!postalCode.match(postalC)) {
            const error = document.getElementById('error');
            error.innerHTML += ' Невалиден Пощенски код Пощенскит код изглежда така: 11111-1111!';
            allCorrect = false;
        }
    }

    if (allCorrect) {
        var userExists = false;
        for (var i = 0; i < dataInfo.length; i++) {
            if (dataInfo[i].username === username) {
                console.log("User exists!");
                userExists = true;
                const error = document.getElementById('error');
                error.innerHTML = `Невалидно потребителско име Потребителското име вече съществува`;
            } 
        }

        if (userExists == false) {
            console.log("Inserted user!");
            const success = document.getElementById('success');
            success.innerHTML = `Успешно регистрирахте потребител ${name} с потребителско име ${username}`;
        }
    }

    const selectMade = document.getElementById('selectMade');
    selectMade.innerHTML = `Select made! ${username}`;

    var usernameField = document.getElementById('username');
    usernameField.value = "";

    var nameField = document.getElementById('name');
    nameField.value = "";

    var emailField = document.getElementById('email');
    emailField.value = "";

    var passwordField = document.getElementById('password');
    passwordField.value = "";

    var streetField = document.getElementById('street');
    streetField.value = "";

    var cityField = document.getElementById('city');
    cityField.value = "";

    var postalCodeField = document.getElementById('postal-code');
    postalCodeField.value = "";
};
