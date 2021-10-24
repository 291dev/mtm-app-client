import React from "react";

export type SubmitBtn = {
  isLoading: boolean,
  onClick: (e: React.MouseEvent) => void,
  btnText: string,
  color: "error" | "info" | "inherit" | "primary" | "secondary" | "success" | "warning" | undefined,
  disabled: boolean,
  icon?: React.ReactNode,
  variant?: 'contained' | 'outlined' | 'text'
}

export type NextBackBtnProp = {
  isLoading: boolean,
  onNext: (e: React.MouseEvent) => void,
  onPrevious: (e: React.MouseEvent) => void,
  nextText?: string,
  previousText?: string,
  color?: "default" | "inherit" | "primary" | "secondary" | undefined,
  disabled?: boolean
}