const INITIAL_STATE = {
    userData: [],
    kategoriPekerjaan: [],
    filtered: [],
};

export const userReducer = ( state = INITIAL_STATE, action ) => {
    switch(action.type){
        case "FETCH_USERDATA":
            return{
                ...state,
                userData: action.payload
            }
        case "FETCH_CATEGORIES":
            return{
                ...state,
                kategoriPekerjaan: action.payload,
            }
        default:
            return state;
    }
}