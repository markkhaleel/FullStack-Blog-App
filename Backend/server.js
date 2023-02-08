const express = require('express');
const app = express();
require("dotenv").config();
const PORT = process.env.PORT
const connectDB = require('./config/dbConn');
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const cloudConnect = require('./config/cloudinary')

connectDB();
cloudConnect();

app.use(cors())

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser())

app.use('/', require('./routes/root'));
app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
app.use('/verifyOTP', require('./routes/verifyOTP'));
app.use('/upload-pp', require('./routes/upload-pp'));
app.use('/posts', require('./routes/posts'));
app.use('/comment', require('./routes/comments'));

app.use(verifyJWT)


app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})



