const { Router } = require('express')
const router = Router()

const config = require('config')
const bcrypt = require('bcryptjs')
const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')

const User = require('../models/user')

/*
    Route for registration:
    [/api/auth/register]
*/
router.post(
    '/register',
    [
        check('email', 'Неправильный email').isEmail(),
        check('password', 'Пароль должен содержать минимум 6 символов')
            .isLength({ min: 6 }),
    ],
    async (req, res) => {
        
    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            let messages = []
            errors.array().map( err => messages.push(err.msg) )

            return res.status(400)
            .json({
                message: messages
            })
        }

        const { email, password } = req.body

        const candidate = await User.findOne({ email: email })

        if (candidate) return res.status(400).json({message: 'Такой пользователь уже существует'})

        const hashedPassword = await bcrypt.hash(password, 12)
        const user = new User({ email, password: hashedPassword })

        await user.save()

        res.status(201).json({message: 'Вы успешно зарегистрированы'})
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так...', error: e})
    }
})

/*
    Route for login:
    [/api/auth/login]
*/
router.post(
    '/login',
    [
        check('email', 'Неправильный email').normalizeEmail().isEmail(),
        check('password', 'Введите пароль').exists(),
    ],
    async (req, res) => {
        
    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            let messages = []
            errors.array().map( err => messages.push(err.msg) )

            return res.status(400)
            .json({
                message: messages
            })
        }

        const { email, password } = req.body

        const user = await User.findOne({ email })
        if (!user) return res.status(400).json({message: 'Такого пользователя не существует'})

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return res.status(400).json({message: 'Неверный пароль'})

        const token = jwt.sign(
            { userId: user.id },
            config.get('jwtSecret'),
            { expiresIn: '3h' }
        )

        res.json({ message: 'Вы успешно вошли', token })
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так...', error: e.message})
    }
})

/*
    Route for verify token:
    [/api/auth/verify]

router.get(
    '/verify',
    async (req, res) => {
    let token = req.query.token
    if (token) {
        try {
            var decoded = jwt.verify(token, config.get('jwtSecret'));
            console.log('Good token')
            res.status(200).json({ verify: true })
        } catch(err) {
            console.log('Wrong token')
            res.status(403).json({ verify: false })
        }
    }
})
*/

router.get(
    '/test',
    async (req, res) => {
        res.send({ express: 'Hello From Express' })
    }
)

module.exports = router