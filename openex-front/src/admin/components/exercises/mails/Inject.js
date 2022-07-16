import React, { useState } from 'react';
import * as R from 'ramda';
import { makeStyles } from '@mui/styles';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import {
  executeInject,
  fetchExerciseInjects,
} from '../../../../actions/Inject';
import { useFormatter } from '../../../../components/i18n';
import useDataLoader from '../../../../utils/ServerSideEvent';
import { useHelper } from '../../../../store';
import AnimationMenu from '../AnimationMenu';
import Loader from '../../../../components/Loader';
import { fetchInjectCommunications } from '../../../../actions/Communication';
import ItemTags from '../../../../components/ItemTags';
import { fetchPlayers } from '../../../../actions/User';
import Communication from './Communication';
import { Transition } from '../../../../utils/Environment';
import CommunicationForm from './CommunicationForm';
import { addExerciseArticle } from '../../../../actions/Media';

const useStyles = makeStyles(() => ({
  container: {
    margin: '0 0 50px 0',
    padding: '0 200px 0 0',
  },
  paper: {
    position: 'relative',
    padding: '20px 20px 0 20px',
    overflow: 'hidden',
    height: '100%',
  },
  card: {
    margin: '0 0 20px 0',
  },
  cardNested: {
    margin: '0 0 20px 20px',
  },
}));

