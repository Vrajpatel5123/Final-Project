/* B"H 
*/

const data = require('../data/todos.json');
const { CustomError, statusCodes } = require('./errors')
const {connect} = require('./supabase')

const TABLE_NAME = 'todos'

const isAdmin = true;


async function getAll () {
    const list = await connect().from(TABLE_NAME).select('*')
    if(list.error){
        throw error
    }
    return{
        items: list.data
    }
}

async function get(id) {
    const {data:items, error} = await connect().from(TABLE_NAME).select('*').eq('id', id)
    if(!items.length){
        throw new CustomError('Todo not found', statusCodes.NOT_FOUND)
    }
    if(error){
        throw error
    }
    return items;
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

async function seed(){

}

module.exports={
    getAll,
    get,
    //search,
    create,
    update,
    remove,
    seed
}

