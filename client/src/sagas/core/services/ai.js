import { call, put } from 'redux-saga/effects';

import actions from '../../../actions';
import { createLocalId } from '../../../utils/local-id';

export function* createAiMessage(data) {
  const localId = yield call(createLocalId);

  yield put(actions.createAiMessage.success(localId, data));
}

export default {
  createAiMessage,
};
