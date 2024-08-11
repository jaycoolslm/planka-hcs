import EntryActionTypes from '../constants/EntryActionTypes';

const aiMessageCreate = (data) => ({
  type: EntryActionTypes.AI_MESSAGE_CREATE,
  payload: {
    data,
  },
});

export default {
  aiMessageCreate,
};
