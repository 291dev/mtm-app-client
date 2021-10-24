import { ArrowLeft } from "@mui/icons-material"
import { DateTimePicker, LocalizationProvider } from "@mui/lab"
import { ChangeEvent } from "react"
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { TextField } from "@mui/material";

export type InlineCalenarProp = {
  date: Date | null | undefined,
  onChange: (date: Date | null) => void
  onError: (isErr: boolean) => void
  label: string,
}

export const InlineCalendar = (props: InlineCalenarProp) => {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateTimePicker
          value={props.date}
          onChange={props.onChange}
          inputFormat="yyyy/MM/dd HH:mm"
          label={props.label}
          onError={((e) => {
            if (e) {
              props.onError(true)
            } else {
              props.onError(false)
            }
          })}
          renderInput={(params) => <TextField {...params} />} />
      </LocalizationProvider>
    </>
  )
}