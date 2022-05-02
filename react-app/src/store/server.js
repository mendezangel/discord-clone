const CREATE  = '/servers/new'
const SERVERS = '/servers'
const UPDATE  = '/servers/:id/edit'
const DELETE  = '/servers/:id/delete'


// REGULAR ACTION FUNCTIONS
const servers = payload => {
  return { type: SERVERS, payload }};
const newServer = payload => {
  return { type: CREATE, payload }};
const updateServer = payload => {
  return { type: UPDATE, payload }};
const deleteServer = payload => {
  return { type: DELETE, payload }};

//THUNKS
export const getAllServers = () => async dispatch => {
  const res = await fetch('api/servers');
  const serverArray = await res.json();

  dispatch( servers(serverArray) );
}

export const createServer = (server) => async dispatch => {
  const { owner_id, name, image, invite_url } = server;
  const res = await fetch('api/servers/new', {
    method: 'POST',
    body: JSON.stringify({ owner_id, name, image, invite_url }),
    headers: {'Content-Type': 'application/json'}
  });
  const data = await res.json();

  dispatch( newServer(data) )
  return data;
}

export const editServer = (server) => async dispatch => {
  const { owner_id, name, image, invite_url } = server;
  const res = await fetch('api/servers/:id/edit', {
    method: 'PATCH',
    body: JSON.stringify({ owner_id, name, image, invite_url }),
    headers: {'Content-Type': 'application/json'}
  });
  const data = await res.json();

  dispatch( updateServer(data) );
  return data;
}

export const delServer = (serverId) => async dispatch => {
  const res = await fetch('api/servers/:id/delete', {
    method: 'DELETE',
    body: JSON.stringify(serverId),
    headers: {'Content-Type': 'application/json'}
  });
  const data = await res.json();

  dispatch( deleteServer(data) );
  return data;
}


const initialState = {}

const ServerReducer = (state = initialState, action) => {
  let newState;

  switch (action.type) {
    case CREATE:
      newState = { ...state };
      newState.servers = newState.servers.concat( action.payload );

      return newState;
    case SERVERS:
      newState = { ...state };
      newState.servers = action.payload;

      return newState;
    case UPDATE:
      newState = { ...state };
      newState.servers = newState.servers.map( server => {
        if ( server.id === action.payload.id ) {
          return action.payload;
        } else {
          return server;
        }
      })

      return newState;
    case DELETE:
      newState = { ...state };
      newState.servers = newState.servers.filter( server => {
        if ( server.id !== action.payload ) return server;
      });

      return newState;
    default:
      return state;
  }
}

export default ServerReducer;
