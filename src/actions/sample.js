import {
    SAMPLE_PROCESSING,
    SAMPLE_RECEIVED,
    SAMPLE_ERROR
} from "../shared/utilities/responseTypes";

import axios from "axios";

const getSample = () => {
    return dispatch => {
        dispatch({
            type: SAMPLE_PROCESSING
        });

        axios
            .get("https://jsonplaceholder.typicode.com/todos/")
            .then(response => {
                console.log("Value of sample", response);
                dispatch({
                    type: SAMPLE_RECEIVED,
                    payload: response
                });
            })
            .catch(error => {
                dispatch({
                    type: SAMPLE_ERROR,
                    payload: error
                });
            });
    };
};

export { getSample };
