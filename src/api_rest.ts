import express, { Request, Response } from "express";
import CreateMemory from "./CreateMemory";
import UpdateDoneMemory from "./UpdateDoneMemory";
import GetUndoneMemories from "./GetUndoneMemories";
import DatabaseRepositoryFactory from "./DatabaseRepositoryFactory";
import PgPromiseAdapter from "./PgPromiseAdapter";
const app = express();
app.use(express.json())

const connection = new PgPromiseAdapter();
connection.connect();
const repositoryFactory = new DatabaseRepositoryFactory(connection);
const createMemory = new CreateMemory(repositoryFactory);
const updateDoneMemory = new UpdateDoneMemory(repositoryFactory);
const getUndoneMemories = new GetUndoneMemories(repositoryFactory);

app.post("/memories", async function(request: Request, response: Response) {    
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