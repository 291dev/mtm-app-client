import { TextField } from '@mui/material';
import { FormProps } from '../interfaces/component/emailProps';

function EmailForm(props: FormProps) {
  return (<>
    <TextField type="email" onChange={props.onChange} label="メールアドレス" fullWidth />
  </>)
}

export default EmailForm;