import { FormEvent } from "react";

export default function InputGrid() {
  let size = 1;

  function handleFormChange(e: FormEvent<HTMLFormElement>) {
    const target = e.target as HTMLFormElement;
    const inputs = target.getElementsByTagName("input");

    const hasEmptyInput = Array.from(inputs).some(
      (input) => input.value === ""
    );

    if (!hasEmptyInput) {
      size++;
    }
  }

  return (
    <div id="inputGridContainer">
      <form id="inputGridForm" onChange={handleFormChange}>
        {Array.from({ length: size }).map((_, index) => (
          <div key={index}>
            <input type="number" />
          </div>
        ))}
      </form>
    </div>
  );
}
