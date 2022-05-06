const CREATE = '/channels/new'
const CHANNELS = '/channels'
const UPDATE = '/channels/:id/editchannel'
const DELETE = '/channels/:id/delete'
const CREATE_MESSAGE = '/messages/new'
const LOAD_ALL_MESSAGES = 'messages/all'


// REGULAR ACTION FUNCTIONS
const channels = payload => {
  return { type: CHANNELS, payload }
}
const newChannel = payload => {
  return { type: CREATE, payload }
}
const updateChannel = payload => {
  return { type: UPDATE, payload }
}
const deleteChannel = payload => {
  return { type: DELETE, payload }
}

const loadMessage = payload => {
  return { type: CREATE_MESSAGE, payload }
}

const loadAllMessages = payload => {
  return { type: LOAD_ALL_MESSAGES, payload }
}

// THUNKS

export const createMessage = (message) => async dispatch => {
  const { channel_id, user_id, content } = message;
  const res = await fetch('/api/messages/new', {
    method: 'POST',
    body: JSON.stringify({ channel_id, user_id, content }),
    headers: { 'Content-Type': 'application/json' }
  });
  const data = await res.json();

  dispatch(loadMessage(data));
  // return data;
}

export const getAllChannels = () => async dispatch => {
  const res = await fetch(`/api/channels/`);
  const channelArray = await res.json();

  dispatch(channels(channelArray));
}

export const createChannel = (channel) => async dispatch => {
  const { name, server_id } = channel;
  const res = await fetch('/api/channels/new', {
    method: 'POST',
    body: JSON.stringify({ name, server_id }),
    headers: { 'Content-Type': 'application/json' }
  });
  const data = await res.json();

  dispatch(newChannel(data));
  return data;
}

export const editChannel = (channel) => async dispatch => {
  const { name, server_id } = channel;
  const res = await fetch(`/api/channels/${channel.id}/editchannel`, {
    method: 'PATCH',
    body: JSON.stringify({ name, server_id }),
    headers: { 'Content-Type': 'application/json' }
  });
  const data = await res.json();

  dispatch(updateChannel(data));
  return data;
}

export const delChannel = (channelId) => async dispatch => {
  const res = await fetch(`/api/channels/${channelId}/delete`, {
    method: 'DELETE',
    body: JSON.stringify(channelId),
    headers: { 'Content-Type': 'application/json' }
  });
  const data = await res.json();

  dispatch(deleteChannel(channelId));
  return data;
}

export const getAllMessages = (channelId) => async dispatch => {
  const res = await fetch(`/api/messages/${channelId}/all`)
  if (res.ok) {
    const messages = await res.json()
    dispatch(loadAllMessages(messages))
  }
}


const initialState = { 'messages': {} }

const ChannelReducer = (state = initialState, action) => {
  let newState;

  switch (action.type) {
    case CREATE:
      newState = { ...state };
      newState.channels.push(action.payload);
      newState[action.payload.id] = action.payload;
      return newState;

    case CHANNELS:
      let payload = action.payload['channels']
      newState = { ...state, channels: payload }
      payload.forEach(channel => {
        newState[channel.id] = channel
        channel.messages.forEach((message) => {
          newState.messages[message.id] = message
        })
      })

      return newState;
    case UPDATE:
      newState = { ...state };
      newState.channels.channels = newState.channels.map(channel => {
        if (channel.id === action.payload.id) {
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

    case CREATE_MESSAGE:
      newState = { ...state };
      newState[action.payload.channel_id].messages.push(action.payload)
      // newState.messages = { ...newState.messages }
      // newState.messages[action.payload.id] = action.payload;
      return newState

    case LOAD_ALL_MESSAGES:
      newState = { ...state, messages: { ...state.messages } };
      id = action.payload.messages[0].channel_id
      newState[id].messages.push(...action.payload.messages)
      return newState

    default:
      return state;
  }
}

export default ChannelReducer
