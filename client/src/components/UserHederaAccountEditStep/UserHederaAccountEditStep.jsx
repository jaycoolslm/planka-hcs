import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Button, Form, Message } from 'semantic-ui-react';
import { useDidUpdate, usePrevious, useToggle } from '../../lib/hooks';
import { Input, Popup } from '../../lib/custom-ui';

import { useForm } from '../../hooks';

import styles from './UserHederaAccountEditStep.module.scss';

const createMessage = (error) => {
  if (!error) {
    return error;
  }

  switch (error.message) {
    case 'Invalid current password':
      return {
        type: 'error',
        content: 'common.invalidCurrentPassword',
      };
    default:
      return {
        type: 'warning',
        content: 'common.unknownError',
      };
  }
};

const isHederaAccount = (value) => value.startsWith('0.0.');

const UserHederaAccountEditStep = React.memo(
  ({
    defaultData,
    hederaAccount,
    isSubmitting,
    error,
    usePasswordConfirmation,
    onUpdate,
    onMessageDismiss,
    onBack,
    onClose,
  }) => {
    const [t] = useTranslation();
    const wasSubmitting = usePrevious(isSubmitting);

    const [data, handleFieldChange, setData] = useForm({
      hederaAccount: '',
      currentPassword: '',
      ...defaultData,
    });

    const message = useMemo(() => createMessage(error), [error]);
    const [focusCurrentPasswordFieldState, focusCurrentPasswordField] = useToggle();

    const hederaAccountField = useRef(null);
    const currentPasswordField = useRef(null);

    const handleSubmit = useCallback(() => {
      const cleanData = {
        ...data,
        hederaAccount: data.hederaAccount.trim(),
      };

      if (!isHederaAccount(cleanData.hederaAccount)) {
        hederaAccountField.current.select();
        return;
      }

      if (cleanData.hederaAccount === hederaAccount) {
        onClose();
        return;
      }

      if (usePasswordConfirmation) {
        if (!cleanData.currentPassword) {
          currentPasswordField.current.focus();
          return;
        }
      } else {
        delete cleanData.currentPassword;
      }

      onUpdate(cleanData);
    }, [hederaAccount, usePasswordConfirmation, onUpdate, onClose, data]);

    useEffect(() => {
      hederaAccountField.current.focus({
        preventScroll: true,
      });
    }, []);

    useEffect(() => {
      if (wasSubmitting && !isSubmitting) {
        if (error) {
          switch (error.message) {
            case 'Invalid current password':
              setData((prevData) => ({
                ...prevData,
                currentPassword: '',
              }));
              focusCurrentPasswordField();

              break;
            default:
          }
        } else {
          onClose();
        }
      }
    }, [isSubmitting, wasSubmitting, error, onClose, setData, focusCurrentPasswordField]);

    useDidUpdate(() => {
      currentPasswordField.current.focus();
    }, [focusCurrentPasswordFieldState]);

    return (
      <>
        <Popup.Header onBack={onBack}>
          {t('common.editHederaAccount', {
            context: 'title',
          })}
        </Popup.Header>
        <Popup.Content>
          {message && (
            <Message
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...{
                [message.type]: true,
              }}
              visible
              content={t(message.content)}
              onDismiss={onMessageDismiss}
            />
          )}
          <Form onSubmit={handleSubmit}>
            <div className={styles.text}>{t('common.newHederaAccount')}</div>
            <Input
              fluid
              ref={hederaAccountField}
              name="hederaAccount"
              value={data.hederaAccount}
              placeholder={hederaAccount}
              className={styles.field}
              onChange={handleFieldChange}
            />
            {usePasswordConfirmation && (
              <>
                <div className={styles.text}>{t('common.currentPassword')}</div>
                <Input.Password
                  fluid
                  ref={currentPasswordField}
                  name="currentPassword"
                  value={data.currentPassword}
                  className={styles.field}
                  onChange={handleFieldChange}
                />
              </>
            )}
            <Button
              positive
              content={t('action.save')}
              loading={isSubmitting}
              disabled={isSubmitting}
            />
          </Form>
        </Popup.Content>
      </>
    );
  },
);

UserHederaAccountEditStep.propTypes = {
  defaultData: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  hederaAccount: PropTypes.string.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  error: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  usePasswordConfirmation: PropTypes.bool,
  onUpdate: PropTypes.func.isRequired,
  onMessageDismiss: PropTypes.func.isRequired,
  onBack: PropTypes.func,
  onClose: PropTypes.func.isRequired,
};

UserHederaAccountEditStep.defaultProps = {
  error: undefined,
  usePasswordConfirmation: false,
  onBack: undefined,
};

export default UserHederaAccountEditStep;
