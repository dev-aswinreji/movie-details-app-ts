import express  from 'express';
import route from './route/route';
const app = express()

const port = 3000;

app.use(express.json())

app.use('/api',route)

app.listen(port, ()=>{
  console.log(`Server running at http://localhost:${port}`);
})
