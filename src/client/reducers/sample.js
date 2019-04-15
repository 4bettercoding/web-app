import {
    SAMPLE_PROCESSING,
    SAMPLE_RECEIVED,
    SAMPLE_ERROR
} from "../../shared/utilities/responseTypes";

let initialState = {
    isLoading: true,
    isError: false,
    payload: {}
};

const sample = (state = initialState, action) => {
    switch (action.type) {
        case SAMPLE_PROCESSING:
            return {
                ...state,
                isLoading: true,
                isError: false,
                payload: {}
            };
        case SAMPLE_RECEIVED:
            return {
                ...state,
                isLoading: false,
                isError: false,
                payload: action.payload
            };
        case SAMPLE_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                payload: action.payload
            };
        default:
            return state;
    }
};

export default sample;
