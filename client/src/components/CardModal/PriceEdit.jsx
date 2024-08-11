import React, { useCallback, useImperativeHandle, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Button, Form, Input } from 'semantic-ui-react';

import styles from './DescriptionEdit.module.scss';

const PriceEdit = React.forwardRef(({ children, defaultValue, onUpdate }, ref) => {
  const [t] = useTranslation();
  const [isOpened, setIsOpened] = useState(false);
  const [value, setValue] = useState(null);

  const open = useCallback(() => {
    setIsOpened(true);
    setValue(defaultValue || NaN);
  }, [defaultValue, setValue]);

  const close = useCallback(() => {
    const cleanValue = Number(value);
    if (cleanValue !== defaultValue) {
      onUpdate(cleanValue.toString());
    }

    setIsOpened(false);
    setValue(null);
  }, [defaultValue, onUpdate, value, setValue]);

  useImperativeHandle(
    ref,
    () => ({
      open,
      close,
    }),
    [open, close],
  );

  const handleChildrenClick = useCallback(() => {
    if (!getSelection().toString()) {
      open();
    }
  }, [open]);

  const handleFieldKeyDown = useCallback(
    (event) => {
      if (event.ctrlKey && event.key === 'Enter') {
        close();
      }
    },
    [close],
  );

  const handleSubmit = useCallback(() => {
    close();
  }, [close]);

  if (!isOpened) {
    return React.cloneElement(children, {
      onClick: handleChildrenClick,
    });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        value={value}
        type="number"
        name="price"
        placeholder="Enter price..."
        className={styles.field}
        onKeyDown={handleFieldKeyDown}
        onChange={(e) => setValue(e.target.value)}
      />
      <div className={styles.controls}>
        <Button positive content={t('action.save')} />
      </div>
    </Form>
  );
});

PriceEdit.propTypes = {
  children: PropTypes.element.isRequired,
  defaultValue: PropTypes.string,
  onUpdate: PropTypes.func.isRequired,
};

PriceEdit.defaultProps = {
  defaultValue: undefined,
};

export default React.memo(PriceEdit);
