# Book Review App

A full-stack Book Review web application where users can add, edit, delete, and manage book reviews with ratings and book covers.

The application uses:
- Node.js
- Express.js
- PostgreSQL
- EJS
- CSS
- Open Library Covers API

---

# Features

- 📚 Add books and reviews
- ✏️ Edit existing reviews
- ❌ Delete books
- ⭐ Rate books
- 🖼️ Display automatic book covers using ISBN
- 🕒 Sort books by recency
- 🔥 Sort books by rating
- 💾 Store all data in PostgreSQL
- 🎨 Modern responsive UI

---

# Tech Stack

## Frontend
- HTML
- CSS
- EJS

## Backend
- Node.js
- Express.js

## Database
- PostgreSQL

## External API
- Open Library Covers API

---

# Project Structure

```text
project/
│
├── public/
│   └── styles/
│       └── main.css
│
├── views/
│   ├── partials/
│   │   ├── header.ejs
│   │   └── footer.ejs
│   │
│   ├── index.ejs
│   ├── add.ejs
│   └── edit.ejs
│
├── index.js
├── package.json
└── README.md
```

---

# Installation

## Step 1: Clone the Repository

```bash
git clone <repository-link>
```

---

## Step 2: Install All Required Modules

Run the following command:

```bash
npm install
```

This installs:
- express
- body-parser
- pg
- ejs
- axios

---

# PostgreSQL Setup

## Step 1: Open PostgreSQL / pgAdmin

Create a new database:

```sql
CREATE DATABASE book_review_db;
```

---

## Step 2: Connect to Database

```sql
\c book_review_db
```

---

## Step 3: Create Books Table

```sql
CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    author VARCHAR(255),
    isbn VARCHAR(20),
    rating INTEGER,
    review TEXT,
    date_read DATE
);
```

---

# Configure Database Connection

Inside `index.js`, update PostgreSQL credentials:

```javascript
const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "book_review_db",
    password: "your_password",
    port: 5432,
});
```

---

# Running the Application

Start the server using:

```bash
npm start
```

or

```bash
node index.js
```

---

# Open in Browser

Visit:

```text
http://localhost:3000
```

---

# CRUD Operations

## Add Book
Users can:
- Add title
- Author
- ISBN
- Rating
- Review
- Date Read

---

## Edit Book
Users can:
- Update ratings
- Modify reviews
- Change book details

---

## Delete Book
Users can remove books permanently from the database.

---

# Sorting Functionality

## Sort by Rating

Books are displayed in descending order of ratings.

```sql
SELECT * FROM books ORDER BY rating DESC;
```

---

## Sort by Recency

Books are displayed based on latest read date.

```sql
SELECT * FROM books ORDER BY date_read DESC;
```

---

# Book Covers

Book covers are fetched dynamically using the Open Library Covers API.

Example:

```text
https://covers.openlibrary.org/b/isbn/9780439139601-M.jpg
```

Fallback image handling is also implemented for missing covers.

---

# Dependencies

Installed using:

```bash
npm install
```

Main dependencies:
- express
- body-parser
- pg
- ejs
- axios

---

# Future Enhancements

- 🔐 User Authentication
- 🌙 Dark Mode
- 🔎 Search Functionality
- 📄 Pagination
- 🤖 AI-generated Book Summaries
- ❤️ Favorites System
- 📱 Mobile Responsive Improvements

---

# Author

Developed by Nivedita Rane.
