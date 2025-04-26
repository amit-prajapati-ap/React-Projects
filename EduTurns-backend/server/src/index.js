import 'dotenv/config'
import app from './app.js'

app.listen(process.env.PORT || 5000, () => {
    console.log("Server is running port number: ", process.env.PORT)
})