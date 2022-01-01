import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as R from 'ramda';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Button from '@mui/material/Button';
import Slide from '@mui/material/Slide';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import { MoreVert, PersonOutlined } from '@mui/icons-material';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import withStyles from '@mui/styles/withStyles';
import { ListItemIcon } from '@mui/material';
import Grid from '@mui/material/Grid';
import {
  fetchGroup,
  deleteGroup,
  updateGroupUsers,
  updateGroupInformation,
} from '../../../../actions/Group';
import { addGrant, deleteGrant } from '../../../../actions/Grant';
import GroupForm from './GroupForm';
import SearchFilter from '../../../../components/SearchFilter';
import inject18n from '../../../../components/i18n';
import { storeBrowser } from '../../../../actions/Schema';

const styles = () => ({
  box: {
    width: '100%',
    padding: 20,
    border: '1px dashed rgba(255, 255, 255, 0.15)',
  },
  chip: {
    margin: '0 10px 10px 0',
  },
  tableHeader: {
    borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
  },
  tableCell: {
    borderTop: '1px solid rgba(255, 255, 255, 0.15)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
  },
});

const Transition = React.forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));
Transition.displayName = 'TransitionSlide';

class GroupPopover extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openDelete: false,
      openEdit: false,
      openUsers: false,
      openGrants: false,
      openPopover: false,
      keyword: '',
      usersIds: props.groupUsersIds,
    };
  }

  handlePopoverOpen(event) {
    this.setState({ anchorEl: event.currentTarget });
  }

  handlePopoverClose() {
    this.setState({ anchorEl: null });
  }

  handleOpenEdit() {
    this.setState({ openEdit: true });
    this.handlePopoverClose();
  }

  handleCloseEdit() {
    this.setState({ openEdit: false });
  }

  onSubmitEdit(data) {
    this.props
      .updateGroupInformation(this.props.group.group_id, data)
      .then(() => {
        this.setState({ openEdit: false });
      });
  }

  handleOpenUsers() {
    this.setState({ openUsers: true, usersIds: this.props.groupUsersIds });
    this.handlePopoverClose();
  }

  handleSearchUsers(value) {
    this.setState({ keyword: value });
  }

  addUser(userId) {
    this.setState({ usersIds: R.append(userId, this.state.usersIds) });
  }

  removeUser(userId) {
    this.setState({
      usersIds: R.filter((u) => u !== userId, this.state.usersIds),
    });
  }

  handleCloseUsers() {
    this.setState({ openUsers: false, keyword: '' });
  }

  submitAddUsers() {
    this.props.updateGroupUsers(this.props.group.group_id, {
      group_users: this.state.usersIds,
    });
    this.handleCloseUsers();
  }

  handleOpenGrants() {
    this.setState({ openGrants: true });
    this.handlePopoverClose();
  }

  handleCloseGrants() {
    this.setState({ openGrants: false });
  }

  handleGrantCheck(exerciseId, grantId, grantName, event) {
    const isChecked = event.target.checked;
    if (isChecked) {
      this.props
        .addGrant(this.props.group.group_id, {
          grant_name: grantName,
          grant_exercise: exerciseId,
        })
        .then(() => {
          this.props.fetchGroup(this.props.group.group_id);
        });
    }
    // the grand does not exist
    if (!isChecked && grantId !== null) {
      this.props.deleteGrant(this.props.group.group_id, grantId).then(() => {
        this.props.fetchGroup(this.props.group.group_id);
      });
    }
  }

  handleOpenDelete() {
    this.setState({ openDelete: true });
    this.handlePopoverClose();
  }

  handleCloseDelete() {
    this.setState({ openDelete: false });
  }

  submitDelete() {
    this.props.deleteGroup(this.props.group.group_id);
    this.handleCloseDelete();
  }

  render() {
    const { classes, t, users } = this.props;
    const initialValues = R.pick(
      ['group_name', 'group_description'],
      this.props.group,
    );
    const { keyword } = this.state;
    const filterByKeyword = (n) => keyword === ''
      || n.user_email.toLowerCase().indexOf(keyword.toLowerCase()) !== -1
      || n.user_firstname.toLowerCase().indexOf(keyword.toLowerCase()) !== -1
      || n.user_lastname.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
    const filteredUsers = R.filter(filterByKeyword, users);
    return (
      <div>
        <IconButton
          onClick={this.handlePopoverOpen.bind(this)}
          aria-haspopup="true"
          size="large"
        >
          <MoreVert />
        </IconButton>
        <Menu
          anchorEl={this.state.anchorEl}
          open={Boolean(this.state.anchorEl)}
          onClose={this.handlePopoverClose.bind(this)}
        >
          <MenuItem onClick={this.handleOpenEdit.bind(this)}>
            {t('Update')}
          </MenuItem>
          <MenuItem onClick={this.handleOpenUsers.bind(this)}>
            {t('Manage users')}
          </MenuItem>
          <MenuItem onClick={this.handleOpenGrants.bind(this)}>
            {t('Manage grants')}
          </MenuItem>
          <MenuItem onClick={this.handleOpenDelete.bind(this)}>
            {t('Delete')}
          </MenuItem>
        </Menu>
        <Dialog
          open={this.state.openDelete}
          TransitionComponent={Transition}
          onClose={this.handleCloseDelete.bind(this)}
          fullWidth={true}
          maxWidth="md"
        >
          <DialogContent>
            <DialogContentText>
              {t('Do you want to delete this group?')}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              color="secondary"
              onClick={this.handleCloseDelete.bind(this)}
            >
              {t('Cancel')}
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={this.submitDelete.bind(this)}
            >
              {t('Delete')}
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          TransitionComponent={Transition}
          open={this.state.openEdit}
          onClose={this.handleCloseEdit.bind(this)}
          fullWidth={true}
          maxWidth="md"
        >
          <DialogTitle>{t('Update the group')}</DialogTitle>
          <DialogContent>
            <GroupForm
              initialValues={initialValues}
              editing={true}
              onSubmit={this.onSubmitEdit.bind(this)}
              handleClose={this.handleCloseEdit.bind(this)}
            />
          </DialogContent>
        </Dialog>
        <Dialog
          open={this.state.openUsers}
          TransitionComponent={Transition}
          onClose={this.handleCloseUsers.bind(this)}
          fullWidth={true}
          maxWidth="md"
          PaperProps={{
            sx: {
              minHeight: '50vh',
              maxHeight: '50vh',
            },
          }}
        >
          <DialogTitle>{t('Manage the users of this group')}</DialogTitle>
          <DialogContent>
            <Grid container={true} spacing={3}>
              <Grid item={true} xs={8}>
                <SearchFilter
                  onChange={this.handleSearchUsers.bind(this)}
                  fullWidth={true}
                />
                <List>
                  {filteredUsers.map((user) => {
                    const disabled = R.find(
                      (userId) => userId === user.user_id,
                      this.state.usersIds,
                    ) !== undefined;
                    const organizationName = R.propOr(
                      '-',
                      'organization_name',
                      user.getOrganization(),
                    );
                    return (
                      <ListItem
                        key={user.user_id}
                        disabled={disabled}
                        button={true}
                        divider={true}
                        dense={true}
                        onClick={this.addUser.bind(this, user.user_id)}
                      >
                        <ListItemIcon>
                          <PersonOutlined />
                        </ListItemIcon>
                        <ListItemText
                          primary={user.user_email}
                          secondary={organizationName}
                        />
                      </ListItem>
                    );
                  })}
                </List>
              </Grid>
              <Grid item={true} xs={4}>
                <Box className={classes.box}>
                  {this.state.usersIds.map((userId) => {
                    const user = this.props.browser.getUser(userId);
                    const userFirstname = R.propOr('-', 'user_firstname', user);
                    const userLastname = R.propOr('-', 'user_lastname', user);
                    const userGravatar = R.propOr('-', 'user_gravatar', user);
                    return (
                      <Chip
                        key={userId}
                        onDelete={this.removeUser.bind(this, userId)}
                        label={`${userFirstname} ${userLastname}`}
                        avatar={<Avatar src={userGravatar} size={32} />}
                        classes={{ root: classes.chip }}
                      />
                    );
                  })}
                </Box>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              color="secondary"
              onClick={this.handleCloseUsers.bind(this)}
            >
              {t('Cancel')}
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={this.submitAddUsers.bind(this)}
            >
              {t('Update')}
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={this.state.openGrants}
          TransitionComponent={Transition}
          onClose={this.handleCloseGrants.bind(this)}
          fullWidth={true}
          maxWidth="md"
        >
          <DialogTitle>{t('Manage grants')}</DialogTitle>
          <DialogContent>
            <Table selectable={false} size="small">
              <TableHead adjustForCheckbox={false} displaySelectAll={false}>
                <TableRow>
                  <TableCell classes={{ root: classes.tableHeader }}>
                    {t('Exercise')}
                  </TableCell>
                  <TableCell
                    classes={{ root: classes.tableHeader }}
                    style={{ textAlign: 'center' }}
                  >
                    {t('Read/Write')}
                  </TableCell>
                  <TableCell
                    classes={{ root: classes.tableHeader }}
                    style={{ textAlign: 'center' }}
                  >
                    {t('Read Only')}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody displayRowCheckbox={false}>
                {this.props.exercises.map((exercise) => {
                  const grantPlanner = R.find(
                    (g) => g.grant_exercise === exercise.exercise_id
                      && g.grant_name === 'PLANNER',
                  )(this.props.group.group_grants);
                  const grantObserver = R.find(
                    (g) => g.grant_exercise === exercise.exercise_id
                      && g.grant_name === 'OBSERVER',
                  )(this.props.group.group_grants);
                  const grantPlannerId = R.propOr(
                    null,
                    'grant_id',
                    grantPlanner,
                  );
                  const grantObserverId = R.propOr(
                    null,
                    'grant_id',
                    grantObserver,
                  );
                  return (
                    <TableRow key={exercise.exercise_id}>
                      <TableCell classes={{ root: classes.tableCell }}>
                        {exercise.exercise_name}
                      </TableCell>
                      <TableCell
                        classes={{ root: classes.tableCell }}
                        style={{ textAlign: 'center' }}
                      >
                        <Checkbox
                          checked={grantPlannerId !== null}
                          onChange={this.handleGrantCheck.bind(
                            this,
                            exercise.exercise_id,
                            grantPlannerId,
                            'PLANNER',
                          )}
                        />
                      </TableCell>
                      <TableCell
                        classes={{ root: classes.tableCell }}
                        style={{ textAlign: 'center' }}
                      >
                        <Checkbox
                          checked={
                            grantObserverId !== null || grantPlannerId !== null
                          }
                          disabled={grantPlannerId !== null}
                          onChange={this.handleGrantCheck.bind(
                            this,
                            exercise.exercise_id,
                            grantObserverId,
                            'OBSERVER',
                          )}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              color="secondary"
              onClick={this.handleCloseGrants.bind(this)}
            >
              {t('Close')}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

GroupPopover.propTypes = {
  t: PropTypes.func,
  group: PropTypes.object,
  fetchGroup: PropTypes.func,
  updateGroupUsers: PropTypes.func,
  updateGroupInformation: PropTypes.func,
  deleteGroup: PropTypes.func,
  addGrant: PropTypes.func,
  deleteGrant: PropTypes.func,
  organizations: PropTypes.array,
  exercises: PropTypes.array,
  users: PropTypes.array,
  groupUsersIds: PropTypes.array,
};

const select = (state) => {
  const browser = storeBrowser(state);
  const users = browser.getUsers();
  const exercises = browser.getExercises();
  const organizations = browser.getOrganizations();
  return {
    users,
    organizations,
    exercises,
    browser,
  };
};

export default R.compose(
  connect(select, {
    fetchGroup,
    updateGroupInformation,
    updateGroupUsers,
    deleteGroup,
    addGrant,
    deleteGrant,
  }),
  inject18n,
  withStyles(styles),
)(GroupPopover);