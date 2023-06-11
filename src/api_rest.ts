import express, { Request, Response } from "express";
const app = express();
app.use(express.json())
const memories: Memory[] = [];

app.post("/memories", async function(request: Request, response: Response) {
    try {
        if (request.body.description === "") throw new Error("Invalid description");
        const memory = {
            memoryId: request.body.memoryId,
            description: request.body.description,
            done: false
        };
        memories.push(memory);
        return response.status(201).end();
    } catch(e: any) {
        return response.status(422).json({
            message: e.message
        });
    }
});

app.patch("/memories/:memoryId/done", async function(request: Request, response: Response) {
    const memory = memories.find(memory => memory.memoryId === request.params.memoryId);
    if (memory) memory.done = request.body.done;
    return response.status(200).json(memory);
});

type Memory = {
    memoryId: string,
    description: string,
    done: boolean
}

app.listen(3000);