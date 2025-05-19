import type { ReactNode } from "react";
import React from "react";

interface IFlashTextProps {
  textElement: ReactNode;
}

export function FlashText({
  textElement
}: IFlashTextProps) {
  return (
    <React.Fragment>
      {textElement}
    </React.Fragment>
  )
}