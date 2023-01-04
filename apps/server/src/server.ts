import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'

dotenv.config()

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(morgan('dev'))

app.get('/ping', (req, res) => {
	res.send('pong')
})

app.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}`)
})
