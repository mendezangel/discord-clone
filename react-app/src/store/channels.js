const CREATE   = '/channels/new'
const CHANNELS = '/channels'
const UPDATE   = '/channels/:id/edit'
const DELETE   = '/channels/:id/delete'


// REGULAR ACTION FUNCTIONS
const channels = payload => {
  return { type:CHANNELS, payload }}
const newChannel = payload => {
  return { type:CREATE, payload }}
const updateChannel = payload => {
  return { type:UPDATE, payload }}
const deleteChannel = payload => {
  return { type:DELETE, payload }}

// THUNKS
export const getAllChannels = () => async dispatch => {
  const res = await fetch('/api/channels');
  const channelArray = await res.json();

  dispatch( channels(channelArray) );
}

export const createChannel = (channel) => async dispatch => {
  const { name, server_id } = channel;
  const res = await fetch('/api/channels/new', {
    method: 'POST',
    body: JSON.stringify({ name, server_id }),
    headers: {'Content-Type': 'application/json'}
  });
  const data = await res.json();

  dispatch( newChannel(data) );
  return data;
}

export const editChannel = (channel) => async dispatch => {
  const { name, server_id } = channel;
  const res = await fetch('/api/channels/:id/edit', {
    method: 'PATCH',
    body: JSON.stringify({ name, server_id }),
    headers: {'Content-Type': 'application/json'}
  });
  const data = await res.json();

  dispatch( updateChannel(data) );
  return data;
}

export const delChannel = (channelId) => async dispatch => {
  const res = await fetch('/api/channels/:id/delete', {
    method: 'DELETE',
    body: JSON.stringify(channelId),
    headers: {'Content-Type': 'application/json'}
  });
  const data = await res.json();

  dispatch( deleteChannel(data) );
  return data;
}


const initialState = {}

const ChannelReducer = (state = initialState, action) => {
  let newState;

  switch (action.type) {
    case CREATE:
      newState = { ...state }
      newState.channels = newState.channels.concat( action.payload );

      return newState;
    case CHANNELS:
      newState = { ...state };
      newState.channels = action.payload;

      return newState;
    case UPDATE:
      newState = { ...state };
      newState.channels = newState.channels.map( channel => {
        if ( channel.id === action.payload.id ) {
          return action.payload;
        } else {
          return channel;
        }
      })

      return newState;
    case DELETE:
      newState = { ...state };
      newState.channels = newState.channels.filter( channel => {
        if ( channel.id !== action.payload ) {
          return channel;
        } else {
          return null;
        }
      });

      return newState;
    default:
      return state;
  }
}

export default ChannelReducer
