export const imageReducer = (state = {}, action) => {
    switch (action.type) {
        case "SET_IMAGE":
            return { ...action.payload };
        default:
            return state;
    }
};