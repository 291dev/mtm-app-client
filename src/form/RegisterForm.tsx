import { useEffect, useState } from "react";
import _ from 'lodash';
import SubMitBtn from "../components/SubMitBtn";
import { TextInput } from "../components/TextInput";
import { useRegister } from "../ext/authapi";
import { UserRegisterReq } from "../interfaces/extapi/userInfo"
import { useHistory } from "react-router";
import { Alert, FormGroup } from "@mui/material";
import { Box } from "@mui/system";
const RegisterForm = () => {
  const { email, setEmail, err: errEmail } = useEmailCheck()
  const { password, setPassword, err: errPw } = usePasswordCheck()
  const { firstName, setFirstName, err: errFirst } = useFirstNameCheck();
  const [lastName, setLastName] = useState("")
  const { tel, setTel, err: errTel } = useTelCheck();
  const [submitable, setSubmitable] = useState(false)
  const { registerAction, success, loading, error } = useRegister();
  const history = useHistory();

  const onRegister = () => {
    const req: UserRegisterReq = {
      firstName: firstName,
      lastName: lastName,
      password: password,
      email: email,
      telephoneNumber: tel,
    }
    registerAction(req);
  }

  const onRegistered = () => {
    history.push('/login')
  }

  useEffect(
    () => {
      console.log("callbacked!.")
      return setSubmitable(!errEmail && !errPw && !errFirst && !errTel);
    },
    [errEmail, errPw, errFirst, errTel]
  )
  return (
    <>
      {success && <Alert>Confirmation mail sent.</Alert>
      }
      <Box sx={{
        minWidth: 100,
        maxWidth: 400,
        margin: 'auto'
      }}>
        <FormGroup style={{
          paddingLeft: 10,
          paddingRight: 10
        }}>
          <h1 className="title">Sign Up</h1>
          <div className="mg-t-5">
            <TextInput
              type="email"
              error={!_.isEmpty(errEmail)}
              helperText={errEmail}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
              label="Email"
            />
          </div>
          <div className="mg-t-5">
            <TextInput
              type="password"
              error={!_.isEmpty(errPw)}
              helperText={errPw}
              onChange={(e) => {
                setPassword(e.target.value)
              }}
              label="Password"
            />

          </div>
          <div className="mg-t-5">
            <TextInput
              type="text"
              error={!_.isEmpty(errFirst)}
              helperText={errFirst}
              onChange={(e) => {
                setFirstName(e.target.value)
              }}
              label="Firstname"
            />

          </div>
          <div className="mg-t-5">
            <TextInput
              type="text"
              error={false}
              onChange={(e) => {
                setLastName(e.target.value)
              }}
              label="Lastname"
            />

          </div>
          <div className="mg-t-5">
            <TextInput
              type="text"
              error={!_.isEmpty(errTel)}
              helperText={errTel}
              onChange={(e) => {
                setTel(e.target.value)
              }}
              label="Telephone"
            />

          </div>
          <div className="mg-t-5">
            <div className="contents-aline">
              <SubMitBtn
                btnText="Sign Up"
                color="primary"
                disabled={!submitable}
                isLoading={loading}
                onClick={() => {
                  onRegister();
                }}
              />

              <SubMitBtn
                btnText="To Login"
                color="primary"
                disabled={false}
                isLoading={false}
                onClick={() => {
                  onRegistered();
                }}
              />

            </div>
          </div>
        </FormGroup>
      </Box>

    </>
  )
}

const useEmailCheck = () => {
  const [email, setEmail] = useState("");
  const [err, setErr] = useState("");
  useEffect(() => {
    //TODO .envから拾う
    const regex = /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;
    if (!email.match(regex)) {
      setErr("Incorrect email format.")
    } else {
      setErr("")
    }
  }, [email])
  return { email, setEmail, err }
}

const usePasswordCheck = () => {
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  useEffect(() => {
    //TODO .envから拾う
    if (password.length < 8) {
      setErr("Password must be longer than 8.")
    } else {
      setErr("")
    }
  }, [password])
  return { password, setPassword, err }
}

const useFirstNameCheck = () => {
  const [firstName, setFirstName] = useState("");
  const [err, setErr] = useState("");
  useEffect(() => {
    //TODO .envから拾う
    if (firstName.length == 0) {
      setErr("FirstName required.")
    } else {
      setErr("")
    }
  }, [firstName])
  return { firstName, setFirstName, err }
}

const useTelCheck = () => {
  const [tel, setTel] = useState("");
  const [err, setErr] = useState("");
  useEffect(() => {
    //TODO .envから拾う
    if (tel.length > 0) {
      const regex = /[0-9]{8,}/
      if (!tel.match(regex)) {
        setErr("Telephone number must be number.")
      } else {
        setErr("")
      }
    } else {
      setErr("")
    }
  }, [tel])
  return { tel, setTel, err }
}



export default RegisterForm;