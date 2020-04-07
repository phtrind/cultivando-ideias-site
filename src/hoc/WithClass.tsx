import React from "react";

export default function WithClass(props: any) {
  return <div className={props.className}>{props.children}</div>;
}
