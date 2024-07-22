import express from "express";

const app = express();
const port = 3000;

let posts = [];

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index", {posts});
});

app.get("/new-post", (req, res) => {
  res.render("new-post");
});

app.post("/new-post", (req, res) => {
  const {title, content} = req.body;
  posts.push({id: posts.length + 1, title, content, submittedOn: new Date()});
  res.redirect("/");
});

app.get("/edit-post/:id", (req, res) => {
  const post = posts.find(p => p.id == req.params.id);
  res.render("edit-post", {post});
});

app.post("/edit-post/:id", (req, res) => {
  const {title, content} = req.body;
  const post = posts.find(p => p.id == req.params.id);
  post.title = title;
  post.content = content;
  res.redirect("/");
});

app.post("/delete-post/:id", (req, res) => {
  posts = posts.filter(p => p.id != req.params.id);
  res.redirect('/');
});



app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});