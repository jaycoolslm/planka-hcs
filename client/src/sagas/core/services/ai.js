import { call, put } from 'redux-saga/effects';

import actions from '../../../actions';
import { createLocalId } from '../../../utils/local-id';

export function* createAiPrompt(data) {
  const localId = yield call(createLocalId);

  yield put(actions.createAiPrompt.success(localId, data));
}

export default {
  createAiPrompt,
};
