import _ from "lodash";
import { useHistory } from "react-router";
import { useAppDispatch, useAppSelector } from "../../hooks/storeHooks"
import { ScheduleStore } from "../../interfaces/extapi/schedule";
import { selectSchedule } from "../../reducers/scheduleReducer";

export type DaylyScheduleType = {
  date: Date
}
export const DaylySchedule = (props: DaylyScheduleType) => {
  const schedules = useAppSelector(state => state.schedule.schedules);
  const dispatch = useAppDispatch();
  const history = useHistory();
  let toDaySchedules = _.filter(schedules, (schedule) => {
    if (schedule.startAt != null) {
      return `${props.date.getFullYear()}${props.date.getMonth()}${props.date.getDate()}`
        === `${new Date(schedule.startAt).getFullYear()}${new Date(schedule.startAt).getMonth()}${new Date(schedule.startAt).getDate()}`
    } else {
      return false;
    }
  })
  toDaySchedules = _.sortBy(toDaySchedules, "startAt")

  const onClickDate = (e: React.MouseEvent, selectedSchdule: ScheduleStore) => {
    e.stopPropagation();
    dispatch({
      type: selectSchedule.type,
      payload: selectedSchdule
    })
    history.push("/calendar/save")
  }
  return (<>
    {toDaySchedules && <div className="calendar-daily-schedule" >
      {toDaySchedules.map((v, i) =>
        <div className={`calendar-daily-schedule-${v.importance ? v.importance : 0}`}
          key={i}
          onClick={(e) => {
            onClickDate(e, v);
          }}>
          {v.startAt ? `${new Date(v.startAt).getHours()}時 ${v.taskName}` : ''}
        </div>)}
    </div>}
  </>)

}
