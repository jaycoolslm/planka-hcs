import React, { useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Button, Form, Modal, Message } from 'semantic-ui-react';
import { Input } from '../../lib/custom-ui';

import { useForm } from '../../hooks';

import styles from './AiModal.module.scss';

const AiModal = React.memo(({ stateData = { prompts: [] }, onCreate, onClose }) => {
  const [t] = useTranslation();

  const [data, handleFieldChange] = useForm(() => ({
    prompt: '',
  }));

  const promptField = useRef(null);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const cleanData = {
        prompt: data.prompt.trim(),
      };

      if (!cleanData.prompt) {
        promptField.current.select();
        return;
      }

      onCreate(cleanData);
      handleFieldChange(undefined, { name: 'prompt', value: '' });
    },
    [onCreate, data, handleFieldChange],
  );

  useEffect(() => {
    promptField.current.focus();
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
        {stateData?.prompts.map((item) => (
          <div className={styles['message-container-right']} key={item.id}>
            <Message floating compact content={`${item.prompt}`} />
          </div>
        ))}
        <div className={styles['message-container-left']}>
          <Message floating compact content="Some AI Response. Supposedly a long one!" />
        </div>
      </Modal.Content>
      <Modal.Actions>
        {/* <p>{t('common.enterProjectTitle')}</p> */}
        <Form onSubmit={handleSubmit} className={styles.form}>
          <Input
            fluid
            inverted
            ref={promptField}
            name="prompt"
            value={data.prompt}
            className={styles.field}
            onChange={handleFieldChange}
          />

          <Button inverted color="green" icon="checkmark" content="Prompt" floated="right" />
        </Form>
      </Modal.Actions>
    </Modal>
  );
});

AiModal.propTypes = {
  stateData: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  onCreate: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AiModal;
