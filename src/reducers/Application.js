import * as Constants from '../constants/ActionTypes';
import {Map} from 'immutable';

export const application = (state = Map(), action) => {
  function mergeFiles() {
    const files = state.getIn(['entities', 'files']) || Map()
    const mergedFiles = files.mergeDeep(action.payload.getIn(['entities', 'files']))
    return mergedFiles;
  }

  function mergeExerciseStatuses() {
    const exercise_statuses = state.getIn(['entities', 'exercise_statuses']) || Map()
    const mergedExerciseStatuses = exercise_statuses.mergeDeep(action.payload.getIn(['entities', 'exercise_statuses']))
    return mergedExerciseStatuses;
  }

  function mergeUsers() {
    const users = state.getIn(['entities', 'users']) || Map()
    const mergedUsers = users.mergeDeep(action.payload.getIn(['entities', 'users']))
    return mergedUsers;
  }

  function mergeTokens() {
    const tokens = state.getIn(['entities', 'tokens']) || Map()
    const mergedTokens = tokens.mergeDeep(action.payload.getIn(['entities', 'tokens']))
    return mergedTokens;
  }

  function mergeExercises() {
    const exercises = state.getIn(['entities', 'exercises']) || Map()
    const mergedExercises = exercises.mergeDeep(action.payload.getIn(['entities', 'exercises']))
    return mergedExercises;
  }

  function mergeAudiences() {
    const audiences = state.getIn(['entities', 'audiences']) || Map()
    const mergedAudiences = audiences.mergeDeep(action.payload.getIn(['entities', 'audiences']))
    return mergedAudiences;
  }

  function mergeEvents() {
    const events = state.getIn(['entities', 'events']) || Map()
    const mergedEvents = events.mergeDeep(action.payload.getIn(['entities', 'events']))
    return mergedEvents;
  }

  function mergeIncidents() {
    const incidents = state.getIn(['entities', 'incidents']) || Map()
    const mergedIncidents = incidents.mergeDeep(action.payload.getIn(['entities', 'incidents']))
    return mergedIncidents;
  }

  function mergeInjects() {
    const injects = state.getIn(['entities', 'injects']) || Map()
    const mergedInjects = injects.mergeDeep(action.payload.getIn(['entities', 'injects']))
    return mergedInjects;
  }

  switch (action.type) {
    case Constants.APPLICATION_LOGIN_SUBMITTED: {
      return state;
    }

    case Constants.APPLICATION_LOGIN_SUCCESS: {
      var result = action.payload.get('result').toString();
      var token = action.payload.getIn(['entities', 'tokens', result]);
      return state.withMutations(function (state) {
        state.set('token', result)
        state.set('user', token.get('token_user').toString())
        state.setIn(['entities', 'users'], mergeUsers())
        state.setIn(['entities', 'tokens'], mergeTokens())
      })
    }

    case Constants.APPLICATION_LOGIN_ERROR: {
      return state.set('token', null);
    }

    case Constants.APPLICATION_LOGOUT_SUCCESS: {
      return state.set('token', null);
    }

    case Constants.APPLICATION_FETCH_EXERCISE_STATUSES_SUCCESS: {
      return state.withMutations(function (state) {
        state.setIn(['entities', 'exercise_statuses'], mergeExerciseStatuses())
        state.setIn(['ui', 'loading'], false)
      })
    }

    case Constants.APPLICATION_FETCH_FILES_SUCCESS: {
      return state.withMutations(function (state) {
        state.setIn(['entities', 'files'], mergeFiles())
        state.setIn(['ui', 'loading'], false)
      })
    }

    case Constants.APPLICATION_ADD_FILE_SUBMITTED: {
      return state.setIn(['ui', 'loading'], true)
    }

    case Constants.APPLICATION_ADD_FILE_SUCCESS: {
      return state.withMutations(function (state) {
        state.setIn(['entities', 'files'], mergeFiles())
        state.setIn(['ui', 'loading'], false)
      })
    }

    case Constants.APPLICATION_FETCH_USERS_SUBMITTED: {
      return state.setIn(['ui', 'loading'], true)
    }

    case Constants.APPLICATION_FETCH_USERS_SUCCESS: {
      return state.withMutations(function (state) {
        state.setIn(['entities', 'users'], mergeUsers())
        state.setIn(['ui', 'loading'], false)
      })
    }

    case Constants.APPLICATION_FETCH_USERS_ERROR: {
      return state.setIn(['ui', 'loading'], false)
    }

    case Constants.APPLICATION_FETCH_EXERCISES_SUBMITTED: {
      return state.setIn(['ui', 'loading'], true)
    }

    case Constants.APPLICATION_FETCH_EXERCISES_SUCCESS: {
      return state.withMutations(function (state) {
        state.setIn(['entities', 'exercises'], mergeExercises())
        state.setIn(['entities', 'exercise_statuses'], mergeExerciseStatuses())
        state.setIn(['ui', 'loading'], false)
      })
    }

    case Constants.APPLICATION_FETCH_EXERCISES_ERROR: {
      return state.setIn(['ui', 'loading'], false)
    }

    case Constants.APPLICATION_FETCH_EXERCISE_SUBMITTED: {
      return state.setIn(['ui', 'loading'], true)
    }

    case Constants.APPLICATION_FETCH_EXERCISE_SUCCESS: {
      return state.withMutations(function (state) {
        state.setIn(['entities', 'exercises'], mergeExercises())
        state.setIn(['entities', 'exercise_statuses'], mergeExerciseStatuses())
        state.setIn(['ui', 'loading'], false)
      })
    }

    case Constants.APPLICATION_FETCH_EXERCISE_ERROR: {
      return state.setIn(['ui', 'loading'], false)
    }

    case Constants.APPLICATION_ADD_EXERCISE_SUBMITTED: {
      return state.setIn(['ui', 'loading'], true)
    }

    case Constants.APPLICATION_ADD_EXERCISE_SUCCESS: {
      return state.withMutations(function (state) {
        state.setIn(['entities', 'exercises'], mergeExercises())
        state.setIn(['ui', 'loading'], false)
      })
    }

    case Constants.APPLICATION_ADD_EXERCISE_ERROR: {
      return state.setIn(['ui', 'loading'], false)
    }

    case Constants.APPLICATION_UPDATE_EXERCISE_SUBMITTED: {
      return state.setIn(['ui', 'loading'], true)
    }

    case Constants.APPLICATION_UPDATE_EXERCISE_SUCCESS: {
      return state.withMutations(function (state) {
        state.setIn(['entities', 'exercises'], mergeExercises())
        state.setIn(['ui', 'loading'], false)
      })
    }

    case Constants.APPLICATION_UPDATE_EXERCISE_ERROR: {
      return state.setIn(['ui', 'loading'], false)
    }

    case Constants.APPLICATION_DELETE_EXERCISE_SUCCESS: {
      return state.deleteIn(['entities', 'exercises', action.payload])
    }

    case Constants.APPLICATION_FETCH_AUDIENCES_SUBMITTED: {
      return state.setIn(['ui', 'loading'], true)
    }

    case Constants.APPLICATION_FETCH_AUDIENCES_SUCCESS: {
      return state.withMutations(function (state) {
        state.setIn(['entities', 'audiences'], mergeAudiences())
        state.setIn(['ui', 'loading'], false)
      })
    }

    case Constants.APPLICATION_FETCH_AUDIENCES_ERROR: {
      return state.setIn(['ui', 'loading'], false)
    }

    case Constants.APPLICATION_FETCH_AUDIENCE_SUBMITTED: {
      return state.setIn(['ui', 'loading'], true)
    }

    case Constants.APPLICATION_FETCH_AUDIENCE_SUCCESS: {
      return state.withMutations(function (state) {
        state.setIn(['entities', 'audiences'], mergeAudiences())
        state.setIn(['ui', 'loading'], false)
      })
    }

    case Constants.APPLICATION_FETCH_AUDIENCE_ERROR: {
      return state.setIn(['ui', 'loading'], false)
    }

    case Constants.APPLICATION_ADD_AUDIENCE_SUBMITTED: {
      return state.setIn(['ui', 'loading'], true)
    }

    case Constants.APPLICATION_ADD_AUDIENCE_SUCCESS: {
      return state.withMutations(function (state) {
        state.setIn(['entities', 'audiences'], mergeAudiences())
        state.setIn(['ui', 'loading'], false)
      })
    }

    case Constants.APPLICATION_ADD_AUDIENCE_ERROR: {
      return state.setIn(['ui', 'loading'], false)
    }

    case Constants.APPLICATION_UPDATE_AUDIENCE_SUBMITTED: {
      return state.setIn(['ui', 'loading'], true)
    }

    case Constants.APPLICATION_UPDATE_AUDIENCE_SUCCESS: {
      return state.withMutations(function (state) {
        state.setIn(['entities', 'audiences'], mergeAudiences())
        state.setIn(['ui', 'loading'], false)
      })
    }

    case Constants.APPLICATION_UPDATE_AUDIENCE_ERROR: {
      return state.setIn(['ui', 'loading'], false)
    }

    case Constants.APPLICATION_DELETE_AUDIENCE_SUCCESS: {
      return state.deleteIn(['entities', 'audiences', action.payload])
    }

    case Constants.APPLICATION_SELECT_AUDIENCE: {
      return state.setIn(['ui', 'states', 'current_audience'], action.payload)
    }

    case Constants.APPLICATION_NAVBAR_LEFT_TOGGLE_SUBMITTED: {
      return state.setIn(['ui', 'navbar_left_open'], !state.getIn(['ui', 'navbar_left_open']))
    }

    case Constants.APPLICATION_NAVBAR_RIGHT_TOGGLE_SUBMITTED: {
      return state.setIn(['ui', 'navbar_right_open'], !state.getIn(['ui', 'navbar_right_open']))
    }

    default: {
      return state;
    }
  }
}

export default application;