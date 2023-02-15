
const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                token: action.payload
            }
        case 'SET_LOGGED_USER':
            return {
                ...state,
                loggedUser: action.payload
            }
        case 'LOGOUT':
            return {
                ...state,
                token: null
            }
        default:
            return state;
    }
}

export default authReducer;