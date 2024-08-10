import ActionTypes from '../constants/ActionTypes';

const createAiPrompt = (prompt) => ({
  type: ActionTypes.AI_PROMPT_CREATE,
  payload: {
    prompt,
  },
});

createAiPrompt.success = (localId, prompt) => ({
  type: ActionTypes.AI_PROMPT_CREATE__SUCCESS,
  payload: {
    prompt: {
      id: localId,
      ...prompt,
    },
  },
});

export default {
  createAiPrompt,
};
