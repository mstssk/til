import { VFC, useState, useEffect } from "react";
import { Button } from "./Button";

interface Props {
  id: number;
  value: string;
  onChange: (value: string) => void;
}

export const Component: VFC<Props> = (props) => {
  const [value, setValue] = useState(props.value);

  useEffect(() => {
    console.log("deps無し", new Date());
  }, []);

  useEffect(() => {
    console.log("value依存", new Date(), value);
  }, [value]);

  useEffect(() => {
    props.onChange(value);
  }, [value]);

  return (
    <>
      {value}
      <br />
      <Button
        onClick={() => {
          if (value) {
            setValue(`${new Date()}`);
          }
        }}
      >
        ボタン
      </Button>
    </>
  );
};
