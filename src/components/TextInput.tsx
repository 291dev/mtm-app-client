import { FormControl, FormHelperText, TextField } from "@mui/material";
import { ChangeEvent } from "react";

export type TextInputParam = {
  type: string
  defaultValue?: string,
  helperText?: string,
  error: boolean,
  label: string,
  multiline?: boolean
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}


export const TextInput = (props: TextInputParam) => {
  return (
    <>
      <FormControl fullWidth>
        <TextField
          type={props.type}
          defaultValue={props.defaultValue}
          onChange={props.onChange}
          error={props.error}
          label={props.label}
          multiline={props.multiline}
        />
        {props.helperText && <FormHelperText>
          {props.helperText}
        </FormHelperText>}
      </FormControl>
    </>
  )
}