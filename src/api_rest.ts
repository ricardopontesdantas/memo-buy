import express, { Request, Response } from "express";
import CreateMemory from "./CreateMemory";
import UpdateDoneMemory from "./UpdateDoneMemory";
import GetUndoneMemories from "./GetUndoneMemories";
const app = express();
app.use(express.json())

app.post("/memories", async function(request: Request, response: Response) {
    const createMemory = new CreateMemory();
    try {
        await createMemory.execute(request.body);
        return response.status(201).end();
    } catch (e: any) {
        return response.status(422).json({
            message: e.message
        });
    }
});

app.patch("/memories/:idMemory/done", async function(request: Request, response: Response) {
    const updateDoneMemory = new UpdateDoneMemory();
    try {
        const output = await updateDoneMemory.execute(request.params.idMemory, request.body.done);
        return response.status(200).json({
            idMemory: output.idMemory,
            done: output.done
        });
    } catch (e: any) {
        return response.status(422).json({
            message: e.message
        });
    }
});

app.get("/memories/user/:idUser", async function(request: Request, response: Response) {
    const getUndoneMemories = new GetUndoneMemories();
    try {
        const output = await getUndoneMemories.execute(request.params.idUser, new Date());
        return response.status(200).json(output);
    } catch (e: any) {
        return response.status(422).json({
            message: e.message
        })
    }
});

app.listen(3000);