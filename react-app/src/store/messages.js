const CREATE   = '/messages/new'

const messages = payload => {
    return { type:CREATE, payload }}


export const createMessage = (message) => async dispatch => {
    const { channel_id, user_id, content } = message;
    const res = await fetch('/api/messages/new', {
        method: 'POST',
        body: JSON.stringify({ channel_id, user_id, content }),
        headers: {'Content-Type': 'application/json'}
    });
    const data = await res.json();

    dispatch( messages(data) );
    // return data;
    }
