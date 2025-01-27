import { Dispatch } from 'redux';
import { delReferential, getReferential, postReferential, putReferential, simpleCall, simplePostCall } from '../../utils/Action';
import { arrayOfScenarios, scenario } from './scenario-schema';
import type {
  Scenario,
  ScenarioInformationInput,
  ScenarioInput,
  ScenarioRecurrenceInput,
  ScenarioTeamPlayersEnableInput,
  ScenarioUpdateTagsInput,
  ScenarioUpdateTeamsInput,
  SearchPaginationInput,
  Team,
} from '../../utils/api-types';
import * as schema from '../Schema';

const SCENARIO_URI = '/api/scenarios';

export const addScenario = (data: ScenarioInput) => (dispatch: Dispatch) => {
  return postReferential(scenario, SCENARIO_URI, data)(dispatch);
};

export const fetchScenarios = () => (dispatch: Dispatch) => {
  return getReferential(arrayOfScenarios, SCENARIO_URI)(dispatch);
};

export const searchScenarios = (paginationInput: SearchPaginationInput) => {
  const data = paginationInput;
  const uri = '/api/scenarios/search';
  return simplePostCall(uri, data);
};

export const fetchScenario = (scenarioId: string) => (dispatch: Dispatch) => {
  const uri = `${SCENARIO_URI}/${scenarioId}`;
  return getReferential(scenario, uri)(dispatch);
};

export const updateScenario = (
  scenarioId: Scenario['scenario_id'],
  data: ScenarioInput,
) => (dispatch: Dispatch) => {
  const uri = `${SCENARIO_URI}/${scenarioId}`;
  return putReferential(scenario, uri, data)(dispatch);
};

export const updateScenarioInformation = (
  scenarioId: Scenario['scenario_id'],
  data: ScenarioInformationInput,
) => (dispatch: Dispatch) => {
  const uri = `${SCENARIO_URI}/${scenarioId}/information`;
  return putReferential(scenario, uri, data)(dispatch);
};

export const deleteScenario = (scenarioId: Scenario['scenario_id']) => (dispatch: Dispatch) => {
  const uri = `${SCENARIO_URI}/${scenarioId}`;
  return delReferential(uri, scenario.key, scenarioId)(dispatch);
};

export const exportScenarioUri = (scenarioId: Scenario['scenario_id'], exportTeams: boolean, exportPlayers: boolean, exportVariableValues: boolean) => {
  return `${SCENARIO_URI}/${scenarioId}/export?isWithTeams=${exportTeams}&isWithPlayers=${exportPlayers}&isWithVariableValues=${exportVariableValues}`;
};

export const importScenario = (formData: FormData) => (dispatch: Dispatch) => {
  const uri = `${SCENARIO_URI}/import`;
  return postReferential(null, uri, formData)(dispatch);
};

// -- TAGS --

export const updateScenarioTags = (scenarioId: Scenario['scenario_id'], data: ScenarioUpdateTagsInput) => {
  const uri = `${SCENARIO_URI}/${scenarioId}/tags`;
  return putReferential(scenario, uri, data);
};

// -- TEAMS --

export const fetchScenarioTeams = (scenarioId: Scenario['scenario_id']) => (dispatch: Dispatch) => {
  const uri = `/api/scenarios/${scenarioId}/teams`;
  return getReferential(schema.arrayOfTeams, uri)(dispatch);
};

export const addScenarioTeams = (scenarioId: Scenario['scenario_id'], data: ScenarioUpdateTeamsInput) => (dispatch: Dispatch) => putReferential(
  schema.arrayOfTeams,
  `/api/scenarios/${scenarioId}/teams/add`,
  data,
)(dispatch);

export const removeScenarioTeams = (scenarioId: Scenario['scenario_id'], data: ScenarioUpdateTeamsInput) => (dispatch: Dispatch) => putReferential(
  schema.arrayOfTeams,
  `/api/scenarios/${scenarioId}/teams/remove`,
  data,
)(dispatch);

export const enableScenarioTeamPlayers = (scenarioId: Scenario['scenario_id'], teamId: Team['team_id'], data: ScenarioTeamPlayersEnableInput) => (dispatch: Dispatch) => putReferential(
  scenario,
  `/api/scenarios/${scenarioId}/teams/${teamId}/players/enable`,
  data,
)(dispatch);

export const disableScenarioTeamPlayers = (scenarioId: Scenario['scenario_id'], teamId: Team['team_id'], data: ScenarioTeamPlayersEnableInput) => (dispatch: Dispatch) => putReferential(
  scenario,
  `/api/scenarios/${scenarioId}/teams/${teamId}/players/disable`,
  data,
)(dispatch);

export const addScenarioTeamPlayers = (scenarioId: Scenario['scenario_id'], teamId: Team['team_id'], data: ScenarioTeamPlayersEnableInput) => (dispatch: Dispatch) => putReferential(
  scenario,
  `/api/scenarios/${scenarioId}/teams/${teamId}/players/add`,
  data,
)(dispatch);

export const removeScenarioTeamPlayers = (scenarioId: Scenario['scenario_id'], teamId: Team['team_id'], data: ScenarioTeamPlayersEnableInput) => (dispatch: Dispatch) => putReferential(
  scenario,
  `/api/scenarios/${scenarioId}/teams/${teamId}/players/remove`,
  data,
)(dispatch);

// -- EXERCISES --

export const fetchScenarioExercises = (scenarioId: Scenario['scenario_id']) => (dispatch: Dispatch) => {
  const uri = `/api/scenarios/${scenarioId}/exercises`;
  return getReferential(schema.arrayOfExercises, uri)(dispatch);
};

// -- RECURRENCE --

export const updateScenarioRecurrence = (
  scenarioId: Scenario['scenario_id'],
  data: ScenarioRecurrenceInput,
) => (dispatch: Dispatch) => {
  const uri = `${SCENARIO_URI}/${scenarioId}/recurrence`;
  return putReferential(scenario, uri, data)(dispatch);
};

// -- STATISTIC --

export const fetchScenarioStatistic = () => {
  const uri = `${SCENARIO_URI}/statistics`;
  return simpleCall(uri);
};
