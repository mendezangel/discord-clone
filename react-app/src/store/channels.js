const CREATE   = '/channels/new'
const CHANNELS = '/channels'
const UPDATE   = '/channels/:id/editchannel'
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
  const res = await fetch(`/api/channels/`);
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
  const res = await fetch(`/api/channels/${channel.id}/editchannel`, {
    method: 'PATCH',
    body: JSON.stringify({ name, server_id }),
    headers: {'Content-Type': 'application/json'}
  });
  const data = await res.json();

  dispatch( updateChannel(data) );
  return data;
}

export const delChannel = (channelId) => async dispatch => {
  const res = await fetch(`/api/channels/${channelId}/delete`, {
    method: 'DELETE',
    body: JSON.stringify(channelId),
    headers: {'Content-Type': 'application/json'}
  });
  const data = await res.json();

  dispatch( deleteChannel(channelId) );
  return data;
}


const initialState = { }

const ChannelReducer = (state = initialState, action) => {
  let newState;

  switch (action.type) {
    case CREATE:
      newState = { ...state };
      newState.channels.push(action.payload);
      newState[action.payload.id] = action.payload;
      return newState;
    case CHANNELS:
      let payload = action.payload['test']
      newState = { ...state, channels: payload}
      payload.forEach( channel => {
        newState[channel.id] = channel
      })

      return newState;
    case UPDATE:
      newState = { ...state };
      newState.channels.channels = newState.channels.map( channel => {
        if ( channel.id === action.payload.id ) {
          return action.payload;
        } else {
          return channel;
        }
      })

      return newState;
    case DELETE:
      newState = { ...state };
      delete newState[action.payload];
      for (let i = 0; i < newState.channels.length; i++) {
        const channel = newState.channels[i];
        if (channel.id === action.payload) newState.channels.splice(i, 1)
      }
      return newState;
    default:
      return state;
  }
}

export default ChannelReducer
