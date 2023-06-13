import express, { Request, Response } from "express";
import CreateMemory from "./CreateMemory";
const app = express();
app.use(express.json())
const memories: Memory[] = [];

app.post("/memories", async function(request: Request, response: Response) {
    const createMemory = new CreateMemory();
    try {
        const output = await createMemory.execute(request.body);
        memories.push(output);
        return response.status(201).json(output);
    } catch (e: any) {
        return response.status(422).json({
            message: e.message
        });
    }
});

app.patch("/memories/:idMemory/done", async function(request: Request, response: Response) {
    const memory = memories.find(memory => memory.idMemory === request.params.idMemory);
    if (memory) memory.done = request.body.done;
    return response.status(200).json(memory);
});

type Memory = {
    idMemory: string,
    description: string,
    done: boolean
}

app.listen(3000);