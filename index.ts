import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

const app = express()
app.use(cors())
app.use(bodyParser.json())

app.use("*", (req, res)=> { 
res.status(404).json({message: 'Not found!'})
})

app.listen(4000, () => { 
console.log('listening on port 4000!')
})


