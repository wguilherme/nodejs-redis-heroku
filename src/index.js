import axios from 'axios';
import 'dotenv/config';
import express from 'express';
// import { setRedis } from './redis';
import { getRedis, setRedis } from './redis/index.js';


const app = express()

const PORT = process.env.PORT || 4000

app.listen(PORT, () => console.log(`Server is running at port ${PORT}`))


app.get('/cat-facts', async (req, res) => {
  // check cache before init
  const start = Date.now()
  const cachedCatFacts = await getRedis('cat-facts')

  if (cachedCatFacts) {
    return res.status(200).json({ status: 'success', message: "cached", data: { facts: cachedCatFacts } })
  } else {
    cachedCatFacts = await getRedis('cat-facts')
  }

  // timer performance  
  const { data: catFacts } = await axios.get('https://cat-fact.herokuapp.com/facts')
  await setRedis('cat-facts', JSON.stringify(catFacts))

  const end = Date.now()
  const time = end - start

  // console.log('debug time', time)

  res.status(200).json({ status: 'success', data: { facts: catFacts } })
})

app.get("/", (req, res) => {
  res.json({ status: 'success', message: 'API is running' })
})