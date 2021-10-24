import React from "react";

export type FormProps = {
  input: string,
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}