import React from "react";

interface Props {
  advocate: Advocate;
}
export const AdvocateCard = ({ advocate }: Props) => {
  console.log(advocate);
  return <div>Hello, World</div>;
};
