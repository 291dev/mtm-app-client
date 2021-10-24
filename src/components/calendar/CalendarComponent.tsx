import { AddCircle } from "@mui/icons-material";
import { Button, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Theme, Typography } from "@mui/material";
import { Box, SxProps } from "@mui/system";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useScheduleFetch } from "../../ext/scheduleApi";
import { useAppDispatch, useAppSelector } from "../../hooks/storeHooks";
import { ScheduleStore } from "../../interfaces/extapi/schedule";
import { selectSchedule } from "../../reducers/scheduleReducer";
import { MtmToolBar } from "../home/MtmToolBar";
import NextBackBtn from "../nextBackBtn/NextBackBtn";
import './calendar.scss';
import { DaylySchedule } from "./DaylySchedule";

const MAX_DAY = 7;
const MAX_WEEK = 6;
// index
const LAST_MONTH = 11;
const INITIAL_MONTH = 0;
export const CalendarComponent = () => {

  const today = new Date()
  const thisYear = today.getFullYear()
  const thisMonth = today.getMonth()
  const [selectedMonth, setSelectedMonth] = useState(thisMonth)
  const [year, setYear] = useState(thisYear)
  const history = useHistory();

  return (<>
    <MtmToolBar />
    <Box sx={{
      display: "flex",
      justifyContent: "space-around",
    }}>
      <Typography
        variant="h5"
        sx={{
          fontStyle: "italic"
        }}>
        {year}
      </Typography>
      <Typography
        variant="h5">
        {selectedMonth + 1}月
      </Typography>
    </Box>
    <Box sx={{
      display: "flex",
      pl: 1
    }}>
      <IconButton color="primary" onClick={() => {
        history.push("/calendar/save")
      }} size="small">New <AddCircle /></IconButton>
      <Box
        sx={{ flexGrow: 1 }} />
      <NextBackBtn onNext={() => {
        if (selectedMonth === LAST_MONTH) {
          setSelectedMonth(INITIAL_MONTH)
          setYear(year + 1);
        } else {
          setSelectedMonth(selectedMonth + 1)
        }
      }}
        onPrevious={() => {
          if (selectedMonth === INITIAL_MONTH) {
            setSelectedMonth(LAST_MONTH)
            setYear(year - 1)
          } else {
            setSelectedMonth(selectedMonth - 1)
          }
        }}
        isLoading={false} />
    </Box>

    <CalendorUnit thisYear={year} month={selectedMonth} />
    <div className="centering mg-t-10">
      <Button color="primary" onClick={() => {
        history.push("/home")
      }}>to home</Button>
    </div>
  </>)
}

const CalendorUnit = (props: CalendarProp) => {
  const dispatch = useAppDispatch()
  const history = useHistory();
  const calendorData = createCalendarArr(props.thisYear, props.month)
  const isToday = (date: Date): string => {
    const today = new Date();
    if (today.getDate() === date.getDate() && today.getMonth() === date.getMonth()) {
      return 'calendar-today'
    } else {
      return ''
    }
  }

  const onClickDate = (date: Date) => {
    const schedule: ScheduleStore = {
      taskId: null,
      taskName: null,
      detail: null,
      startAt: date,
      importance: null,
      toBeDone: null,
      doneAt: null
    }
    dispatch({
      type: selectSchedule.type,
      payload: schedule
    })
    history.push("/calendar/save")
  }

  const isThisMonth = (date: Date): string => {
    if (props.month === date.getMonth()) {
      return ''
    } else {
      return 'calendar-not-this-month'
    }
  }

  const returnDate = (date: Date) => {
    if (date.getDate() === 1) {
      return (<>
        <div onClick={() => {
          onClickDate(date)
        }} className="calendar-date">
          <b>
            {date.getMonth() + 1} / {date.getDate()}
          </b>
          <DaylySchedule date={date} />

        </div>
      </>)
    } else {
      return (
        <>
          <div className={`${isThisMonth(date)} calendar-date`} onClick={() => {
            onClickDate(date)
          }}>
            {date.getDate()}
            <DaylySchedule date={date} />

          </div>
        </>
      )
    }
  }


  const cellStyle: SxProps<Theme> = {
    minWidth: "30px",
    maxWidth: "60px",
    padding: "4px",
    textAlign: "center"
  }

  return <>
    <div>
      <Box sx={{
        paddingLeft: 1,
        paddingRight: 1,
        display: "flex",
      }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={cellStyle}>日</TableCell>
              <TableCell sx={cellStyle}>月</TableCell>
              <TableCell sx={cellStyle}>火</TableCell>
              <TableCell sx={cellStyle}>水</TableCell>
              <TableCell sx={cellStyle}>木</TableCell>
              <TableCell sx={cellStyle}>金</TableCell>
              <TableCell sx={cellStyle}>土</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              calendorData.map((week, index) => {
                return <TableRow key={index}>
                  {
                    week.map((date, index) => {
                      return (<TableCell key={index} className={`${isToday(date)}`}
                        sx={cellStyle}
                      >
                        <div className="calendar-inner-cell">
                          {returnDate(date)}
                        </div>
                      </TableCell>
                      )
                    })
                  }
                </TableRow>
              })
            }

          </TableBody>
        </Table>
      </Box>

    </div>
  </>
}

const createCalendarArr = (year: number, month: number): Date[][] => {

  // 初日定義
  const initialDateOfCalendar = new Date(year, month, 1, 1);
  // 初週日曜日定義
  initialDateOfCalendar.setDate(initialDateOfCalendar.getDate() - (initialDateOfCalendar.getDay()));
  const daysOfMonth: Date[][] = [];
  for (let w = 0; w < MAX_WEEK; w++) {
    const daysOfWeeks: Date[] = [];
    for (let d = 0; d < MAX_DAY; d++) {
      // 初日日曜日定義
      const initialDayOfThisWeek = new Date(initialDateOfCalendar);
      // 日数を加算
      initialDayOfThisWeek.setDate(initialDayOfThisWeek.getDate() + MAX_DAY * w + d)
      daysOfWeeks.push(initialDayOfThisWeek)
    }
    daysOfMonth.push(daysOfWeeks);
  }
  return daysOfMonth;
}



type CalendarProp = {
  thisYear: number,
  month: number
}

