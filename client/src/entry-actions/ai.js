import EntryActionTypes from '../constants/EntryActionTypes';

const aiPromptCreate = (data) => ({
  type: EntryActionTypes.AI_PROMPT_CREATE,
  payload: {
    data,
  },
});

export default {
  aiPromptCreate,
};
