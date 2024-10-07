import React from "react";

export const useRerender = () => {
  const [, rerender] = React.useState({});
  return () => rerender({});
};
