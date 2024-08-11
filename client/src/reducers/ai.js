import ActionTypes from '../constants/ActionTypes';

const initialState = {
  messages: [],
  isSubmitting: false,
};

// eslint-disable-next-line default-param-last
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.AI_MESSAGE_CREATE__SUCCESS:
      return {
        ...state,
        messages: [...state.messages, payload.message],
      };
    case ActionTypes.AI_MESSAGE_CREATE__IS_SUBMITTING:
      return {
        ...state,
        isSubmitting: payload.isSubmitting,
      };
    default:
      return state;
  }
};
