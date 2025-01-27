import React from 'react';
import * as PropTypes from 'prop-types';
import { Form } from 'react-final-form';
import { Button } from '@mui/material';
import { useFormatter } from '../../../../../components/i18n';
import AttackPatternField from '../../../../../components/AttackPatternField';

const InjectorContractForm = (props) => {
  const { onSubmit, initialValues, editing, handleClose } = props;
  const { t } = useFormatter();
  return (
    <Form
      keepDirtyOnReinitialize={true}
      initialValues={initialValues}
      onSubmit={onSubmit}
      mutators={{
        setValue: ([field, value], state, { changeValue }) => {
          changeValue(state, field, () => value);
        },
      }}
    >
      {({ handleSubmit, form, values, submitting, pristine }) => (
        <form id="injectorContractForm" onSubmit={handleSubmit}>
          <AttackPatternField
            name="injector_contract_attack_patterns"
            label={t('Attack patterns')}
            values={values}
            setFieldValue={form.mutators.setValue}
          />
          <div style={{ float: 'right', marginTop: 20 }}>
            <Button
              onClick={handleClose}
              style={{ marginRight: 10 }}
              disabled={submitting}
            >
              {t('Cancel')}
            </Button>
            <Button
              color="secondary"
              type="submit"
              disabled={pristine || submitting}
            >
              {editing ? t('Update') : t('Create')}
            </Button>
          </div>
        </form>
      )}
    </Form>
  );
};

InjectorContractForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  handleClose: PropTypes.func,
  editing: PropTypes.bool,
};

export default InjectorContractForm;
