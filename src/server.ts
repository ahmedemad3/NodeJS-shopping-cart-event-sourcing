import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { config } from 'dotenv';
import cartRouter from './router/cartRouter';

const app = express();
const port = process.env.PORT || 3000;

config();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/api/v1/cart', cartRouter);

app.get('/', (req, res) => {
  res.send('Welcome to the Shopping cart API!');
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
