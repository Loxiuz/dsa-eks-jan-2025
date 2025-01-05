import { FormEvent } from "react";

export default function InputGrid(props: {
  onChange: (e: FormEvent<HTMLFormElement>) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  size: number;
}) {
  const { onChange, onSubmit, size } = props;

  return (
    <div id="inputGridContainer">
      <form id="inputGridForm" onChange={onChange} onSubmit={onSubmit}>
        {Array.from({ length: size }).map((_, index) => (
          <div key={index}>
            <input type="number" />
          </div>
        ))}
      </form>
    </div>
  );
}
