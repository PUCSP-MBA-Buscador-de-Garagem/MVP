import ClienteRepository from "../repositories/client.repository.js"

async function createClient(client){
    return await ClienteRepository.insertClient(client);
}

async function getClients(){
    return await ClienteRepository.getClients();
}

async function getClient(id){
    return await ClienteRepository.getClient(id);
}

async function deleteClient(id){
    await ClienteRepository.deleteClient(id);
}

async function updateClient(client){
    return await ClienteRepository.updateClient(client);
}
export default {
    createClient,
    getClients,
    getClient,
    deleteClient,
    updateClient
}
