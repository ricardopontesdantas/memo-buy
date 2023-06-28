import CreateMemory from "../../application/usecase/CreateMemory";
import GetUndoneMemories from "../../application/usecase/GetUndoneMemories";
import HttpServer from "./HttpServer";
import UpdateDoneMemory from "../../application/usecase/UpdateDoneMemory";

export default class HttpController {
    constructor(readonly httpServer: HttpServer, readonly createMemory: CreateMemory, readonly updateDoneMemory: UpdateDoneMemory, getUndoneMemories: GetUndoneMemories) {
        this.httpServer.on("post", "/memories", async function(params: any, body: any) {
            const output = await createMemory.execute(body);
            return output;
        });

        this.httpServer.on("patch", "/memories/:idMemory/done", async function(params: any, body: any) {
            const output = await updateDoneMemory.execute(params.idMemory, body.done);
            return {
                idMemory: output.idMemory,
                done: output.done
            };
        });

        this.httpServer.on("get", "/memories/user/:idUser", async function(params: any, body: any) {
            const output = await getUndoneMemories.execute(params.idUser, new Date());
            return output;
        });
    }
}