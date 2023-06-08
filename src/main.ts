import express, { Request, Response } from "express";
const app = express();
app.use(express.json())
app.post("/memories", async function(request: Request, response: Response) {
    if (request.body.description === "") {
        return response.json({
            message: "Invalid description"
        })
    } else {
        return response.status(201).end();
    }
});
app.listen(3000);