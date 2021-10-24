import { LoadingButton } from "@mui/lab";
import { Button, CircularProgress } from "@mui/material";
import React from "react";
import { SubmitBtn } from "../interfaces/component/btnProps";

function SubMitBtn(props: SubmitBtn) {

  const renderBtn = () => {
    return (<div>
      <LoadingButton
        color={props.color}
        variant={props.variant ? props.variant : "contained"}
        endIcon={props.icon}
        loading={props.isLoading}
        disabled={props.disabled}
        onClick={(e: React.MouseEvent) => props.onClick(e)}
      >
        {props.btnText}
      </LoadingButton>
    </div>)
  }

  return (<>
    {renderBtn()}
  </>)
}

export default SubMitBtn;