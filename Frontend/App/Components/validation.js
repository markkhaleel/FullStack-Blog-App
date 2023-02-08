const ValidateEmail = (emailInput) => {
    var emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (emailInput.match(emailRegex)) {
        return true;
    } else { return false; }

}
const ValidateFullname = (fullnameInput) => {
    var fullnameRegex = /^[a-zA-Z]{3,}( {1,2}[a-zA-Z]{3,}){0,}$/;
    if (fullnameInput.match(fullnameRegex)) {
        return true;
    } else { return false; }

}
const validateUsername = (usernameInput) => {
    //the input login name should only contains alphanumeric characters
    var usernameRegex = /^[A-Za-z][A-Za-z0-9_]{4,14}$/
    if (usernameInput.match(usernameRegex)) {
        return true;
    } else { return false; }
}
const validatePassword = (passwordInput) => {
    /*To check a password between 8 to 15 characters which contain at least 
     one lowercase letter, one uppercase letter, one numeric digit, and one special character*/
    var pwdRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,20}$/;
    if (passwordInput.match(pwdRegex)) {
        return true;
    }
    else {
        return false;
    }
}







export { validateUsername, ValidateEmail, validatePassword, ValidateFullname }