const express = require('express');
const router = express.Router();





router.get('/login', (req, res) => {
    res.render('users/login');
});

router.get('/register', (req, res) => {
    res.render('users/register');
});


router.post('/register', (req, res) => {
    let errors = [];

    if(req.body.password.length < 4) {
        errors.push({text: "Password must be at least 4 characters!"});
    }
    
    if(req.body.password != req.body.password2) {
        errors.push({text: "Passwords not matching!"});
    }
    
    if(errors.length > 0) {   
        res.render('users/register', {
            errors: errors,
            name: req.body.name,
            email: req.body.email,
        });
    } else {
        res.send("passed"); 
    }
});

module.exports = router;