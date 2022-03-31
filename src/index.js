import axios from 'axios';
import 'dotenv/config';
import express from 'express';

const app = express()

const PORT = process.env.PORT || 4000

app.listen(PORT, () => console.log(`Server is running at port ${PORT}`))


app.get('/cat-facts', async (req, res) => {

  // timer performance
  const start = Date.now()
  const { data: catFacts } = await axios.get('https://cat-fact.herokuapp.com/facts')
  const end = Date.now()
  const time = end - start
  console.log(`Time taken to fetch cat facts: ${time}ms`)
  res.status(200).json({ status: 'success', data: { facts: catFacts } })
})

app.get("/", (req, res) => {
  res.json({ status: 'sucess', message: 'API is running' })
})