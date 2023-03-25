
import express from 'express';
import { authModule, resourceModule } from './routes/index.js'
import morgan from "morgan"

const app = express();
const PORT = 8087

app.use(morgan('dev'))

app.get("/", (req, res) => {
    res.send("hello");
});

app.use("/auth", authModule)
app.use("/resources", resourceModule)


app.use((err, req, res, next) => {
    console.log(err)
    // these fields are only ever defined if it's an error we're intentionally throwing
    // an error from a geniune server error would automatically give the user a 500 error
    const { status, message } = err;

    res.status(status ? status : 500)
    return res.send({
        status: status ? status : 500,
        message: message ? message : "internal server error, see logs"
    })
})

app.listen(PORT, () => {
    console.log(`backend online at http://localhost:${PORT}`)
})
