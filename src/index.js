import 'dotenv/config';
import express from 'express';
const app = express()

const PORT = process.env.PORT || 4000

app.listen(PORT, () => console.log(`Server is running at port ${PORT}`))

app.get("/", (req, res) => {
  res.json({ status: 'sucess', message: 'API is running' })
})