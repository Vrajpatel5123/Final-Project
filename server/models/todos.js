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
    return items[0];
}

async function search(query){
    const {data : items, error} = await connect().from(TABLE_NAME).select('*')
    .or('todo.ilike.%'+query+'%,todo.ilike.%'+query+'%')
    if(error){
        throw error
    }
    return items
}

async function create(todo){
    const {data: newTodo, error} = await connect().from(TABLE_NAME).insert(todo).select('*')
    if(error){
        throw error
    }
    
    return newTodo;
}

async function update(id, todo) {
    if(!isAdmin){
        throw new CustomError('Unauthorized', statusCodes.UNAUTHORIZED)
    }
    const {data: updatedTodo, error} = await connect().from(TABLE_NAME).update(todo).eq('id', id).select('*')

    if(error){
        throw error
    }

    return updatedTodo;
}

async function remove(id) {
    if(!isAdmin){
        throw new CustomError('Unauthorized', statusCodes.UNAUTHORIZED)
    }
    const {data: deletedTodo, error} = await connect().from(TABLE_NAME).delete().eq('id', id)
    if(error){
        throw error
    }
    return deletedTodo;
    
}

// async function seed() {
    
//     for(const item of data.items){
//         const insert = mapToDB(item)
//         console.log(insert)  
//         console.log("line break \n")

//         const users = mapUserToDB(item.users, item.id)
        
//         const {data: newTodo, error} = await connect()
//         .from(TABLE_NAME)
//         .insert(users)
//         .select('*');

        
//         if(error){
//             throw error;
//         }
//     }

//     return { message: 'Seeded successfully to DB' };
// }

// function mapToDB(item) {
//     newItem = {
//         todo: item.todo,
//         completed: item.completed,
//         userId: item.userId,
//     }
//     return newItem
// }

// function mapUserToDB(user, todo_id) {
//     return {
//         todo_id: todo_id,
//         firstName: user.firstName,
//         email: user.email,
//         isAdmin: user.isAdmin,
//     }
// }

module.exports={
    getAll,
    get,
    search,
    create,
    update,
    remove,
    // seed
}

