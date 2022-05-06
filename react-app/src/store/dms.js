const CREATE   = '/dms/new'
const DMS      = '/dms'
const DELETE   = '/dms/:id/delete'

// REGULAR ACTION FUNCTIONS
const newDM = payload => {
  return { type:CREATE, payload }}
const dms = payload => {
  return { type:CHANNELS, payload }}
const deleteDM = payload => {
  return { type:DELETE, payload }}

// THUNKS
export const createDM = () => async dispatch => {

}

export const getAllDMs = () => async dispatch => {
  
}

export const delDM = () => async dispatch => {
  
}


const initialState = { }

const DMReducer = (state = initialState, action) => {
  let newState;

  switch (action.type) {
    case CREATE:

    case DMS:

    case DELETE:

    default:
      return newState;
  }
}

export default DMReducer;