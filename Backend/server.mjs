import express from "express";
const PORT = 3000;
const app = express();
const urlprefix = "/api";

app.use(express.json());

app.get(urlprefix+"/", (req, res)=>{
    res.send("I am finally figuring this out, no more crying")
})

app.get(urlprefix+"/orders", (req, res)=> {
    const orders = [
        {
            id: "1",
            name: "orange"
        },
        {
            id: "2",
            name: "apple"
        },
        {
            id: "3",
            name: "Mango"
        }
    ]
    res.json(
        {
            message: "Fruits",
            orders: orders
        }
    )
})

app.listen(PORT);