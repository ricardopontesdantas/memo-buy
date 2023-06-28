import CreateMemory from "./application/usecase/CreateMemory";
import UpdateDoneMemory from "./application/usecase/UpdateDoneMemory";
import GetUndoneMemories from "./application/usecase/GetUndoneMemories";
import DatabaseRepositoryFactory from "./infra/factory/DatabaseRepositoryFactory";
import PgPromiseAdapter from "./infra/database/PgPromiseAdapter";
import ExpressAdapter from "./infra/http/ExpressAdapter";
import HttpController from "./infra/http/HttpController";

const connection = new PgPromiseAdapter();
connection.connect();
const repositoryFactory = new DatabaseRepositoryFactory(connection);
const createMemory = new CreateMemory(repositoryFactory);
const updateDoneMemory = new UpdateDoneMemory(repositoryFactory);
const getUndoneMemories = new GetUndoneMemories(repositoryFactory);
const httpServer = new ExpressAdapter();
new HttpController(httpServer, createMemory, updateDoneMemory, getUndoneMemories);

httpServer.listen(3000);