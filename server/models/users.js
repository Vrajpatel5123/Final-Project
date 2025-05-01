
const { CustomError, statusCodes } = require('./errors')
const { connect } = require('./supabase')

const TABLE_NAME = 'users'

/**
 * Gets all users with pagination support
 * @param {number} page - Page number (default: 1)
 * @param {number} limit - Items per page (default: 10)
 * @returns {Promise<Object>} - Returns paginated users with count
 */
async function getAll(page = 1, limit = 10) {
    const offset = (page - 1) * limit
    
    const { data, error, count } = await connect()
        .from(TABLE_NAME)
        .select('*', { count: 'exact' })
        .order('id', { ascending: true })
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
 * Get a user by ID
 * @param {number} id - User ID
 * @returns {Promise<Object>} - Returns the user
 */
async function get(id) {
    const { data, error } = await connect()
        .from(TABLE_NAME)
        .select('*')
        .eq('id', id)
        .single()
    
    if (error) {
        if (error.code === 'PGRST116') {
            throw new CustomError('User not found', statusCodes.NOT_FOUND)
        }
        throw new CustomError(error.message, statusCodes.INTERNAL_SERVER_ERROR)
    }
    
    return data
}

/**
 * Search users by name
 * @param {string} query - Search query
 * @param {number} page - Page number
 * @param {number} limit - Items per page
 * @returns {Promise<Object>} - Returns matching users
 */
async function search(query, page = 1, limit = 10) {
    const offset = (page - 1) * limit
    const searchTerm = `%${query}%`
    
    const { data, error, count } = await connect()
        .from(TABLE_NAME)
        .select('*', { count: 'exact' })
        .ilike('name', searchTerm)
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
 * Create a new user
 * @param {Object} user - User object to create
 * @returns {Promise<Object>} - Returns the created user
 */
async function create(user) {
    // Validate required fields
    if (!user.name) {
        throw new CustomError('Name is required', statusCodes.BAD_REQUEST)
    }
    if (!user.email) {
        throw new CustomError('Email is required', statusCodes.BAD_REQUEST)
    }
    
    // Set default values
    const userToCreate = {
        ...user,
        isAdmin: user.isAdmin || false
    }
    
    // Check if email already exists
    const { data: existingUser } = await connect()
        .from(TABLE_NAME)
        .select('*')
        .eq('email', user.email)
    
    if (existingUser && existingUser.length > 0) {
        throw new CustomError('Email already in use', statusCodes.CONFLICT)
    }
    
    const { data, error } = await connect()
        .from(TABLE_NAME)
        .insert(userToCreate)
        .select()
        .single()
    
    if (error) {
        throw new CustomError(error.message, statusCodes.INTERNAL_SERVER_ERROR)
    }
    
    return data
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

