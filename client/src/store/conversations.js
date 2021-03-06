import {
  addChat,
  addOnlineUserToStore,
  addSearchedUsersToStore,
  removeOfflineUserFromStore,
  addMessageToStore,
  updateTyping,
  updateToRead,
} from './utils/reducerFunctions';

// ACTIONS

const GET_CONVERSATIONS = 'GET_CONVERSATIONS';
const SET_MESSAGE = 'SET_MESSAGE';
const ADD_ONLINE_USER = 'ADD_ONLINE_USER';
const REMOVE_OFFLINE_USER = 'REMOVE_OFFLINE_USER';
const SET_SEARCHED_USERS = 'SET_SEARCHED_USERS';
const CLEAR_SEARCHED_USERS = 'CLEAR_SEARCHED_USERS';
const ADD_CONVERSATION = 'ADD_CONVERSATION';
const SET_TYPING_STATUS = 'SET_TYPING_STATUS';
const SET_READ_STATUS = 'SET_READ_STATUS';

// ACTION CREATORS

export const gotConversations = (conversations) => {
  return {
    type: GET_CONVERSATIONS,
    conversations,
  };
};

export const setNewMessage = (message, sender) => {
  return {
    type: SET_MESSAGE,
    payload: { message, sender: sender || null },
  };
};

export const addOnlineUser = (id) => {
  return {
    type: ADD_ONLINE_USER,
    id,
  };
};

export const removeOfflineUser = (id) => {
  return {
    type: REMOVE_OFFLINE_USER,
    id,
  };
};

export const setSearchedUsers = (users) => {
  return {
    type: SET_SEARCHED_USERS,
    users,
  };
};

export const clearSearchedUsers = () => {
  return {
    type: CLEAR_SEARCHED_USERS,
  };
};

// add new conversation when sending a new message
export const addConversation = (recipientId, newMessage) => {
  return {
    type: ADD_CONVERSATION,
    payload: { recipientId, newMessage },
  };
};

export const setReadStatus = (updatedMessagesId, conversationId) => {
  return {
    type: SET_READ_STATUS,
    payload: {
      conversationId,
      updatedMessagesId,
    },
  };
};

export const setTypingStatus = (conversationId, typing) => {
  return {
    type: SET_TYPING_STATUS,
    payload: { conversationId, typing },
  };
};
// REDUCER

const reducer = (state = [], action) => {
  switch (action.type) {
    case GET_CONVERSATIONS:
      return action.conversations;
    case SET_MESSAGE:
      return addMessageToStore(state, action.payload);
    case ADD_ONLINE_USER: {
      return addOnlineUserToStore(state, action.id);
    }
    case REMOVE_OFFLINE_USER: {
      return removeOfflineUserFromStore(state, action.id);
    }
    case SET_SEARCHED_USERS:
      return addSearchedUsersToStore(state, action.users);
    case CLEAR_SEARCHED_USERS:
      return state.filter((convo) => convo.id);
    case ADD_CONVERSATION:
      return addChat(
        state,
        action.payload.recipientId,
        action.payload.newMessage
      );
    case SET_TYPING_STATUS:
      return updateTyping(state, action.payload);
    case SET_READ_STATUS:
      return updateToRead(state, action.payload);
    default:
      return state;
  }
};

export default reducer;
