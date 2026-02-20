//Create server
const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.routes');
const foodRouter = require('./routes/food.routes');
const foodPartnerRouter = require('./routes/food-partner.routes');
const cors = require('cors');

const app = express();

const allowedOrigins = [
    "http://localhost:5173",
    "https://watch2eat-frontend.onrender.com"
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
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
