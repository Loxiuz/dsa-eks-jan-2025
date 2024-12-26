import { FormEvent, useState } from "react";
import Stack from "./datastructures/stack.js";

export default function PatienceSortVisualizer(props: {
  arrayToSort: number[];
}) {
  const arrayToSort = props.arrayToSort;
  const [sortedArray, setSortedArray] = useState<number[]>([]);
  const [piles, setPiles] = useState<Stack[]>([]);
  const [stepDelay, setStepDelay] = useState(500);
  const [isSorting, setIsSorting] = useState(false);

  function delay() {
    return new Promise((resolve) => setTimeout(resolve, stepDelay));
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

    return (
      <>
        <span style={{ fontWeight: "bold" }}>Piles:</span>
        {pilesAsArrays.map((_, index) => (
          <div key={index}>
            <div>
              {index + 1}: [{pilesAsArrays[index].join(", ")}]
            </div>
          </div>
        ))}
      </>
    );
  }

  async function makePiles() {
    const pilesArray: Stack[] = [];

    for (const value of arrayToSort) {
      let isPeekValuePlaced = false;
      for (const pile of pilesArray) {
        const peekedValue = pile.peek();
        if (peekedValue !== undefined && peekedValue >= value) {
          pile.push(value);
          isPeekValuePlaced = true;
          break;
        }
      }

      if (!isPeekValuePlaced) {
        const newPile = new Stack();
        newPile.push(value);
        pilesArray.push(newPile);
      }

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

  function handleFormChange(e: FormEvent<HTMLFormElement>) {
    const target = e.currentTarget as HTMLFormElement;
    const delayInput = parseInt(
      (target.elements.namedItem("delayInput") as HTMLInputElement).value
    );
    setStepDelay(delayInput);
  }

  async function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isSorting) {
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

      <h4>Unsorted array: [{arrayToSort.join(", ")}]</h4>

      <form
        id="delayForm"
        onSubmit={handleFormSubmit}
        onChange={handleFormChange}
      >
        <label htmlFor="delayInput">Delay in ms:</label>
        <input type="number" name="delayInput" placeholder="500" />
        <input type="submit" name="formSubmitBtn" value={"Sort"} />
      </form>
      <br />

      <div>{visualizeStacks(piles)}</div>

      <h4>Sorted array: [{sortedArray.join(", ")}]</h4>
    </>
  );
}
