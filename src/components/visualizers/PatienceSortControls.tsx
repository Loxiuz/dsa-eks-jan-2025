import { FormEvent } from "react";
import "./PatienceSortControls.css";

export default function PatienceSortControlsForm(props: {
  handleChange: (e: FormEvent<HTMLFormElement>) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  defaultUnsortedArraySize: number;
  defaultMinNumber: number;
  defaultMaxNumber: number;
  defaultDelay: number;
  isDoneSorting: boolean;
}) {
  const {
    handleChange: handleFormChange,
    handleSubmit: handleFormSubmit,
    defaultUnsortedArraySize,
    defaultMinNumber,
    defaultMaxNumber,
    defaultDelay,
    isDoneSorting,
  } = props;
  return (
    <div id="patienceSortControls">
      <h3>Controls</h3>
      <form
        id="patienceSortControlsForm"
        onSubmit={handleFormSubmit}
        onChange={handleFormChange}
      >
        <label htmlFor="unsortedArraySize">Unsorted array size</label>
        <input
          type="number"
          id="unsortedArraySize"
          name="unsortedArraySize"
          placeholder={`${defaultUnsortedArraySize}`}
        />
        <div id="minMaxRange">
          <p>Min and max number in unsorted array</p>
          <div id="minMaxInputs">
            <label htmlFor="minNumberRange">min:</label>
            <input
              type="number"
              id="minNumberRange"
              name="minNumberRange"
              placeholder={`${defaultMinNumber}`}
            />
            <label htmlFor="maxNumberRange">max:</label>
            <input
              type="number"
              id="maxNumberRange"
              name="maxNumberRange"
              placeholder={`${defaultMaxNumber}`}
            />
          </div>
          <br />
        </div>
        <label htmlFor="delayInput">Delay in ms:</label>
        <input
          type="number"
          id="delayInput"
          name="delayInput"
          placeholder={`${defaultDelay}`}
        />
        {(isDoneSorting && (
          <input
            id="patienceSortSubmitBtn"
            type="submit"
            name="formSubmitBtn"
            value={"Reset"}
          />
        )) || (
          <input
            id="patienceSortSubmitBtn"
            type="submit"
            name="formSubmitBtn"
            value={"Sort"}
          />
        )}
      </form>
    </div>
  );
}
