import { FC, useEffect } from "react";

export const Button: FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = (
  props
) => {
  useEffect(() => {
    console.log("Button初期化", new Date());
  }, []);
  return <button {...props}>{props.children}</button>;
};
