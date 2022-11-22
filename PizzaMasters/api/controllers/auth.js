const router = require('express').Router();
const { registerUser, loginUser } = require('../services/authService.js');
const mapErrors = require('../utils/mapErrors');

router.post('/register', async (req, res) => {
    try {
        if (req.body.password.trim().length < 5) {
            throw new Error('Password should be at least 5 characters long!');
        }

        if (req.body.password.trim() != req.body.rePassword.trim()) {
            throw new Error('The repeat password should be equal to the password!');
        }

        const user = await registerUser(req.body.username, req.body.email, req.body.password);

        res.json(user);

    } catch (err) {
        const errors = mapErrors(err);
        res.status(409)
            .send(errors);
    }
});

router.post('/login', async (req, res) => {
    try {
        const user = await loginUser(req.body.email, req.body.password);

        res.json(user);
    } catch (err) {
        const errors = mapErrors(err);
        res.status(409)
            .send(errors);
    }
})


router.get('/profile', async (req, res) => {
    try {
        const user = await getUserById(req.body._id);
        res.json(user);

    } catch (err) {
        const errors = mapErrors(err);
        res.status(409)
            .send(errors);
    }
});



// const data = {
//     username: req.body.username,
//     email: req.body.email,
//     password: req.body.password,
//     rePassword: req.body.rePassword
// }

// const User = require();

module.exports = router;