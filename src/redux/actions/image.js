
export const getimage = (id) => {
    return async dispatch => {
        // const { data } = await getReportPerson(id);
        console.log('action id image : ',id)
        const data = {
            id:id,
        }
        await dispatch({ type: "SET_IMAGE", payload: data });

        // await dispatch({ type: "SET_PERSON", payload: person });
    };
};