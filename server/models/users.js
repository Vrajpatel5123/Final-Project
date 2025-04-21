/* B"H 
*/

const data = require('../data/users.json');
const { CustomError, statusCodes } = require('./errors')


async function getAll () {
    return data;
}

async function get(id) {
    const todo = data.items.find((todo) => todo.id === id);
    return todo;
}

async function create(todo){
    const newTodo = {
        ...todo,
        id: data.items.length + 1,
    }
    data.items.push(newTodo);
    return newTodo;
}

async function update(id, todo) {
    const index = data.items.findIndex((item) => item.id === id);
    if (index !== -1) {
        data.items[index] = { ...data.items[index], ...todo };
        return data.items[index];
    }
    return null
}

async function remove(id) {
    const index = data.items.findIndex((t) => t.id === id);
    if (index !== -1) {
        const deletedTodo = data.items[index];
        data.items.splice(index, 1);
        return deletedTodo;
    }
    return null
}

module.exports={
    getAll,
    get,
    create,
    update,
    remove
}