const Inject = () => {
  // Standard hooks
  const classes = useStyles();
  const dispatch = useDispatch();
  const [reply, setReply] = useState(null);
  const { t, fndt } = useFormatter();
  const { injectId, exerciseId } = useParams();
  // Fetching data
  const { exercise, inject, communications, usersMap } = useHelper((helper) => {
    return {
      exercise: helper.getExercise(exerciseId),
      inject: helper.getInject(injectId),
      communications: helper.getInjectCommunications(injectId),
      usersMap: helper.getUsersMap(),
    };
  });
  useDataLoader(() => {
    dispatch(fetchExerciseInjects(exerciseId));
    dispatch(fetchInjectCommunications(exerciseId, injectId));
    dispatch(fetchPlayers());
  });
  const sortCommunications = R.sortWith([
    R.descend(R.prop('communication_received_at')),
  ]);
  // Rendering
  const handleOpenReply = (communicationId) => setReply(communicationId);
  const handleCloseReply = () => setReply(null);
  const onSubmitReply = (data) => {
    const topic = R.head(
      R.filter((n) => n.communication_id === reply, communications),
    );
    const inputValues = {
      inject_title: 'Manual email',
      inject_description: 'Manual email',
      inject_contract: inject.inject_contract,
      inject_content: {
        subject: data.communication_subject,
        body: data.communication_content,
      },
      inject_users: topic.communication_users,
    };
    return dispatch(executeInject(exerciseId, inputValues)).then(() => handleCloseReply());
  };
  if (inject && communications) {
    // Group communication by subject
    const communicationsWithMails = R.map(
      (n) => R.assoc(
        'communication_mails',
        R.map(
          (o) => (usersMap[o] ? usersMap[o].user_email : '').toLowerCase(),
          n.communication_users,
        ),
        n,
      ),
      communications,
    );
    const topics = R.pipe(
      R.filter((n) => !n.communication_subject.includes('Re: ')),
      R.map((n) => R.assoc(
        'communication_communications',
        sortCommunications(
          R.filter(
            (o) => o.communication_subject
              .toLowerCase()
              .includes(`re: ${n.communication_subject.toLowerCase()}`)
                && R.any(
                  (p) => o.communication_from.includes(p),
                  n.communication_mails,
                ),
            communicationsWithMails,
          ),
        ),
        n,
      )),
    )(communicationsWithMails);
    let defaultSubject = '';
    let defaultContent = '';
    if (reply) {
      const topic = R.head(
        R.filter((n) => n.communication_id === reply, topics),
      );
      defaultSubject = `Re: ${topic.communication_subject}`;
      const lastCommunication = topic.communication_communications.length > 0
        ? R.head(topic.communication_communications)
        : topic;
      defaultContent = `<br /><br />________________________________<br />
From: ${lastCommunication.communication_from
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&ngt;')}<br />
Sent: ${lastCommunication.communication_sent_at}<br />
Subject: ${lastCommunication.communication_subject}<br /><br />
${
  lastCommunication.communication_content
  && lastCommunication.communication_content.length > 10
    ? lastCommunication.communication_content.replaceAll('\n', '<br />')
    : lastCommunication.communication_content_html
}`;
    }
    return (
      <div className={classes.container}>
        <AnimationMenu exerciseId={exerciseId} />
        <Grid container={true} spacing={3}>
          <Grid item={true} xs={6} style={{ marginTop: -10 }}>
            <Typography variant="h4">{t('Inject context')}</Typography>
            <Paper variant="outlined" classes={{ root: classes.paper }}>
              <Grid container={true} spacing={3}>
                <Grid item={true} xs={6}>
                  <Typography variant="h3">{t('Title')}</Typography>
                  {inject.inject_title}
                </Grid>
                <Grid item={true} xs={6}>
                  <Typography variant="h3">{t('Description')}</Typography>
                  {inject.inject_description}
                </Grid>
                <Grid item={true} xs={6}>
                  <Typography variant="h3">{t('Sent at')}</Typography>
                  {fndt(inject.inject_sent_at)}
                </Grid>
                <Grid item={true} xs={6}>
                  <Typography variant="h3">
                    {t('Sender email address')}
                  </Typography>
                  {exercise.exercise_mail_from}
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item={true} xs={6} style={{ marginTop: -10 }}>
            <Typography variant="h4">{t('Inject details')}</Typography>
            <Paper variant="outlined" classes={{ root: classes.paper }}>
              <Grid container={true} spacing={3}>
                <Grid item={true} xs={6}>
                  <Typography variant="h3">{t('Targeted players')}</Typography>
                  {inject.inject_users_number}
                </Grid>
                <Grid item={true} xs={6}>
                  <Typography variant="h3">{t('Tags')}</Typography>
                  <ItemTags tags={inject.inject_tags} />
                </Grid>
                <Grid item={true} xs={6}>
                  <Typography variant="h3">{t('Documents')}</Typography>
                </Grid>
                <Grid item={true} xs={6}>
                  <Typography variant="h3">{t('Audiences')}</Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
        <br />
        <div style={{ marginTop: 40 }}>
          <Typography variant="h4" style={{ float: 'left' }}>
            {t('Mails')}
          </Typography>
          <div className="clearfix" />
          {topics.map((topic) => {
            const topicUsers = topic.communication_users.map(
              (userId) => usersMap[userId] ?? {},
            );
            return (
              <div key={topic.communication_id}>
                <Communication
                  communication={topic}
                  communicationUsers={topicUsers}
                  isTopic={true}
                  handleOpenReply={handleOpenReply}
                />
                {topic.communication_communications.map((communication) => {
                  const communicationUsers = communication.communication_users.map(
                    (userId) => usersMap[userId] ?? {},
                  );
                  return (
                    <Communication
                      key={communication.communication_id}
                      communication={communication}
                      communicationUsers={communicationUsers}
                      isTopic={false}
                      handleOpenReply={handleOpenReply}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
        <Dialog
          open={reply !== null}
          TransitionComponent={Transition}
          onClose={handleCloseReply}
          fullWidth={true}
          maxWidth="md"
          PaperProps={{ elevation: 1 }}
        >
          <DialogTitle>{t('Reply')}</DialogTitle>
          <DialogContent style={{ overflow: 'hidden' }}>
            <CommunicationForm
              initialValues={{
                communication_subject: defaultSubject,
                communication_content: defaultContent,
              }}
              onSubmit={onSubmitReply}
              handleClose={handleCloseReply}
            />
          </DialogContent>
        </Dialog>
      </div>
    );
  }
  return (
    <div className={classes.container}>
      <AnimationMenu exerciseId={exerciseId} />
      <Loader />
    </div>
  );
};

export default Inject;
