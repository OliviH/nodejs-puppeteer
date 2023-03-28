import express from 'express'
import cors from 'cors'
import { randomUUID, randomBytes } from 'crypto'
import { sign } from './functions.mjs'

const app = express()
app.use(cors())

app.get('/', (req,res) => {
    res.status(200).json({
        _id: randomUUID(),
        message: 'welcome',
        date: new Date().toISOString(),
    })
})

const PORT = process.env.PORT || 3000

sign({date: new Date().toISOString(), iat: Math.floor(Date.now() / 1000) + 30})
    .then(token => console.log('test', {token}))
    .catch(error => console.error(error))

app.listen(PORT, () => {
    console.log(`App listen at PORT: ${PORT}`)
})