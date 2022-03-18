import { useEffect, useState } from "react";
import { Component } from "./Component";

export function App() {
  const [value, setValue] = useState("foobar");

  useEffect(() => {
    setTimeout(() => {
      console.log("setTimeout");
      setValue(`${new Date()}`);
    }, 3000);
  }, []);

  return (
    <div>
      ほげ
      <br />
      <Component id={123} value={value} onChange={setValue} />
    </div>
  );
}
