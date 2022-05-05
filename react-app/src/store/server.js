const CREATE = 'servers/new'
const SERVERS = 'servers'
const UPDATE = 'servers/edit'
const DELETE = 'servers/delete'
const JOIN = 'servers/join'


// REGULAR ACTION FUNCTIONS
const servers = payload => {
  return { type: SERVERS, payload }
};
const newServer = payload => {
  return { type: CREATE, payload }
};
const updateServer = payload => {
  return { type: UPDATE, payload }
};
const deleteServer = payload => {
  return { type: DELETE, payload }
};

const joinOne = payload => {
  return { type: JOIN, payload }
}

//THUNKS
export const getAllServers = (id) => async dispatch => {
  const res = await fetch(`/api/servers/${id}`);
  const { servers: serversArray } = await res.json();

  dispatch(servers(serversArray));
}

export const createServer = (server) => async dispatch => {
  const { owner_id, name, image, url } = server;
  const res = await fetch('/api/servers/new', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ owner_id, name, image, url }),
  });
  const data = await res.json();
  if (data.errors) {
    return data;
  }
  dispatch(newServer(data))
  return data;
}

export const editServer = (server) => async dispatch => {
  const { owner_id, name, image, invite_url, id } = server;
  const res = await fetch(`/api/servers/edit`, {
    method: 'PATCH',
    body: JSON.stringify({ owner_id, name, image, id }),
    headers: { 'Content-Type': 'application/json' }
  });
  const data = await res.json();

  dispatch(updateServer(data));
  return data;
}

export const delServer = (serverId) => async dispatch => {
  const res = await fetch('/api/servers/delete', {
    method: 'DELETE',
    body: JSON.stringify(serverId),
    headers: { 'Content-Type': 'application/json' }
  });
  const data = await res.json();

  dispatch(deleteServer(data));
  return data;
}

export const joinServer = serverId => async dispatch => {
  const res = await fetch(`/api/servers/gg/${serverId}`)
  if (res.ok) {
    const server = await res.json()
    dispatch(joinOne(server))
  }
}


const initialState = { servers: [] }

const ServerReducer = (state = initialState, action) => {
  let newState;

  switch (action.type) {
    case CREATE:
      newState = { ...state };
      newState.servers.push(action.payload);
      newState[action.payload.id] = action.payload;
      return newState;

    case SERVERS:
      newState = { ...state, servers: [...action.payload] };
      action.payload.forEach(server => {
        newState[server.id] = server
      })
      return newState;

    case JOIN:
      newState = { ...state, servers: [{ ...action.payload }] }
      newState[action.payload.id] = action.payload
      return newState

    case UPDATE:
      newState = { ...state };
      newState[action.payload.id] = action.payload;
      for (let i = 0; i < newState.servers.length; i++) {
        const server = newState.servers[i];
        if (server.id === action.payload.id) return newState.servers.splice(i, 1, action.payload)
      }
      return newState;

    case DELETE:
      newState = { ...state };
      delete newState[action.payload.id];
      for (let i = 0; i < newState.servers.length; i++) {
        const server = newState.servers[i];
        if (server.id === action.payload.id) newState.servers.splice(i, 1)
      }
      return newState;

    default:
      return state;
  }
}

export default ServerReducer;
