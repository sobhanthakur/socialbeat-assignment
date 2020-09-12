import { combineReducers } from "redux";
import alertReducer from './reducers/alertReducer'
import authReducer from './reducers/authReducer'
import cartReducer from './reducers/cartReducer'

export default combineReducers({
    alertReducer,
    authReducer,
    cartReducer
});
