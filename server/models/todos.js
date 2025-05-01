const { CustomError, statusCodes } = require('./errors')
const { connect } = require('./supabase')

const TABLE_NAME = 'todos'

/**
 * Gets all todos with pagination support
 * @param {number} page - Page number (default: 1)
 * @param {number} limit - Items per page (default: 10)
 * @param {number} userId - Optional user ID filter
 * @returns {Promise<Object>} - Returns paginated todos with count
 */
async function getAll(page = 1, limit = 10, userId = null) {
    const offset = (page - 1) * limit
    
    let query = connect().from(TABLE_NAME).select('*', { count: 'exact' })
    
    // Filter by userId if provided
    if (userId) {
        query = query.eq('userId', userId)
    }

    const { data, error, count } = await query
        .order('id', { ascending: false })
        .range(offset, offset + limit - 1)
    
    if (error) {
        throw new CustomError(error.message, statusCodes.INTERNAL_SERVER_ERROR)
    }
    
    return {
        items: data || [],
        total: count || 0,
        page,
        limit,
        totalPages: Math.ceil((count || 0) / limit)
    }
}

/**
 * Get a single todo by id
 * @param {number} id - Todo ID
 * @returns {Promise<Object>} - Returns the requested todo
 */
async function get(id) {
    const { data, error } = await connect()
        .from(TABLE_NAME)
        .select('*')
        .eq('id', id)
        .single()
    
    if (error) {
        if (error.code === 'PGRST116') {
            throw new CustomError('Todo not found', statusCodes.NOT_FOUND)
        }
        throw new CustomError(error.message, statusCodes.INTERNAL_SERVER_ERROR)
    }
    
    return data
}

/**
 * Search todos by query string
 * @param {string} query - Search query
 * @returns {Promise<Array>} - Returns matching todos
 */
async function search(query) {
    const searchTerm = `%${query}%`
    const { data, error } = await connect()
        .from(TABLE_NAME)
        .select('*')
        .ilike('todo', searchTerm)
    
    if (error) {
        throw new CustomError(error.message, statusCodes.INTERNAL_SERVER_ERROR)
    }
    
    return {
        items: data || [],
        total: data?.length || 0
    }
}

/**
 * Create a new todo
 * @param {Object} todo - Todo object to create
 * @returns {Promise<Object>} - Returns the created todo
 */
async function create(todo) {
    if (!todo.todo) {
        throw new CustomError('Todo text is required', statusCodes.BAD_REQUEST)
    }
    
    if (todo.userId === undefined) {
        throw new CustomError('userId is required', statusCodes.BAD_REQUEST)
    }

    // Set default values if not provided
    const todoToCreate = {
        ...todo,
        completed: todo.completed === undefined ? false : todo.completed
    }
    
    const { data, error } = await connect()
        .from(TABLE_NAME)
        .insert(todoToCreate)
        .select()
        .single()
    
    if (error) {
        throw new CustomError(error.message, statusCodes.INTERNAL_SERVER_ERROR)
    }
    
    return data
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

