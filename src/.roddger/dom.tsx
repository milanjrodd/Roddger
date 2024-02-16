import type { ReactNode } from "react";

interface RootProps {}

export const DOM: React.FunctionComponent<{ root: ReactNode } & RootProps> = ({
  root,
}) => {
  return (
    <html>
      <head>
        <title>Rodgger</title>
      </head>
      <body>
        <div id="root">{root}</div>
      </body>
    </html>
  );
};
