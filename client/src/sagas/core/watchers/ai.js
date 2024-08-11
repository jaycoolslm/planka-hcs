import { all, takeEvery } from 'redux-saga/effects';

import services from '../services';
import EntryActionTypes from '../../../constants/EntryActionTypes';

export default function* aiWatchers() {
  yield all([
    takeEvery(EntryActionTypes.AI_MESSAGE_CREATE, ({ payload: { data } }) =>
      services.createAiMessage(data),
    ),
  ]);
}
