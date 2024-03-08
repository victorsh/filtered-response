import 'dotenv/config'
import app from './app'

const PORT = process.env.PORT

app.listen(PORT, async () => {
  console.log(`Listening on port=${PORT}`)
})