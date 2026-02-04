# Book API

Simple REST API using Node.js, Express and Mongoose for managing books (CRUD), with a small frontend served from the `public` folder.

Summary: create, read, update and delete book records; includes a minimal web UI for basic interactions.

Requirements:
- Node.js (v16+)
- MongoDB (local or cloud URI)

Environment variables (create a `.env` file):
- `MONGODB_URI` — MongoDB connection string
- `PORT` — server port (default: 5000)

Install and run:

1. Install dependencies:

```
npm install
```

2. Start the server:

```
node server.js
```

Development (optional):

```
npm install -D nodemon
# run: npx nodemon server.js
```

Project structure (key files):
- `server.js` — application entry point
- `package.json` — dependencies and scripts
- `config/db.js` — MongoDB connection setup
- `models/` — Mongoose models (`Book.js`, `Review.js`, `User.js`)
- `controllers/` — request handlers
- `routes/` — API routes (`books.js`, `reviews.js`, `auth.js`)
- `middlewares/` — middleware (auth, error handling)
- `public/` — simple frontend (HTML + JS)

API Endpoints:

- POST   /api/books        — create a new book
- GET    /api/books        — get all books
- GET    /api/books/:id    — get a single book by ID
- PUT    /api/books/:id    — update a book by ID
- DELETE /api/books/:id    — delete a book by ID

There are also routes for reviews and authentication in `routes/reviews.js` and `routes/auth.js`.

Usage examples: use Postman or `curl` to call the endpoints above. After starting the server, open the frontend at `http://localhost:<PORT>/`.
<img width="1919" height="1023" alt="{1756CA0B-4995-48BC-8611-80F171855E52}" src="https://github.com/user-attachments/assets/d42a1766-7043-4564-a9a4-f6456eda7667" />
<img width="1920" height="1028" alt="{9179689B-30D6-4E21-8FE3-987DB8431948}" src="https://github.com/user-attachments/assets/dd56efdc-ab8c-4bc7-b0fa-afbfcba79f6f" />
<img width="880" height="731" alt="изображение" src="https://github.com/user-attachments/assets/39bf65e6-1262-4b33-8ecb-21fbe48823b8" />



Next steps I can do for you:
- add `start` and `dev` scripts to `package.json`
- expand the README with authentication examples and sample requests


