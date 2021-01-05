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
    var familyName = document.getElementById('family-name').value;
    var emailV = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var street = document.getElementById('street').value;
    var city = document.getElementById('city').value;
    var postalCode = document.getElementById('postal-code').value;

    var allCorrect = true;
    if (username) {
        if (username.length < 3 || username.length > 10) {
            const error = document.getElementById('error');
            error.innerHTML += 'Невалидно потребителско име (трябва да е между три и десет символа)';      
            allCorrect = false;
        }
    } else {
        const error = document.getElementById('error');
        error.innerHTML += ' Невалидно потребителско име Потребителското име е задължително поле!';
        allCorrect = false;
    }

    if (name) {
        if (name.length > 50) {
            const error = document.getElementById('error');
            error.innerHTML += ' Невалидно име (трябва да е под петдесет символа)';
            allCorrect = false;
        }
    } else {
        const error = document.getElementById('error');
        error.innerHTML += ' Невалидно име Името е задължително поле!';
        allCorrect = false;
    }

    if (familyName) {
        if (familyName.length > 50) {
            const error = document.getElementById('error');
            error.innerHTML += ' Невалидно фамилно име (трябва да е под петдесет символа)';
            allCorrect = false;
        }
    } else {
        const error = document.getElementById('error');
        error.innerHTML += ' Невалидно фамилно име Фамилия е задължително поле!';
        allCorrect = false;
    }

    if (emailV) { 
        var emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;    
        if (!emailV.match(emailPattern)) {
            console.log('DO NOT MATCH!');
            const error = document.getElementById('error');
            error.innerHTML += ' Невалиден e-mail Email изглежда така: myemail@something.some!';
            allCorrect = false; 
        } 
    } else {
        const error = document.getElementById('error');
        error.innerHTML += ' Невалиден e-mail Email е задължително поле!';
        allCorrect = false;
    }

    if (password) {
        if (password.length < 6 || password.length > 10) {
            const error = document.getElementById('error');
            error.innerHTML += ' Невалидна парола (трябва да е между шест и десет символа)';
            allCorrect = false;
        } else {
            var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,10}$/;
            if (!password.match(passw)) {
                const error = document.getElementById('error');
                error.innerHTML += ' Невалидна парола (трябва да съдържа поне една малка, една главна букви и поне една цифра)';
                allCorrect = false;
            }
        }
    } else {
        const error = document.getElementById('error');
        error.innerHTML += ' Невалидна парола паролата е задължително поле!';
        allCorrect = false;
    }

    if (postalCode) {
        var postalC = /(^[0-9]{5})\-([0-9]{4})/;
        if (!postalCode.match(postalC)) {
            const error = document.getElementById('error');
            error.innerHTML += ' Невалиден пощенски код пощенскит код изглежда така: 11111-1111!';
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
            

            var s = document.createElement('div');
            var text = document.createTextNode('Текст тук');
            s.appemd(text);
            s.setAttribute('id', 'successTab');
        }
    } 

    var usernameField = document.getElementById('username');
    usernameField.value = "";

    var nameField = document.getElementById('name');
    nameField.value = "";

    var familyNameField = document.getElementById('family-name');
    familyNameField.value = "";

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
