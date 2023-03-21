
import express from 'express';

const app = express();
const PORT = 8087

app.get("/", (req, res) => {
    res.send("hello");
});

app.listen(PORT, () => {
    console.log(`backend online at http://localhost:${PORT}`)
})
