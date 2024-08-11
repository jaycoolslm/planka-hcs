import React, { useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Button, Form, Modal, Message, Loader } from 'semantic-ui-react';
import { Input } from '../../lib/custom-ui';

import { useForm } from '../../hooks';

import styles from './AiModal.module.scss';

const AiModal = React.memo(
  ({ stateData = { messages: [], isSubmitting: false }, onCreate, onClose }) => {
    const [t] = useTranslation();

    const [data, handleFieldChange] = useForm(() => ({
      messageContent: '',
    }));

    const messageContentField = useRef(null);

    const handleSubmit = useCallback(
      (e) => {
        e.preventDefault();

        const message = {
          role: 'user',
          content: data.messageContent.trim(),
        };

        if (!message.content) {
          messageContentField.current.select();
          return;
        }

        onCreate(message);
        handleFieldChange(undefined, { name: 'messageContent', value: '' });
      },
      [onCreate, data, handleFieldChange],
    );

    useEffect(() => {
      messageContentField.current.focus();
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
          {stateData?.messages.map((item) => (
            <div
              className={
                styles[item.role === 'user' ? 'message-container-right' : 'message-container-left']
              }
              key={item.id}
            >
              <Message floating compact content={`${item.content}`} />
            </div>
          ))}
          {stateData.isSubmitting && (
            <Message floating compact>
              <Loader active size="tiny" inverted />
            </Message>
          )}
        </Modal.Content>
        <Modal.Actions>
          {/* <p>{t('common.enterProjectTitle')}</p> */}
          <Form onSubmit={handleSubmit} className={styles.form}>
            <Input
              fluid
              inverted
              ref={messageContentField}
              name="messageContent"
              value={data.messageContent}
              disabled={stateData.isSubmitting}
              className={styles.field}
              onChange={handleFieldChange}
            />

            <Button
              inverted
              color="green"
              icon="checkmark"
              content="Send"
              floated="right"
              disabled={stateData.isSubmitting}
            />
          </Form>
        </Modal.Actions>
      </Modal>
    );
  },
);

AiModal.propTypes = {
  stateData: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  onCreate: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AiModal;
