import CreateMemory from "./CreateMemory";
import UpdateDoneMemory from "./UpdateDoneMemory";
import GetUndoneMemories from "./GetUndoneMemories";
import DatabaseRepositoryFactory from "./DatabaseRepositoryFactory";
import PgPromiseAdapter from "./PgPromiseAdapter";
import ExpressAdapter from "./ExpressAdapter";
import HttpController from "./HttpController";

const connection = new PgPromiseAdapter();
connection.connect();
const repositoryFactory = new DatabaseRepositoryFactory(connection);
const createMemory = new CreateMemory(repositoryFactory);
const updateDoneMemory = new UpdateDoneMemory(repositoryFactory);
const getUndoneMemories = new GetUndoneMemories(repositoryFactory);
const httpServer = new ExpressAdapter();
new HttpController(httpServer, createMemory, updateDoneMemory, getUndoneMemories);

httpServer.listen(3000);