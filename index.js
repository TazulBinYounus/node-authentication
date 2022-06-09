const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const connectDb = require('./db.js')
const cors = require('cors')
const userRoutes = require('./routes/userRoutes.js')
const authRoutes = require('./routes/authRoutes.js')

const app = express();
dotenv.config();
connectDb();

app.use(express.json());

app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(morgan('dev'));
app.use(cors());

app.use('/api/users', userRoutes);

app.use('/api', authRoutes);


app.get('/', (req, res) => {
  res.json({ message: 'Hello World' });
});

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server is Running on Port ${PORT}`));