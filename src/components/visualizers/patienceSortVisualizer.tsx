import { FormEvent, useState } from "react";
import Stack from "./datastructures/stack.js";
import "./PatienceSortVisualizer.css";

export default function PatienceSortVisualizer(props: {
  arrayToSort: number[];
}) {
  const DEFAULT_DELAY = 500;

  const arrayToSort = props.arrayToSort;
  const [sortedArray, setSortedArray] = useState<number[]>([]);
  const [unsortedArray, setUnsortedArray] = useState<number[]>(arrayToSort);
  const [piles, setPiles] = useState<Stack[]>([]);
  const [stepDelay, setStepDelay] = useState(DEFAULT_DELAY);
  const [isSorting, setIsSorting] = useState(false);

  function delay() {
    return new Promise((resolve) => setTimeout(resolve, stepDelay));
  }

  async function makePiles() {
    const pilesArray: Stack[] = [];

    const unsortedArrayAfterPoppedValue = [...unsortedArray];

    for (const value of unsortedArray) {
      let isPoppedValuePlaced = false;
      for (const pile of pilesArray) {
        const peekedValue = pile.peek();

        if (peekedValue !== undefined && peekedValue >= value) {
          pile.push(value);
          isPoppedValuePlaced = true;
          break;
        }
      }

      if (!isPoppedValuePlaced) {
        const newPile = new Stack();
        newPile.push(value);
        pilesArray.push(newPile);
      }

      unsortedArrayAfterPoppedValue.shift();
      setUnsortedArray(unsortedArrayAfterPoppedValue);

      setPiles([...pilesArray]);

      await delay();
    }

    return mergePiles(pilesArray);
  }

  async function mergePiles(piles: Stack[]) {
    const tempSortedArray: number[] = [];
    const tempPeekArray: (number | undefined)[] = piles.map((pile) =>
      pile.peek()
    );

    while (tempPeekArray.some((element) => element !== undefined)) {
      let min: number | undefined = undefined;
      let minIndex: number = -1;

      for (let i = 0; i < tempPeekArray.length; i++) {
        if (
          min === undefined ||
          (tempPeekArray[i] !== undefined && tempPeekArray[i]! < min)
        ) {
          min = tempPeekArray[i];
          minIndex = i;
        }
      }

      if (minIndex !== -1) {
        const poppedValue = piles[minIndex].pop();
        if (poppedValue !== undefined) {
          tempSortedArray.push(poppedValue);
          setSortedArray([...tempSortedArray]);
          await delay();
        }

        tempPeekArray[minIndex] = piles[minIndex].peek();
      }
    }

    return tempSortedArray;
  }

  function visualizeStacks(piles: Stack[]) {
    const pilesAsArrays = piles.map((pile) => {
      const stackArray: number[] = [];
      let node = pile.tail;
      while (node) {
        stackArray.unshift(node.data);
        node = node.prev;
      }
      return stackArray;
    });

    const colorFirstElement = (
      index: number,
      array: number[],
      value: number
    ) => {
      if (array && index === 0) {
        return (
          <span key={index} style={{ color: "red" }}>
            {value}
          </span>
        );
      }
    };

    return (
      <div id="pilesGridContainer">
        {pilesAsArrays.map((_, index) => (
          <p key={index}>
            {pilesAsArrays[index].map((value, index) => {
              return (
                <span key={index}>
                  <span>
                    {colorFirstElement(index, pilesAsArrays[index], value) ||
                      value}
                  </span>
                  <br />
                </span>
              );
            })}
          </p>
        ))}
      </div>
    );
  }

  function handleFormChange(e: FormEvent<HTMLFormElement>) {
    const target = e.currentTarget as HTMLFormElement;
    const delayInput = parseInt(
      (target.elements.namedItem("delayInput") as HTMLInputElement).value
    );
    if (delayInput) {
      setStepDelay(delayInput);
    } else {
      setStepDelay(DEFAULT_DELAY);
    }
  }

  async function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!isSorting) {
      setUnsortedArray(arrayToSort);
      setSortedArray([]);
      setPiles([]);
      setIsSorting(true);
      await makePiles();
      setIsSorting(false);
    }
  }

  return (
    <>
      <h3>Patience Sort Visualizer</h3>

      <h4>Unsorted array:</h4>
      <div id="unsortedGridContainer">
        {unsortedArray.map((value, index) => (
          <div key={index} className="unsortedGridItem">
            {value}
          </div>
        ))}
      </div>
      <br />

      <form
        id="delayForm"
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

      <h4>Piles:</h4>
      <div id="stacksVisual">{visualizeStacks(piles)}</div>

      <h4>Sorted array:</h4>
      <div id="sortedGridContainer">
        {sortedArray.map((value, index) => (
          <div key={index} className="sortedGridItem">
            {value}
          </div>
        ))}
      </div>
    </>
  );
}
