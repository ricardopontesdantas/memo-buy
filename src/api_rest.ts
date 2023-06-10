import express, { Request, Response } from "express";
const app = express();
app.use(express.json())
const memories: Memory[] = [];
app.post("/memories", async function(request: Request, response: Response) {
    try {
        if (request.body.description === "") throw new Error("Invalid description");
        return response.status(201).end();
    } catch(e: any) {
        return response.status(422).json({
            message: e.message
        });
    }
});

type Memory = {
    memoryId: string,
    description: string,
    done: boolean
}

app.listen(3000);