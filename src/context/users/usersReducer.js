
const usersReducer = (state, action) => {
    switch (action.type) {
        case 'GET_ALL_USERS': {
            return {
                ...state,
                usersDb: action.payload
            }
        }
        case 'CREATE_USER': {
            return {
                ...state,
                usersDb: [...state.usersDb, action.payload]
            }
        }
        case 'REGISTER_USER': {
            return {
                ...state,
                usersDb: [...state.usersDb, action.payload]
            }
        }
        case 'UPDATE_USER': {
            return {
                ...state,
                usersDb: action.payload
            }
        }
        case 'DELETE_USER': {
            return {
                ...state,
                usersDb: action.payload
            }
        }
        default:
            return state;
    }
}

export default usersReducer;