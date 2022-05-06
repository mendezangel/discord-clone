const CREATE   = '/dms/new'
const DMS      = '/dms'
const DELETE   = '/dms/:id/delete'

// REGULAR ACTION FUNCTIONS
const newDM = payload => {
  return { type:CREATE, payload }}
const dms = payload => {
  return { type:DMS, payload }}
const deleteDM = payload => {
  return { type:DELETE, payload }}

// THUNKS
export const createDM = (dm) => async dispatch => {
  const { name, server_id, recipient_name } = dm;
  const res = await fetch('/api/dms/new', {
    method: 'POST',
    body: JSON.stringify({ name, server_id, recipient_name }),
    headers: {'Content-Type': 'application/json'}
  })
  const data = await res.json();
  console.log('--------------------------', data)

  dispatch( newDM(data) );
  return data;
}

export const getAllDMs = (userId) => async dispatch => {
  const res = await fetch(`/api/dms/`);
  const dmArray = await res.json();
  console.log('\n\n\n\n\n\n\n', dmArray)

  dispatch( dms(dmArray) );
}

export const delDM = (dm_id) => async dispatch => {
  const res = await fetch(`/api/dms/${dm_id}/delete`, {
    method: 'DELETE',
    body: JSON.stringify(dm_id),
    headers: {'Content-Type': 'application/json'}
  });
  const data = await res.json();

  dispatch( deleteDM(dm_id) );
  return data;
}


const initialState = { }

const DMReducer = (state = initialState, action) => {
  let newState;

  switch (action.type) {
    case CREATE:
      break;
    case DMS:
      console.log('\n\n\n\nPAYLOAD:', action.payload)  

      newState = { ...state }
      return newState;
    case DELETE:
      break;
    default:
      return newState;
  }
}

export default DMReducer;