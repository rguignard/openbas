import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import EnterpriseEditionAgreement from './EnterpriseEditionAgreement';
import type { Theme } from '../../../../components/Theme';
import useEnterpriseEdition from '../../../../utils/hooks/useEnterpriseEdition';
import { useHelper } from '../../../../store';
import type { UsersHelper } from '../../../../actions/helper';

// Deprecated - https://mui.com/system/styles/basics/
// Do not use it for new code.
const useStyles = makeStyles<Theme>((theme) => ({
  container: {
    fontSize: 'xx-small',
    height: 14,
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 21,
    margin: 'auto',
    marginLeft: 6,
    borderRadius: theme.borderRadius,
    border: `1px solid ${theme.palette.ee.main}`,
    color: theme.palette.ee.main,
    backgroundColor: theme.palette.ee.background,
    cursor: 'pointer',
  },
  containerFloating: {
    float: 'left',
    fontSize: 'xx-small',
    height: 14,
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 21,
    margin: '2px 0 0 6px',
    borderRadius: theme.borderRadius,
    border: `1px solid ${theme.palette.ee.main}`,
    color: theme.palette.ee.main,
    backgroundColor: theme.palette.ee.background,
    cursor: 'pointer',
  },
}));

const EEChip = ({ clickable = true, floating = false }: { clickable?: boolean, floating?: boolean }) => {
  const classes = useStyles();
  const isEnterpriseEdition = useEnterpriseEdition();
  const [displayDialog, setDisplayDialog] = useState(false);
  const userAdmin = useHelper((helper: UsersHelper) => {
    const me = helper.getMe();
    return me?.user_admin ?? false;
  });
  return (!isEnterpriseEdition && (
    <>
      <div
        className={floating ? classes.containerFloating : classes.container}
        onClick={() => clickable && setDisplayDialog(true)}
      >
        EE
      </div>
      {userAdmin && (
        <EnterpriseEditionAgreement
          open={displayDialog}
          onClose={() => setDisplayDialog(false)}
        />
      )}
    </>
  ));
};

export default EEChip;
