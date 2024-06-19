const connect = require('./src/configs/db');
const app = require('./src/index');
require("dotenv").config();
const PORT = process.env.PORT || 5000;


app.listen(PORT, async () => {
    try {
        await connect();
        console.log(`Server is running on ${PORT}`);
        console.log("connected to MongoDB");

    } catch (error) {
        console.log(error.message);
    }
});

