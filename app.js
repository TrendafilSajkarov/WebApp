const path = require('path');

const express = require('express');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

const adminRoutes = require("./routes/adminRoutes");

app.use('/app/admin', adminRoutes);


app.get("/", (req, res, next) => {
  res.redirect("/app/index");
});
  
app.use("/", (req, res, next) => {
  res.send("Page Not Found!");
});


mongoose
  .connect("mongodb+srv://trendafil2:databaza0@project0-gz2vh.mongodb.net/test?retryWrites=true", 
    { useNewUrlParser: true })
  .then(result => {
    app.listen(3000, (req, res) => {
      console.log("Connected to database and Server started");
    });
  })
  .catch(err => {
    console.log(err);
  });