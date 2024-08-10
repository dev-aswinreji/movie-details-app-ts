import express from 'express'

import { homeGet, signupPost } from "../controller/homeGet";

const route = express.Router()

route.get('/',homeGet)
route.post('/signup',signupPost)

export default route


