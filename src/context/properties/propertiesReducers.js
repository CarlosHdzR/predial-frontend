
const propertiesReducers = (state, action) => {
    switch (action.type) {
        case 'GET_ALL_PROPERTIES':
            return {
                ...state,
                propertiesDb: action.payload
            }
        case 'CREATE_PROPERTY':
            return {
                ...state,
                propertiesDb: [...state.propertiesDb, action.payload]
            }
        case 'UPDATE_PROPERTY':
            return {
                ...state,
                propertiesDb: action.payload
            }
        case 'DELETE_PROPERTY':
            return {
                ...state,
                propertiesDb: action.payload
            }
        case 'FIND_PROPERTIES_BY_OWNER_ID_NUMBER':
            return {
                ...state,
                foundProperties: action.payload
            }
        case 'CLEAN_FOUND_PROPERTIES':
            return {
                ...state,
                foundProperties: action.payload
            }
        case 'ASSOCIATE_PROPERTY':
            return {
                ...state,
                foundProperties: action.payload
            }
        case 'GET_ASSOCIATED_PROPERTIES':
            return {
                ...state,
                associatedProperties: action.payload
            }
        case 'PAY_TAX':
            return {
                ...state,
                associatedProperties: action.payload
            }
        case 'GET_ALL_RECORDS':
            return {
                ...state,
                recordsDb: action.payload
            }
        case 'CREATE_RECORD':
            return {
                ...state,
                recordsDb: [...state.recordsDb, action.payload]
            }
        default:
            return state;
    }
}

export default propertiesReducers;