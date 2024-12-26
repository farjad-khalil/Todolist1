const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname +"/date.js");


var items = ["Buy Milk", "Cook Food", "Coding"];
var work = [];
const app = express();



app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"));


app.get("/", function (req, res) {
    var day = date.getDay();
    res.render("list", { listTitle: day, newListItem: items });
})
app.post("/", function (req, res) {
    var item = req.body.newItem
    if (req.body.list === "Work-List") {
        work.push(item);
        res.redirect("/work");
    } else {

        items.push(item);
        res.redirect("/");
    }
})




app.get("/work", function (req, res) {

    res.render("list", { listTitle: "Work-List", newListItem: work })
})
app.post("/work", function (req, res) {
    work.push(req.body.newItem);
    res.redirect("/work")
})




app.get("/about", function (req, res) {
    res.render("about")
})



app.listen(3000, function () {
    console.log("Server is running on port 3000.");
})