import { useState } from "react";

export const Page = ({}) => {
  const [state, setState] = useState(0);

  const buttonHandler = () => {
    setState((prev) => prev + 1);
  };

  return (
    <>
      <div>Hello, thats my blog!</div>
      <button onClick={buttonHandler}>{state} Click</button>
      <a href="/blog">Go to blog</a>
      <div>
        <a href="/about">About me</a>
      </div>
    </>
  );
};
