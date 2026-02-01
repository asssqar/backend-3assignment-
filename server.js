const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')

const connectDB = require('./config/db')
const bookRoutes = require('./routes/books')
const authRoutes = require('./routes/auth')
const reviewRoutes = require('./routes/reviews')
const errorHandler = require('./middlewares/errorHandler')

dotenv.config()

const app = express()

// парсим json из запросов
app.use(express.json())

// разрешаем запросы с фронта
app.use(cors())

// подключаем базу
connectDB()

// тут делается отдача файлов из папки public
app.use(express.static('public'))

// api для книг
app.use('/api/books', bookRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/reviews', reviewRoutes)

// корневой маршрут для фронта
app.get('/', (req, res) => {
  // отдаём index.html из папки public
  res.sendFile(__dirname + '/public/index.html')
})

// обработка ошибок
app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
})
