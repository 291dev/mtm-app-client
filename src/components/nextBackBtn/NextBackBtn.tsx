import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { MouseEvent } from "react";
import { NextBackBtnProp } from "../../interfaces/component/btnProps";
import './next-back-btn.scss'
const NextBackBtn = (props: NextBackBtnProp) => {

  return (<>
    <IconButton
      color={props.color ? props.color : "primary"}
      onClick={(e: MouseEvent) => { props.onPrevious(e) }}>
      <ArrowBackIos />
    </IconButton>
    <IconButton
      color={props.color ? props.color : "primary"}
      onClick={(e: MouseEvent) => { props.onNext(e) }}>
      <ArrowForwardIos />
    </IconButton>
  </>)
}

export default NextBackBtn;