import React, { FunctionComponent, useContext } from 'react';
import { Form } from 'react-final-form';
import { Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { z } from 'zod';
import TextField from '../../../../components/TextField';
import { useFormatter } from '../../../../components/i18n';
import TagField from '../../../../components/TagField';
import OrganizationField from '../../../../components/OrganizationField';
import type { Theme } from '../../../../components/Theme';
import type { TeamInputForm } from '../../../../actions/teams/Team';
import { schemaValidator } from '../../../../utils/Zod';
import CheckboxField from '../../../../components/CheckboxField';
import { TeamContext, TeamContextType } from '../Context';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: 'flex',
    gap: theme.spacing(2),
    placeContent: 'end',
  },
}));

interface TeamFormProps {
  initialValues: Partial<TeamInputForm>;
  handleClose: () => void;
  onSubmit: (data: TeamInputForm) => void;
  editing?: boolean;
}

const TeamForm: FunctionComponent<TeamFormProps> = ({
  editing,
  onSubmit,
  initialValues,
  handleClose,
}) => {
  const classes = useStyles();
  const { t } = useFormatter();
  const { onCreateTeam } = useContext<TeamContextType>(TeamContext);
  const teamFormSchemaValidation = z.object({
    team_name: z.string().min(2, t('This field is mandatory')),
  });
  return (
    <Form
      keepDirtyOnReinitialize={true}
      initialValues={initialValues}
      onSubmit={onSubmit}
      validate={schemaValidator(teamFormSchemaValidation)}
      mutators={{
        setValue: ([field, value], state, { changeValue }) => {
          changeValue(state, field, () => value);
        },
      }}
    >
      {({ handleSubmit, form, values, submitting, pristine }) => (
        <form id="teamForm" onSubmit={handleSubmit}>
          <TextField
            variant="standard"
            name="team_name"
            fullWidth={true}
            label={t('Name')}
          />
          <TextField
            variant="standard"
            name="team_description"
            fullWidth={true}
            label={t('Description')}
            style={{ marginTop: 20 }}
          />
          <OrganizationField
            name="team_organization"
            values={values}
            setFieldValue={form.mutators.setValue}
          />
          <TagField
            name="team_tags"
            label={t('Tags')}
            values={values}
            setFieldValue={form.mutators.setValue}
            style={{ marginTop: 20 }}
          />
          {/* check if we are not editing and we have a onCreateTeam function in context */}
          {!editing && onCreateTeam && (
            <CheckboxField
              name="team_contextual"
              label={t('Only in this context')}
              style={{ marginTop: 20 }}
            />
          )}
          <div className={classes.container} style={{ marginTop: 20 }}>
            <Button onClick={handleClose} disabled={submitting}>
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

export default TeamForm;