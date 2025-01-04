import { FormEvent, useState } from "react";
import Stack from "./datastructures/stack.js";
import "./PatienceSortVisualizer.css";
import PatienceSortControlsForm from "./PatienceSortControls.js";
import { useNavigate } from "react-router-dom";

export default function PatienceSortVisualizer() {
  const DEFAULT_MAX_IN_UNSORTED_ARRAY = 100;
  const DEFAULT_MIN_IN_UNSORTED_ARRAY = 1;
  const DEFAULT_UNSORTED_ARRAY_SIZE = 10;
  const DEFAULT_DELAY = 1000;

  const [sortedArray, setSortedArray] = useState<number[]>([]);
  const [unsortedArrayProps, setUnsortedArrayProps] = useState({
    size: DEFAULT_UNSORTED_ARRAY_SIZE,
    min: DEFAULT_MIN_IN_UNSORTED_ARRAY,
    max: DEFAULT_MAX_IN_UNSORTED_ARRAY,
  });
  const [unsortedArray, setUnsortedArray] = useState<number[]>(
    createArrayToSort(
      unsortedArrayProps.size,
      unsortedArrayProps.min,
      unsortedArrayProps.max
    )
  );
  const [piles, setPiles] = useState<Stack[]>([]);
  const [stepDelay, setStepDelay] = useState(DEFAULT_DELAY);
  const [isSorting, setIsSorting] = useState(false);
  const [lastPileUpdatedIndex, setLastPileUpdatedIndex] = useState(-1);
  const nav = useNavigate();

  function delay() {
    return new Promise((resolve) => setTimeout(resolve, stepDelay));
  }

  function createArrayToSort(size: number, min: number, max: number): number[] {
    return Array.from({ length: size }, () =>
      Math.floor(Math.random() * max + min)
    );
  }

  async function makePiles() {
    const pilesArray: Stack[] = [];

    const unsortedArrayAfterPoppedValue = [...unsortedArray];

    for (const value of unsortedArray) {
      let isPeekedValuePlaced = false;
      for (let i = 0; i < pilesArray.length; i++) {
        const peekedValue = pilesArray[i].peek();

        if (peekedValue !== undefined && peekedValue >= value) {
          pilesArray[i].push(value);
          isPeekedValuePlaced = true;
          setLastPileUpdatedIndex(i);
          break;
        }
      }

      if (!isPeekedValuePlaced) {
        const newPile = new Stack();
        newPile.push(value);
        pilesArray.push(newPile);
        setLastPileUpdatedIndex(pilesArray.length - 1);
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
          setLastPileUpdatedIndex(minIndex);
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

    return (
      <div id="pilesGridContainer">
        {pilesAsArrays.map(
          (_, index) =>
            colorLastUpdatedPile(index, "blue", pilesAsArrays) || (
              <p key={index} id="pilesGridItem">
                {pilesAsArrays[index].map((value, index) => {
                  return (
                    <span key={index}>
                      <span>{value}</span>
                      <br />
                    </span>
                  );
                })}
              </p>
            )
        )}
      </div>
    );
  }

  const colorLastUpdatedPile = (
    index: number,
    color: string,
    array: number[][]
  ) => {
    if (array && index === lastPileUpdatedIndex) {
      return (
        <p key={index} id="pilesGridItem" style={{ color: color }}>
          {array[index].map((value, index) => {
            return (
              <span key={index}>
                <span>{value}</span>
                <br />
              </span>
            );
          })}
        </p>
      );
    }
  };

  const colorElementInArrayGridByIndex = (
    index: number,
    indexToColor: number,
    color: string,
    array: number[],
    value: number
  ) => {
    if (array && index === indexToColor) {
      return (
        <div key={index} style={{ color: color }}>
          {value}
        </div>
      );
    }
  };

  function handleFormChange(e: FormEvent<HTMLFormElement>) {
    const target = e.currentTarget as HTMLFormElement;
    const delayInput =
      parseInt(
        (target.elements.namedItem("delayInput") as HTMLInputElement).value
      ) || DEFAULT_DELAY;
    const unsortedArraySizeInput =
      parseInt(
        (target.elements.namedItem("unsortedArraySize") as HTMLInputElement)
          .value
      ) || DEFAULT_UNSORTED_ARRAY_SIZE;
    const minNumberInput =
      parseInt(
        (target.elements.namedItem("minNumberRange") as HTMLInputElement).value
      ) || DEFAULT_MIN_IN_UNSORTED_ARRAY;
    const maxNumberInput =
      parseInt(
        (target.elements.namedItem("maxNumberRange") as HTMLInputElement).value
      ) || DEFAULT_MAX_IN_UNSORTED_ARRAY;

    setStepDelay(delayInput);
    setUnsortedArray(
      createArrayToSort(unsortedArraySizeInput, minNumberInput, maxNumberInput)
    );
    setUnsortedArrayProps({
      size: unsortedArraySizeInput,
      min: minNumberInput,
      max: maxNumberInput,
    });
  }

  async function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!isSorting) {
      setUnsortedArray(
        createArrayToSort(
          unsortedArrayProps.size,
          unsortedArrayProps.min,
          unsortedArrayProps.max
        )
      );
      setSortedArray([]);
      setPiles([]);
      setIsSorting(true);
      await makePiles();
      setIsSorting(false);
    }
  }

  return (
    <div id="patienceSortVisualizer">
      <div>
        <h3>Patience Sort Visualizer</h3>
        <PatienceSortControlsForm
          handleChange={handleFormChange}
          handleSubmit={handleFormSubmit}
          defaultUnsortedArraySize={DEFAULT_UNSORTED_ARRAY_SIZE}
          defaultMinNumber={DEFAULT_MIN_IN_UNSORTED_ARRAY}
          defaultMaxNumber={DEFAULT_MAX_IN_UNSORTED_ARRAY}
          defaultDelay={DEFAULT_DELAY}
          isDoneSorting={!isSorting && sortedArray.length > 0}
        />
        <button
          onClick={() => {
            nav(-1);
          }}
        >
          {"Back"}
        </button>
      </div>

      <div id="patienceSortVisual">
        <h4>
          Unsorted array: <button>+</button>
        </h4>
        <div id="unsortedGridContainer">
          {unsortedArray.map((value, index) => (
            <div key={index} className="unsortedGridItem">
              {colorElementInArrayGridByIndex(
                index,
                0,
                "blue",
                unsortedArray,
                value
              ) || value}
            </div>
          ))}
        </div>
        <br />

        <h4>Piles:</h4>
        <div id="stacksVisual">{visualizeStacks(piles)}</div>

        <h4>Sorted array:</h4>
        <div id="sortedGridContainer">
          {sortedArray.map((value, index) => (
            <div key={index} className="sortedGridItem">
              {colorElementInArrayGridByIndex(
                index,
                sortedArray.length - 1,
                "blue",
                unsortedArray,
                value
              ) || value}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
