import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import entryActions from '../entry-actions';
import AiModal from '../components/AiModal/AiModal';

const mapStateToProps = ({ ai: stateData }) => ({ stateData });

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      onCreate: entryActions.aiMessageCreate,
      onClose: entryActions.closeModal,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(AiModal);
