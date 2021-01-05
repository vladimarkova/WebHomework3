const userRegister = event => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const name = document.getElementById('name').value;
    const familyName = document.getElementById('family-name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const street = document.getElementById('street').value;
    const city = document.getElementById('city').value;
    const postalCode = document.getElementById('postal-code').value;
    
    const user = {
        username,
        name,
        familyName,
        email,
        password,
        street,
        city,
        postalCode
    };

    const settings = {
        method: 'POST',
        headers: {
            'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        body: `data=${JSON.stringify(user)}`
    };

    var url = 'https://jsonplaceholder.typicode.com/users';
    // var testUrl = 'test.php/userTestFrontEnd';

    ajax(url, settings, false);
};

(function() {
    const userRegisterBtn = document.getElementById('register-btn');

    userRegisterBtn.addEventListener('click', userRegister);
})();