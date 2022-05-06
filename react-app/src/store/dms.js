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
  
  let data = {};
  for (let channel in dmArray.channels) {
    data[channel] = dmArray.channels[channel];
  }
  data.channels = dmArray.channels
  data.dms = dmArray.dms

  dispatch( dms(data) );
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


const initialState = { dms: {} }

const DMReducer = (state = initialState, action) => {
  let newState;

  switch (action.type) {
    case CREATE:
      newState = { ...state }

      newState[action.payload.channel.id] = action.payload.channel;
      newState.channels.push(action.payload.channel);
      newState.dms.push(action.payload.dm)
      // console.log('STATE         :', newState);
      // console.log('CREATE PAYLOAD:', action.payload);
      return newState;
    case DMS:
      return { ...state, ...action.payload };
    case DELETE:
      return null;
    default:
      return state;
  }
}

export default DMReducer;