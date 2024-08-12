import { call, put } from 'redux-saga/effects';

import actions from '../../../actions';
import request from '../request';
import api from '../../../api/ai';
import { createLocalId } from '../../../utils/local-id';

export function* createAiMessage(data) {
  yield put(actions.createAiMessage.IsSubmitting(true));
  const requestLocalId = yield call(createLocalId);

  yield put(actions.createAiMessage.success(requestLocalId, data));

  try {
    const { choices } = yield call(request, api.createChatCompletion, data);
    const responseLocalId = yield call(createLocalId);
    yield put(actions.createAiMessage.success(responseLocalId, choices[0].message));
    yield put(actions.createAiMessage.IsSubmitting(false));
  } catch (error) {
    console.error(error);
  }
}

export default {
  createAiMessage,
};
