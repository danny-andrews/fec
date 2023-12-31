import express from "express";
import postgres from "postgres";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

const PORT = process.env.PORT;
const sql = postgres(process.env.DATABASE_URL);
const app = express();

app.use(express.json());

app.get("/api/tasks", (req, res) => {
  sql`SELECT * FROM tasks`.then((rows) => {
    res.send(rows);
  });
});

app.get("/api/tasks/:id", (req, res) => {
  const id = req.params.id;

  sql`SELECT * FROM tasks WHERE id = ${id}`.then((rows) => {
    res.send(rows[0]);
  });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
