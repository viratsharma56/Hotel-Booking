
const initialState = JSON.parse(localStorage.getItem('auth')) || null;

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case "LOGGED_IN_USER":
            return { ...state, ...action.payload }

        case "LOGGED_OUT_USER":
            return action.payload
        default:
            return state;
    }
}