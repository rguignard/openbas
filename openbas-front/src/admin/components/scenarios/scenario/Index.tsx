import React, { FunctionComponent, lazy, Suspense, useState } from 'react';
import { Link, Route, Routes, useLocation, useParams } from 'react-router-dom';
import { Box, IconButton, Tab, Tabs, Tooltip } from '@mui/material';
import cronstrue from 'cronstrue';
import { makeStyles, useTheme } from '@mui/styles';
import { UpdateOutlined } from '@mui/icons-material';
import Loader from '../../../../components/Loader';
import { errorWrapper } from '../../../../components/Error';
import { useAppDispatch } from '../../../../utils/hooks';
import { useHelper } from '../../../../store';
import type { ScenariosHelper } from '../../../../actions/scenarios/scenario-helper';
import useDataLoader from '../../../../utils/hooks/useDataLoader';
import { fetchScenario } from '../../../../actions/scenarios/scenario-actions';
import NotFound from '../../../../components/NotFound';
import ScenarioHeader from './ScenarioHeader';
import type { ScenarioStore } from '../../../../actions/scenarios/Scenario';
import useScenarioPermissions from '../../../../utils/Scenario';
import { DocumentContext, DocumentContextType, PermissionsContext, PermissionsContextType } from '../../common/Context';
import { useFormatter } from '../../../../components/i18n';
import Breadcrumbs from '../../../../components/Breadcrumbs';
import { parseCron, ParsedCron } from '../../../../utils/Cron';
import type { Theme } from '../../../../components/Theme';

const Scenario = lazy(() => import('./Scenario'));
const ScenarioDefinition = lazy(() => import('./ScenarioDefinition'));
const Injects = lazy(() => import('./injects/ScenarioInjects'));

// eslint-disable-next-line no-underscore-dangle
const _MS_PER_DAY = 1000 * 60 * 60 * 24;

const useStyles = makeStyles(() => ({
  scheduling: {
    display: 'flex',
    margin: '-35px 8px 0 0',
    float: 'right',
    alignItems: 'center',
  },
}));

