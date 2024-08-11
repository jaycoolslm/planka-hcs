import ActionTypes from '../constants/ActionTypes';

const createAiMessage = (message) => ({
  type: ActionTypes.AI_MESSAGE_CREATE,
  payload: {
    message,
  },
});

createAiMessage.success = (localId, message) => ({
  type: ActionTypes.AI_MESSAGE_CREATE__SUCCESS,
  payload: {
    message: {
      id: localId,
      ...message,
    },
  },
});

export default {
  createAiMessage,
};
