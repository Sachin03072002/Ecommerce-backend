const app = require('./index');
const { connectDB } = require('./config/db');
const PORT = 5454;
app.listen(PORT, async () => {
    await connectDB();
    console.log("Listening on PORT: ", PORT);
})