const IndexScenarioComponent: FunctionComponent<{ scenario: ScenarioStore }> = ({
  scenario,
}) => {
  const { t, nsd, ft, locale } = useFormatter();
  const location = useLocation();
  const theme = useTheme<Theme>();
  const classes = useStyles();
  const permissionsContext: PermissionsContextType = {
    permissions: useScenarioPermissions(scenario.scenario_id),
  };
  const documentContext: DocumentContextType = {
    onInitDocument: () => ({
      document_tags: [],
      document_scenarios: scenario ? [{ id: scenario.scenario_id, label: scenario.scenario_name }] : [],
      document_exercises: [],
    }),
  };
  let tabValue = location.pathname;
  if (location.pathname.includes(`/admin/scenarios/${scenario.scenario_id}/definition`)) {
    tabValue = `/admin/scenarios/${scenario.scenario_id}/definition`;
  }
  const [openScenarioRecurringFormDialog, setOpenScenarioRecurringFormDialog] = useState<boolean>(false);
  const [selectRecurring, setSelectRecurring] = useState('noRepeat');
  const [cronExpression, setCronExpression] = useState<string | null>(scenario.scenario_recurrence || null);
  const [parsedCronExpression, setParsedCronExpression] = useState<ParsedCron | null>(scenario.scenario_recurrence ? parseCron(scenario.scenario_recurrence) : null);
  const noRepeat = scenario.scenario_recurrence_end && scenario.scenario_recurrence_start
      && new Date(scenario.scenario_recurrence_end).getTime() - new Date(scenario.scenario_recurrence_start).getTime() <= _MS_PER_DAY
      && ['noRepeat', 'daily'].includes(selectRecurring);
  const getHumanReadableScheduling = () => {
    if (!cronExpression || !parsedCronExpression) {
      return null;
    }
    let sentence = '';
    if (noRepeat) {
      sentence = `${nsd(scenario.scenario_recurrence_start)} ${t('recurrence_at')} ${ft(new Date().setUTCHours(parsedCronExpression.h, parsedCronExpression.m))}`;
    } else {
      sentence = cronstrue.toString(cronExpression, {
        verbose: true,
        tzOffset: -new Date().getTimezoneOffset() / 60,
        locale,
      });
      if (scenario.scenario_recurrence_end) {
        sentence += ` ${t('recurrence_from')} ${nsd(scenario.scenario_recurrence_start)}`;
        sentence += ` ${t('recurrence_to')} ${nsd(scenario.scenario_recurrence_end)}`;
      } else {
        sentence += ` ${t('recurrence_starting_from')} ${nsd(scenario.scenario_recurrence_start)}`;
      }
    }
    return sentence;
  };
  return (
    <PermissionsContext.Provider value={permissionsContext}>
      <DocumentContext.Provider value={documentContext}>
        <>
          <Breadcrumbs
            variant="list"
            elements={[
              { label: t('Scenarios'), link: '/admin/scenarios' },
              { label: scenario.scenario_name, current: true },
            ]}
          />
          <ScenarioHeader
            setCronExpression={setCronExpression}
            setParsedCronExpression={setParsedCronExpression}
            setSelectRecurring={setSelectRecurring}
            selectRecurring={selectRecurring}
            setOpenScenarioRecurringFormDialog={setOpenScenarioRecurringFormDialog}
            openScenarioRecurringFormDialog={openScenarioRecurringFormDialog}
            noRepeat={noRepeat}
          />
          <Box
            sx={{
              borderBottom: 1,
              borderColor: 'divider',
              marginBottom: 4,
            }}
          >
            <Tabs value={tabValue}>
              <Tab
                component={Link}
                to={`/admin/scenarios/${scenario.scenario_id}`}
                value={`/admin/scenarios/${scenario.scenario_id}`}
                label={t('Overview')}
              />
              <Tab
                component={Link}
                to={`/admin/scenarios/${scenario.scenario_id}/definition`}
                value={`/admin/scenarios/${scenario.scenario_id}/definition`}
                label={t('Definition')}
              />
              <Tab
                component={Link}
                to={`/admin/scenarios/${scenario.scenario_id}/injects`}
                value={`/admin/scenarios/${scenario.scenario_id}/injects`}
                label={t('Injects')}
              />
            </Tabs>
            <div className={classes.scheduling}>
              {!cronExpression && (
                <IconButton size="small" style={{ cursor: 'default', marginRight: 5 }} disabled={true}>
                  <UpdateOutlined />
                </IconButton>
              )}
              {cronExpression && !scenario.scenario_recurrence && (
                <IconButton size="small" style={{ cursor: 'default', marginRight: 5 }}>
                  <UpdateOutlined />
                </IconButton>
              )}
              {cronExpression && scenario.scenario_recurrence && (
                <Tooltip title={(t('Modify the scheduling'))}>
                  <IconButton size="small" onClick={() => setOpenScenarioRecurringFormDialog(true)} style={{ marginRight: 5 }}>
                    <UpdateOutlined color="primary" />
                  </IconButton>
                </Tooltip>
              )}
              <span style={{ color: theme.palette.text?.disabled }}>{!cronExpression && t('Not scheduled')}</span>
              {cronExpression && <span>{getHumanReadableScheduling()}</span>}
            </div>
          </Box>
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="" element={errorWrapper(Scenario)({ setOpenScenarioRecurringFormDialog })} />
              <Route path="definition" element={errorWrapper(ScenarioDefinition)()}/>
              <Route path="injects" element={errorWrapper(Injects)()} />
              {/* Not found */}
              <Route path="*" element={<NotFound/>}/>
            </Routes>
          </Suspense>
        </>
      </DocumentContext.Provider>
    </PermissionsContext.Provider>
  );
};

const Index = () => {
  // Standard hooks
  const dispatch = useAppDispatch();
  // Fetching data
  const { scenarioId } = useParams() as { scenarioId: ScenarioStore['scenario_id'] };
  const scenario = useHelper((helper: ScenariosHelper) => helper.getScenario(scenarioId));
  useDataLoader(() => {
    dispatch(fetchScenario(scenarioId));
  });
  if (scenario) {
    return <IndexScenarioComponent scenario={scenario} />;
  }
  return <Loader />;
};

export default Index;
