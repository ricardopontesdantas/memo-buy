import express, { Request, Response } from "express";
import CreateMemory from "./CreateMemory";
import MemoryRepositoryDatabase from "./MemoryRepositoryDatabase";
import UpdateDoneMemory from "./UpdateDoneMemory";
const app = express();
app.use(express.json())

app.post("/memories", async function(request: Request, response: Response) {
    const createMemory = new CreateMemory();
    try {
        const output = await createMemory.execute(request.body);
        return response.status(201).json(output);
    } catch (e: any) {
        return response.status(422).json({
            message: e.message
        });
    }
});

app.patch("/memories/:idMemory/done", async function(request: Request, response: Response) {
    const updateDoneMemory = new UpdateDoneMemory();
    try {
        const updatedMemory = await updateDoneMemory.execute(request.params.idMemory, request.body.done);
        return response.status(200).json({
            idMemory: updatedMemory.idMemory,
            done: updatedMemory.done
        });
    } catch (e: any) {
        return response.status(422).json({
            message: e.message
        });
    }
});

app.listen(3000);