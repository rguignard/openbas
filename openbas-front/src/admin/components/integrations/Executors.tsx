import React from 'react';
import { makeStyles } from '@mui/styles';
import { Card, CardContent, Chip, Grid, Typography } from '@mui/material';
import { useFormatter } from '../../../components/i18n';
import { useHelper } from '../../../store';
import useDataLoader from '../../../utils/ServerSideEvent';
import { useAppDispatch } from '../../../utils/hooks';
import type { Executor } from '../../../utils/api-types';
import type { ExecutorHelper } from '../../../actions/executors/executor-helper';
import { fetchExecutors } from '../../../actions/Executor';
import useSearchAnFilter from '../../../utils/SortingFiltering';
import SearchFilter from '../../../components/SearchFilter';
import type { Theme } from '../../../components/Theme';
import Breadcrumbs from '../../../components/Breadcrumbs';

const useStyles = makeStyles((theme: Theme) => ({
  parameters: {
    marginTop: -3,
  },
  card: {
    position: 'relative',
    overflow: 'hidden',
    height: 180,
  },
  content: {
    padding: 20,
  },
  icon: {
    padding: 0,
  },
  chipInList: {
    marginTop: 10,
    fontSize: 12,
    height: 20,
    textTransform: 'uppercase',
    borderRadius: 4,
  },
  dotGreen: {
    height: 15,
    width: 15,
    backgroundColor: theme.palette.success.main,
    borderRadius: '50%',
  },
}));

const Executors = () => {
  // Standard hooks
  const { t, nsdt } = useFormatter();
  const classes = useStyles();
  const dispatch = useAppDispatch();

  // Filter and sort hook
  const searchColumns = ['name', 'description'];
  const filtering = useSearchAnFilter(
    'executor',
    'name',
    searchColumns,
  );

  // Fetching data
  const { executors } = useHelper((helper: ExecutorHelper) => ({
    executors: helper.getExecutors(),
  }));
  useDataLoader(() => {
    dispatch(fetchExecutors());
  });
  const sortedExecutors = filtering.filterAndSort(executors);
  return (
    <>
      <Breadcrumbs variant="list" elements={[{ label: t('Integrations') }, { label: t('Executors'), current: true }]} />
      <div className={classes.parameters}>
        <div style={{ float: 'left', marginRight: 10 }}>
          <SearchFilter
            variant="small"
            onChange={filtering.handleSearch}
            keyword={filtering.keyword}
          />
        </div>
      </div>
      <div className="clearfix" />
      <Grid container={true} spacing={3}>
        {sortedExecutors.map((executor: Executor) => {
          return (
            <Grid key={executor.executor_id} item={true} xs={3}>
              <Card classes={{ root: classes.card }} variant="outlined">
                <CardContent className={classes.content}>
                  <div style={{ display: 'flex' }}>
                    <div className={classes.icon}>
                      <img
                        src={`/api/images/executors/${executor.executor_type}`}
                        alt={executor.executor_type}
                        style={{ width: 50, height: 50, borderRadius: 4 }}
                      />
                    </div>
                    <Typography
                      variant="h1"
                      style={{
                        margin: '14px 0 0 10px',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {executor.executor_name}
                    </Typography>
                  </div>
                  <Chip
                    variant="outlined"
                    classes={{ root: classes.chipInList }}
                    style={{ width: 120 }}
                    color='secondary'
                    label={t('Built-in')}
                  />
                  <div style={{ display: 'flex', marginTop: 30 }}>
                    <div className={classes.dotGreen} />
                    <Typography
                      variant="h4"
                      style={{
                        margin: '1px 0 0 10px',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {t('Updated at')} {nsdt(executor.executor_updated_at)}
                    </Typography>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default Executors;