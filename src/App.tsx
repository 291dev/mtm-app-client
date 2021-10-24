import React, { useEffect } from 'react';
import './app.scss';
import { LoginForm } from './form/LoginForm';
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom';
import RegisterForm from './form/RegisterForm';
import { Tasks } from './components/tasks/Tasks';
import { useAppDispatch, useAppSelector } from './hooks/storeHooks';
import { getError, initialState } from './reducers/errorReducer';
import { CalendarComponent } from './components/calendar/CalendarComponent';
import { Home } from './components/home/Home';
import ScheduleForm from './components/calendar/ScheduleForm';
import { Alert } from '@mui/material';

function App() {
  const accessToken = useAppSelector(state => state.userInfo.credentials.accessToken)
  const errState = useAppSelector(state => state.error)
  const dispatch = useAppDispatch();
  return (
    <>
      {(errState.statusCode !== 0) &&
        <Alert severity="error" onClose={() => {
          dispatch({
            type: getError.type,
            payload: initialState
          })
        }}>
          {errState.statusCode}: {errState.message}
        </Alert>
      }
      <HashRouter>
        <Switch>
          {accessToken ? <>
            <Route exact path={"/"} render={() => <Redirect to="/login" />} />
            <Route exact path={"/login"} component={LoginForm} />
            <Route exact path={"/signup"} component={RegisterForm} />
            <Route exact path={"/home"} component={Home} />
            <Route exact path={"/tasks"} component={Tasks} />
            <Route exact path={"/calendar"} component={CalendarComponent} />
            <Route exact path={"/calendar/save"} component={ScheduleForm} />
          </> :
            <>
              <Route exact path={"/login"} component={LoginForm} />
              <Route exact path={"/signup"} component={RegisterForm} />
              <Route path={"/"} render={() => <Redirect to="/login" />} />
            </>}
        </Switch>
      </HashRouter>
    </>
  );
}

export default App;
