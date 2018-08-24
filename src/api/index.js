import { Router } from 'express'

const router = new Router()

router.route('/').get((req, res) => {
   res.json({ message: 'Welcome to API!' })
})

export default router
