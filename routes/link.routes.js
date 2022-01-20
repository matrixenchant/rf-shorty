const {Router} = require('express')
const config = require('config')
const shortid = require('shortid')
const Link = require('../models/link')
const protect = require('../middleware/auth.middleware')
const router = Router()

router.post('/generate', protect, async (req, res) => {
    try {
        const baseUrl = config.get('baseUrl')
        let { from, name } = req.body

        if (!name) name = 'Сокращенная ссылка'

        const code = shortid.generate()
        const to = baseUrl + '/t/' + code

        const link = new Link({
            code, to, from, owner: req.user.userId, name
        })

        await link.save()

        res.status(201).json({ link })
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так...', error: e.message})
    }
})

router.get('/', protect, async (req, res) => {
    try {
        const links = await Link.find({ owner: req.user.userId })
        res.json(links)
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так...', error: e.message})
    }
})

router.get('/:id', protect, async (req, res) => {
    try {
        const links = await Link.findById(req.params.id)
        res.json(links)
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так...', error: e.message})
    }
})

module.exports = router