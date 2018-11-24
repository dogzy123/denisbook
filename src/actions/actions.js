export const LOAD_RECORDS  = "LOAD RECORDS";
export const DELETE_RECORD = "DELETE RECORD";
export const ADD_RECORD    = "ADD RECORD";

export const addRecord = record => {
    return {
        type : ADD_RECORD,
        record
    };
};

export const loadRecords = recordsArray => {
    return {
        type: LOAD_RECORDS,
        records : recordsArray
    };
};

export const removeRecord = recordId => {
    return {
        type: DELETE_RECORD,
        recordId
    }
};