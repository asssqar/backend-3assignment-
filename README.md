# Book API

## Simple Node.js + Express + Mongoose application implementing full CRUD for books with a basic frontend.

### Project Structure
book-api/

│

├── server.js

├── package.json

├── .env

├── .gitignore

│

├── config/

│   └── db.js

│

├── models/

│   └── Book.js

│

├── routes/

│   └── books.js

│

├── controllers/

│   └── bookController.js

│

├── middlewares/

│   └── errorHandler.js

│

├── public/

│   ├── index.html

│   └── script.js

│

└── README.md


### Open the frontend in your browser:

http://localhost:5000/

## API Endpoints

POST	/api/books	Create a new book

GET	/api/books	Get all books

GET	/api/books/:id	Get a single book by ID

PUT	/api/books/:id	Update a book by ID

DELETE	/api/books/:id	Delete a book by ID

## API Examples (Postman)
 Create a Book (POST)

<img src="photo_2026-01-18_22-28-57.jpg">

 Get All Books (GET)

<img src="photo_2026-01-18_22-28-53.jpg">

 Get Book by ID (GET)

<img src="photo_2026-01-18_22-28-50.jpg">

 Update Book (PUT)

<img src="photo_2026-01-18_22-28-50.jpg">

 Delete Book (DELETE)

<img src="photo_2026-01-18_22-28-43.jpg">

 WEB-page

<img src="photo_2026-01-18_22-28-46.jpg">

