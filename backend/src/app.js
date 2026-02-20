//Create server
const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.routes');
const foodRouter = require('./routes/food.routes');
const foodPartnerRouter = require('./routes/food-partner.routes');
const cors = require('cors');

const app = express();
app.use(cors({
    origin: "https://watch2eat-frontend.onrender.com",
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());

app.get("/",(req,res) =>{
    res.send("Hello world");
})

app.use('/api/auth', authRoutes);
app.use('/api/food', foodRouter);
app.use('/api/food-partner', foodPartnerRouter);

module.exports = app;
