import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import entryActions from '../entry-actions';
import AiModal from '../components/AiModal/AiModal';

const mapStateToProps = ({
  // TODO: update this with AI modal state
  ui: {
    projectCreateForm: { data: defaultData, isSubmitting },
  },
}) => ({
  defaultData,
  isSubmitting,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      // TODO: update this with AI modal actions
      onCreate: entryActions.createProject,
      onClose: entryActions.closeModal,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(AiModal);
