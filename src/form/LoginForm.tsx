import React, { useEffect } from 'react';
import { ChangeEvent, useState } from 'react';
import EmailForm from '../components/EmailForm';
import PasswordForm from '../components/PasswordForm';
import SubMitBtn from '../components/SubMitBtn';
import { useLogin } from '../ext/authapi';
import { useAppSelector } from '../hooks/storeHooks';
import { useHistory } from 'react-router';
import { Box } from '@mui/system';
import { FormGroup } from '@mui/material';
export const LoginForm = () => {

  const [emailState, setEmailState] = useState("");
  const [pwState, setPwState] = useState("")
  const { loginAction, loading: loginLoading, error: loginErr } = useLogin();
  const history = useHistory();
  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmailState(e.target.value);
  }
  const accessToken = useAppSelector(state => state.userInfo.credentials.accessToken);
  useEffect(() => {
    if (accessToken) {
      history.push("/home")
    }
  }, [accessToken])

  const onChangePw = (e: ChangeEvent<HTMLInputElement>) => {
    setPwState(e.target.value);
  }

  const onLogin = (e: React.MouseEvent) => {
    loginAction({
      email: emailState,
      password: pwState
    }).then();
  }

  const onSignUp = (e: React.MouseEvent) => {
    history.push("/signup")
  }
  return (
    <>
      <Box sx={{
        minWidth: 100,
        maxWidth: 400,
        margin: 'auto'
      }}>
        <FormGroup sx={{ margin: 1 }}>
          <div className="centering">
            <h3>Welcome to MTM!</h3>
          </div>
          <div className="mg-t-5">
            <EmailForm input={emailState} onChange={onChangeEmail} />
          </div>
          <div className="mg-t-5">
            <PasswordForm input={pwState} onChange={onChangePw} />
          </div>
          <div className="contents-aline mg-t-5">
            <SubMitBtn
              btnText="Sign in"
              isLoading={loginLoading}
              onClick={onLogin}
              color="primary"
              disabled={loginLoading}
            />
            <SubMitBtn
              btnText="Sign up"
              isLoading={false}
              onClick={onSignUp}
              color="primary"
              disabled={loginLoading}
            />
          </div>
        </FormGroup>
      </Box>
    </>
  )
}