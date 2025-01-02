import { FormEvent } from "react";

export default function PatienceSortControlsForm(props: {
  handleChange: (e: FormEvent<HTMLFormElement>) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  sortedArray: number[];
  arrayToSort: number[];
}) {
  const DEFAULT_DELAY = 1000;
  const {
    handleChange: handleFormChange,
    handleSubmit: handleFormSubmit,
    sortedArray,
    arrayToSort,
  } = props;
  return (
    <>
      <h3>Controls</h3>
      <form
        id="patienceSortControlsForm"
        onSubmit={handleFormSubmit}
        onChange={handleFormChange}
      >
        <label htmlFor="delayInput">Delay in ms:</label>
        <input
          type="number"
          id="delayInput"
          name="delayInput"
          placeholder={`${DEFAULT_DELAY}`}
        />
        {(sortedArray.length === arrayToSort.length && (
          <input type="submit" name="formSubmitBtn" value={"Reset"} />
        )) || <input type="submit" name="formSubmitBtn" value={"Sort"} />}
      </form>
    </>
  );
}
