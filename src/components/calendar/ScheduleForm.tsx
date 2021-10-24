import { Delete } from "@mui/icons-material";
import { FormGroup, Rating, Typography } from "@mui/material";
import { Box } from "@mui/system";
import _ from "lodash";
import { ChangeEvent, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { useScheduleDelete, useScheduleRegister } from "../../ext/scheduleApi";
import { useAppSelector } from "../../hooks/storeHooks";
import { ScheduleStore } from "../../interfaces/extapi/schedule";
import { MtmToolBar } from "../home/MtmToolBar";
import SubMitBtn from "../SubMitBtn";
import { TextInput } from "../TextInput";
import { InlineCalendar } from "./InlineCalendar";

const ScheduleForm = () => {
  const props = useAppSelector(state => state.schedule.selected);
  const [name, setName] = useState(props.taskName);
  const [detail, setDetail] = useState(props.detail);
  const [startAt, setStartAt] = useState(props.startAt);
  const [startAtErr, setStartAtErr] = useState(false);
  const [toBeDone, setToBeDone] = useState(props.toBeDone);
  const [dateDoneErr, setDoneErr] = useState(false);
  const [importance, setImportance] = useState(props.importance)
  const [doneAt, setDoneAt] = useState(props.doneAt);
  const [dateAtErr, setDoneAtErr] = useState(false);

  const [submitable, setSubmitable] = useState(false);
  useEffect(() => {
    if (props) {
      setName(props.taskName);
      setDetail(props.detail);
      setStartAt(props.startAt);
      setToBeDone(props.toBeDone);
      setImportance(props.importance);
      setDoneAt(props.doneAt);
    }
  }, [props])

  useEffect(() => {
    if (checkName(name) || startAtErr || dateDoneErr || dateAtErr) {
      setSubmitable(false);
    } else {
      //必須項目
      if (!startAt || !name) {
        setSubmitable(false)
      } else {
        setSubmitable(true)
      }
    }
  }, [startAtErr, dateDoneErr, name, startAt, dateAtErr])

  const history = useHistory()
  const { saveSchedule, loading, error } = useScheduleRegister();
  const onPost = () => {
    // 新規の場合taskIdをnullに    
    const request: ScheduleStore = {
      taskId: null,
      taskName: name,
      detail,
      startAt,
      toBeDone,
      importance,
      doneAt
    }
    saveSchedule(request).then(() => {
      history.push("/calendar")
    });

  }

  const onPut = () => {
    // 更新の場合taskIdを入れる    
    const request: ScheduleStore = {
      taskId: props.taskId,
      taskName: name,
      detail,
      startAt,
      toBeDone,
      importance,
      doneAt
    }
    saveSchedule(request).then(() => {
      history.push("/calendar")
    });
  }

  const { deleteScheduleFunc, loading: loadingDelete } = useScheduleDelete();
  const onDelete = () => {
    if (props.taskId !== null) {
      deleteScheduleFunc(props.taskId).then(() => {
        history.push("/calendar")
      })
    }
  }



  return (
    <>
      <MtmToolBar />
      <Box sx={{
        minWidth: 100,
        maxWidth: 400,
        margin: 'auto'
      }}>
        <h2 className="centering">予定を記入しよう</h2>
        <FormGroup style={{
          paddingLeft: 10,
          paddingRight: 10
        }}
          className="calendar-form">

          <TextInput
            type="text"
            error={checkName(name)}
            label="予定(20字以内)"
            defaultValue={name ? name : undefined}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setName(e.target.value);
            }}
          />

          <TextInput
            type="textarea"
            label="詳細"
            error={false}
            defaultValue={detail ? detail : undefined}
            multiline
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setDetail(e.target.value);
            }}
          />
          <InlineCalendar
            date={startAt}
            onChange={setStartAt}
            label="日時"
            onError={setStartAtErr}
          />


          <div>
            <Typography component="legend">重要度</Typography>
            <Typography component="legend">
              <Rating
                name="importance"
                value={importance}
                sx={{
                  color: "yellow"
                }}
                onChange={(e, v) => {
                  if (v !== null) {
                    setImportance(v);
                  }
                }}
              />

            </Typography>
          </div>

          <InlineCalendar
            date={toBeDone}
            onChange={setToBeDone}
            label="期限"
            onError={setDoneErr}
          />

          <InlineCalendar
            date={doneAt}
            onChange={setDoneAt}
            label="完了日"
            onError={setDoneAtErr}
          />

          <div className="contents-aline">
            <SubMitBtn
              isLoading={loading}
              onClick={() => { onPost() }}
              btnText="Post!"
              color="primary"
              disabled={!submitable}
            />
            <SubMitBtn
              isLoading={loading}
              onClick={() => { onPut() }}
              btnText="Update!"
              color="primary"
              disabled={!submitable}
            />
            <SubMitBtn
              isLoading={loading}
              onClick={() => { onDelete() }}
              btnText="Delete!"
              color="primary"
              disabled={!props.taskId}
              icon={<Delete />}
              variant="outlined"
            />
          </div>
          <div className="contents-aline">
            <SubMitBtn
              btnText="To Calendar"
              variant="text"
              color="info"
              disabled={false}
              isLoading={false}
              onClick={() => {
                history.push("/calendar")
              }}
            />
          </div>

        </FormGroup>

      </Box>
    </>
  )
}

const checkName = (name: string | null): boolean => {
  return name ? (name?.length > 20) : name?.length === 0
}

export default ScheduleForm;