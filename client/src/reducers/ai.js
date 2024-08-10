import ActionTypes from '../constants/ActionTypes';

const initialState = {
  prompts: [],
};

// eslint-disable-next-line default-param-last
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.AI_PROMPT_CREATE__SUCCESS:
      return {
        ...state,
        prompts: [...state.prompts, payload.prompt],
      };
    default:
      return state;
  }
};
