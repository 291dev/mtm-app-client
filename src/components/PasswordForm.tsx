
import { TextField } from '@mui/material';
import { FormProps } from '../interfaces/component/emailProps';

function PasswordForm(props: FormProps) {
  return (<>
    <TextField type="password" onChange={props.onChange} label="パスワード" fullWidth />
  </>)
}

export default PasswordForm;