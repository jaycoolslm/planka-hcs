import React, { useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Button, Form, Modal, Message } from 'semantic-ui-react';
import { Input } from '../../lib/custom-ui';

import { useForm } from '../../hooks';

import styles from './AiModal.module.scss';

const AiModal = React.memo(({ defaultData, isSubmitting, onCreate, onClose }) => {
  const [t] = useTranslation();

  const [data, handleFieldChange] = useForm(() => ({
    name: '',
    ...defaultData,
  }));

  const nameField = useRef(null);

  const handleSubmit = useCallback(() => {
    const cleanData = {
      ...data,
      name: data.name.trim(),
    };

    if (!cleanData.name) {
      nameField.current.select();
      return;
    }

    onCreate(cleanData);
  }, [onCreate, data]);

  useEffect(() => {
    nameField.current.focus();
  }, []);

  return (
    <Modal open closeIcon size="large" onClose={onClose}>
      <Modal.Header>
        Create Project with the Help of AI
        {/* {t('common.createProject', {
            context: 'title',
        })} */}
      </Modal.Header>
      <Modal.Content scrolling className={styles['modal-content']}>
        <div className={styles['message-container-right']}>
          <Message floating compact right content="Some Prompt" />
        </div>
        <div className={styles['message-container-left']}>
          <Message floating compact right content="Some AI Response. Supposedly a long one!" />
        </div>
      </Modal.Content>
      <Modal.Actions>
        {/* <p>{t('common.enterProjectTitle')}</p> */}
        <Form onSubmit={handleSubmit} className={styles.form}>
          <Input
            fluid
            inverted
            ref={nameField}
            name="name"
            value={data.name}
            readOnly={isSubmitting}
            className={styles.field}
            onChange={handleFieldChange}
          />

          <Button
            inverted
            color="green"
            icon="checkmark"
            content="Prompt"
            floated="right"
            loading={isSubmitting}
            disabled={isSubmitting}
          />
        </Form>
      </Modal.Actions>
    </Modal>
  );
});

AiModal.propTypes = {
  defaultData: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  isSubmitting: PropTypes.bool.isRequired,
  onCreate: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AiModal;
