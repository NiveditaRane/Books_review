import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "book_review_db",
    password: "Yit@4565",
    port: 5432,
});

db.connect();

app.get("/", async (req, res) => {

    try {

        const sort = req.query.sort;

        let result;

        if (sort === "rating") {

            result = await db.query(
                "SELECT * FROM books ORDER BY rating DESC"
            );

        } else if (sort === "recent") {

            result = await db.query(
                "SELECT * FROM books ORDER BY date_read DESC"
            );

        } else {

            result = await db.query(
                "SELECT * FROM books"
            );
        }

        res.render("index.ejs", {
            books: result.rows
        });

    } catch (err) {

        console.log(err);
        res.send("Error fetching books");

    }
});

app.post("/add", async (req, res) => {

    const {
        title,
        author,
        isbn,
        rating,
        review,
        date_read
    } = req.body;

    try {

        await db.query(
            `INSERT INTO books
            (title, author, isbn, rating, review, date_read)
            VALUES ($1,$2,$3,$4,$5,$6)`,

            [title, author, isbn, rating, review, date_read]
        );

        res.redirect("/");

    } catch (err) {

        console.log(err);
        res.send("Error adding book");

    }
});

app.post("/delete/:id", async (req, res) => {

    try {

        await db.query(
            "DELETE FROM books WHERE id = $1",
            [req.params.id]
        );

        res.redirect("/");

    } catch (err) {

        console.log(err);
        res.send("Error deleting book");

    }
});

app.post("/edit/:id", async (req, res) => {

    const { rating, review } = req.body;

    try {

        await db.query(
            `UPDATE books
             SET rating = $1,
                 review = $2
             WHERE id = $3`,

            [rating, review, req.params.id]
        );

        res.redirect("/");

    } catch (err) {

        console.log(err);
        res.send("Error updating book");

    }
});

// SHOW ADD PAGE
app.get("/add", (req, res) => {
    res.render("add.ejs");
});


// SHOW EDIT PAGE
app.get("/edit/:id", async (req, res) => {

    try {

        const result = await db.query(
            "SELECT * FROM books WHERE id = $1",
            [req.params.id]
        );

        res.render("edit.ejs", {
            book: result.rows[0]
        });

    } catch (err) {

        console.log(err);
        res.send("Error loading edit page");

    }
});


// UPDATE BOOK
app.post("/update/:id", async (req, res) => {

    const {
        title,
        author,
        isbn,
        rating,
        review,
        date_read
    } = req.body;

    try {

        await db.query(
            `UPDATE books
             SET title = $1,
                 author = $2,
                 isbn = $3,
                 rating = $4,
                 review = $5,
                 date_read = $6
             WHERE id = $7`,

            [
                title,
                author,
                isbn,
                rating,
                review,
                date_read,
                req.params.id
            ]
        );

        res.redirect("/");

    } catch (err) {

        console.log(err);
        res.send("Error updating book");

    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});