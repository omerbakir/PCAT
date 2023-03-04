const express = require("express")
const mongoose = require("mongoose")
const path = require("path")
const ejs = require("ejs")
const Photo = require("./models/Photo")


const app = express()
const port = 3000

//connet DB

mongoose.connect("mongodb://localhost/pcat-test-db")

//TEMPLATE ENGINE
app.set("view engine", "ejs")

//MIDDİLEWARES
app.use(express.static('public'))
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())

//ROUTES
app.get("/", async (req, res) => {
    const photos = await Photo.find({})
    res.render("index", {
        photos
    })
})
app.get("/photos/:id", async (req, res) => {
    // console.log(req.params.id)
    // res.render("about")
    const photo = await Photo.findById(req.params.id)
    res.render("photo", {
        photo
    })
})
app.get("/about", (req, res) => {
    res.render("about")
})
app.get("/add", (req, res) => {
    res.render("add")
})
app.post("/photos", async (req, res) => {
    await Photo.create(req.body)
    res.redirect("/")
})

app.listen(port, () => {
    console.log(`Sunucu ${port} portunda başlatıldı...`)
})