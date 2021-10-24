import { Star } from "@mui/icons-material";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { Box, SxProps, textAlign, Theme } from "@mui/system";
import id from "date-fns/esm/locale/id/index.js";
import _ from "lodash";
import { ReactNode, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useScheduleFetch } from "../../ext/scheduleApi";
import { useAppDispatch, useAppSelector } from "../../hooks/storeHooks";
import { ScheduleStore } from "../../interfaces/extapi/schedule";
import { selectSchedule } from "../../reducers/scheduleReducer";
import { MtmToolBar } from "./MtmToolBar";

const cellStyle: SxProps<Theme> = {
  padding: "6px",
}

const cellYear: SxProps<Theme> = {
  ...cellStyle,
  fontStyle: "italic",
  fontWeight: 600,
  bgcolor: "whitesmoke"
}

const cellHeader: SxProps<Theme> =
{
  ...cellStyle,
  textAlign: "center"
}
const cellChedule: SxProps<Theme> =
{
  ...cellStyle,
  maxWidth: "60px",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  pr: "3px",
  mr: "3px",
  borderRight: "solid",
  borderRightWidth: "1px",
  borderRightColor: "whitesmoke",
  cursor: "pointer",
  color: "blue"
}

const cellTime: SxProps<Theme> =
{
  ...cellStyle,
  maxWidth: "60px",
  whiteSpace: "nowrap",
  overflow: "auto",
  ml: "3px"
}

export const Home = () => {
  const { getSchedules, loading, error } = useScheduleFetch();
  const [incompleteCount, setIncompleteCount] = useState(0);
  const userId = useAppSelector(state => state.userInfo.info.userId)
  useEffect(() => {
    if (userId) {
      getSchedules();
    }
  }, [])
  const schedules = useAppSelector(state => state.schedule.schedules)
  const [sortedByStartAt, setSortByStartAt] = useState<ScheduleStore[]>();
  useEffect(() => {
    if (_.isEmpty(schedules)) {
      getSchedules();
    } else {
      const sorted = _.toArray<ScheduleStore>(schedules).sort((s1, s2) => {
        if (s1.startAt && s2.startAt) {
          return new Date(s2.startAt).getTime() - new Date(s1.startAt).getTime()
        } else {
          return -1;
        }
      })
      setSortByStartAt(sorted);

      let count = _.filter(schedules, (schedule) => _.isEmpty(schedule.doneAt)).length;
      setIncompleteCount(count);
    }
  }, [schedules])
  const history = useHistory();
  const dispatch = useAppDispatch();
  const dateToDispStr = (date: Date): ReactNode => {
    return <>
      <div>
        {`${new Date(date).getMonth() + 1}/${new Date(date).getDate()} `}
        {`${new Date(date).getHours()}時`}
      </div>
    </>
  }
  const onSelectSchedule = (schedule: ScheduleStore) => {
    dispatch({
      type: selectSchedule.type,
      payload: schedule
    })
    history.push("/Calendar/save")
  }

  let year = new Date().getFullYear()

  return (<>
    <MtmToolBar />
    <Box sx={{ margin: 1 }}>
      未完了: {incompleteCount}
    </Box>
    <Box sx={{ margin: 1 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={cellHeader}>予定</TableCell>
            <TableCell sx={cellHeader}>日時</TableCell>
            <TableCell sx={cellHeader}>完了日</TableCell>
            <TableCell sx={cellHeader}><Star fontSize="small" sx={{ mb: -0.5 }} /></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow><TableCell colSpan={4} sx={cellYear}>
            {new Date().getFullYear()}</TableCell>
          </TableRow>
          {sortedByStartAt && _.map(sortedByStartAt, (schedule, key) => {
            if (schedule.startAt && new Date(schedule.startAt).getFullYear() == year) {
              return <TableRow key={key}>
                <TableCell key={`k1${key}`} onClick={() => { onSelectSchedule(schedule) }} sx={cellChedule}>{schedule.taskName}</TableCell>
                <TableCell key={`k2${key}`} sx={cellTime}>{schedule.startAt ? dateToDispStr(schedule.startAt) : '-'}</TableCell>
                <TableCell key={`k3${key}`} sx={cellTime}>{schedule.doneAt ? dateToDispStr(schedule.doneAt) : '-'}</TableCell>
                <TableCell key={`k4${key}`} sx={cellHeader}>{schedule.importance}</TableCell>
              </TableRow>
            } else {
              if (schedule.startAt) {
                year = new Date(schedule.startAt).getFullYear()
                return <>
                  <TableRow key={year}>
                    <TableCell colSpan={4} sx={cellYear} key={'s' + year}>
                      {new Date(schedule.startAt).getFullYear()}
                    </TableCell>
                  </TableRow>
                  <TableRow key={key}>
                    <TableCell key={`k1${key}`} onClick={() => { onSelectSchedule(schedule) }} sx={cellChedule}>{schedule.taskName}</TableCell>
                    <TableCell key={`k2${key}`} sx={cellTime}>{schedule.startAt ? dateToDispStr(schedule.startAt) : '-'}</TableCell>
                    <TableCell key={`k3${key}`} sx={cellTime}>{schedule.doneAt ? dateToDispStr(schedule.doneAt) : '-'}</TableCell>
                    <TableCell key={`k4${key}`} sx={cellHeader}>{(schedule.importance)}</TableCell>
                  </TableRow>
                </>
              }
            }
          })
          }
        </TableBody>
      </Table>
    </Box>
  </>);
}