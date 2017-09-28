$("#button_signup").click(function() {
    $(".messageToUser").empty();

    const name     = $("#userName_signup").val();
    const email    = $("#userEmail_signup").val();
    // const password = $("#userPassword_signup").val();

    let status, validationPassed = true;

    status = checkName(name);

    if (status !== "success") {
        validationPassed = false;
        $(".messageToUser").append(`<p>${status}</p>`);
    }

    status = checkEmail(email);

    if (status !== "success") {
        validationPassed = false;
        $(".messageToUser").append(`<p>${status}</p>`);
    }

    // status = checkPassword(password);

    // if (status !== "success") {
    //     validationPassed = false;
    //     $(".messageToUser").append(`<p>${status}</p>`);
    // }

    if (validationPassed) {
        auth.createUserWithEmailAndPassword(email, password)
            .then(function(user) {
                database_users.child(user.uid).set({
                    "name"    : name,
                    "email"   : email
                });

                $(".messageToUser").text(`${name}, thanks for signing up!`);

                setTimeout(function() {
                        window.location.replace("go_local.html");

                }, 2000);
            })
            .catch(
                e => console.log(e.message)
            );
    }
});



/****************************************************************************
 ****************************************************************************
    
    Input validations
    
*****************************************************************************
*****************************************************************************/
let regex;

// Name consists of all letters and possibly a space
function checkName(name) {
    if (!name) {
        return "Please enter your name.";
    
    } else {
        regex = /^[a-z]+$/i;

        const names    = name.split(" ");
        const numNames = names.length;

        if (numNames <= 2 && !names[0].match(regex)) {
            return "Please enter only letters for your first name.";

        } else if (numNames === 2 && !names[1].match(regex)) {
            return "Please enter only letters for your last name.";

        } else if (numNames > 2) {
            return "Please enter only your first and last names.";

        }
    }

    return "success";
}

// Email must have format of ***@***.com (*** cannot be empty)
function checkEmail(email) {
    if (!email) {
        return "Please enter your email.";
    
    } else {
        regex = /^[a-z0-9._]+@[a-z]+.(com|net|edu)$/i;
        
        if (!email.match(regex)) {
            return "Please enter a valid email address (.com, .net, or .edu).";
        }
    }

    return "success";
}

// Password must have 8-64 characters and include 1 letter, 1 number, and 1 special character
function checkPassword(password) {
    if (!password) {
        return "Please enter your password.";
        
    } else {
        if (password.length < 8 || password.length > 64) {
            return "Password length must be between 8 and 64.";
        }

        regex = /[a-z]+/i;

        if (!password.match(regex)) {
            return "Password must contain at least 1 letter.";
        }

        regex = /[0-9]+/;

        if (!password.match(regex)) {
            return "Password must contain at least 1 number.";
        }

        regex = /[!@#$%^&*()<>{}\[\]-_+=|\\;:'",./?]+/;

        if (!password.match(regex)) {
            return "Password must contain at least 1 special character.";
        }
    }

    return "success";
}
