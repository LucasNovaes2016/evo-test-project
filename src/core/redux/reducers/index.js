import { combineReducers } from 'redux';
import didManagementReducer from './didmanagementreducer';

export default combineReducers({
  did_management_reducer: didManagementReducer,
});
