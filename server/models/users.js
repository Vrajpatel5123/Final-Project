/* B"H 
*/

const data = require('../data/users.json');
const { CustomError, statusCodes } = require('./errors')
const {connect} = require('./supabase')

const TABLE_NAME = 'users'

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

async function search(query){
    console.log(query)
    const {data : items, error} = await connect().from(TABLE_NAME).select('*')
    .or('name.ilike.%'+query+'%')
    .select('*')
    if(error){
        throw error
    }
    return items
}

async function create(user){
    const {data: newUser, error} = await connect().from(TABLE_NAME).insert(users).select('*')
    if(error){
        throw error
    }
    
    return newUser;
}

async function update(id, user) {
    if(!isAdmin){
        throw new CustomError('Unauthorized', statusCodes.UNAUTHORIZED)
    }
    const {data: updatedUser, error} = await connect().from(TABLE_NAME).update(user).eq('id', id).select('*')

    if(error){
        throw error
    }

    return updatedUser;
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
        
//         const {data: newUser, error} = await connect()
//         .from(TABLE_NAME)
//         .insert(insert)
//         .select('*');

        
//         if(error){
//             throw error;
//         }
//     }

//     return { message: 'Seeded successfully to DB' };
// }


// function mapToDB(item) {
//     return {
//         id: item.id,
//         name: item.firstName,
//         email: item.email,
//         role: item.role
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

