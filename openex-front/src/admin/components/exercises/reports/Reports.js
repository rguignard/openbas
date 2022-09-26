import React from 'react';
import { makeStyles } from '@mui/styles';
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import { ChevronRightOutlined, SchoolOutlined } from '@mui/icons-material';
import SearchFilter from '../../../../components/SearchFilter';
import { fetchLessonsTemplates } from '../../../../actions/Lessons';
import useDataLoader from '../../../../utils/ServerSideEvent';
import { useHelper } from '../../../../store';
import useSearchAnFilter from '../../../../utils/SortingFiltering';
import ResultsMenu from '../ResultsMenu';
import CreateReport from './CreateReport';

const useStyles = makeStyles((theme) => ({
  container: {
    margin: '10px 0 50px 0',
    padding: '0 100px 0 0',
  },
  parameters: {
    marginTop: -10,
  },
  itemHead: {
    paddingLeft: 10,
    textTransform: 'uppercase',
    cursor: 'pointer',
  },
  item: {
    paddingLeft: 10,
    height: 50,
  },
  bodyItem: {
    height: '100%',
    fontSize: 13,
  },
  itemIcon: {
    color: theme.palette.primary.main,
  },
  goIcon: {
    position: 'absolute',
    right: -10,
  },
  inputLabel: {
    float: 'left',
  },
  sortIcon: {
    float: 'left',
    margin: '-5px 0 0 15px',
  },
  icon: {
    color: theme.palette.primary.main,
  },
}));

const headerStyles = {
  iconSort: {
    position: 'absolute',
    margin: '0 0 0 5px',
    padding: 0,
    top: '0px',
  },
  report_name: {
    float: 'left',
    width: '25%',
    fontSize: 12,
    fontWeight: '700',
  },
  report_description: {
    float: 'left',
    width: '50%',
    fontSize: 12,
    fontWeight: '700',
  },
};

const inlineStyles = {
  report_name: {
    float: 'left',
    width: '25%',
    height: 20,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  report_description: {
    float: 'left',
    width: '50%',
    height: 20,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
};

const Reports = () => {
  // Standard hooks
  const classes = useStyles();
  const dispatch = useDispatch();
  const { exerciseId } = useParams();
  // Filter and sort hook
  const searchColumns = ['name', 'description'];
  const filtering = useSearchAnFilter('report', 'name', searchColumns);
  // Fetching data
  const { reports } = useHelper((helper) => ({
    reports: helper.getExerciseReports(exerciseId),
  }));
  useDataLoader(() => {
    dispatch(fetchLessonsTemplates());
  });
  const sortedReports = filtering.filterAndSort(reports);
  return (
    <div className={classes.container}>
      <ResultsMenu exerciseId={exerciseId} />
      <div className={classes.parameters}>
        <div style={{ float: 'left', marginRight: 20 }}>
          <SearchFilter
            small={true}
            onChange={filtering.handleSearch}
            keyword={filtering.keyword}
          />
        </div>
      </div>
      <div className="clearfix" />
      <List style={{ marginTop: 10 }}>
        <ListItem
          classes={{ root: classes.itemHead }}
          divider={false}
          style={{ paddingTop: 0 }}
        >
          <ListItemIcon>
            <span
              style={{ padding: '0 8px 0 8px', fontWeight: 700, fontSize: 12 }}
            >
              &nbsp;
            </span>
          </ListItemIcon>
          <ListItemText
            primary={
              <div>
                {filtering.buildHeader(
                  'report_name',
                  'Name',
                  true,
                  headerStyles,
                )}
                {filtering.buildHeader(
                  'report_description',
                  'Description',
                  true,
                  headerStyles,
                )}
              </div>
            }
          />
          <ListItemSecondaryAction>&nbsp;</ListItemSecondaryAction>
        </ListItem>
        {sortedReports.map((report) => {
          return (
            <ListItem
              key={report.report_id}
              classes={{ root: classes.item }}
              divider={true}
              button={true}
              component={Link}
              to={`/admin/reports/${report.report_id}`}
            >
              <ListItemIcon>
                <SchoolOutlined color="primary" />
              </ListItemIcon>
              <ListItemText
                primary={
                  <div>
                    <div
                      className={classes.bodyItem}
                      style={inlineStyles.lessons_template_name}
                    >
                      {report.report_name}
                    </div>
                    <div
                      className={classes.bodyItem}
                      style={inlineStyles.lessons_template_description}
                    >
                      {report.report_description}
                    </div>
                  </div>
                }
              />
              <ListItemSecondaryAction>
                <ChevronRightOutlined />
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
      <CreateReport />
    </div>
  );
};

export default Reports;
