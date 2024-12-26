import Stack from "./datastructures/stack.js";

export default function PatienceSortVisualizer(props: {
  arrayToSort: number[];
}) {
  const arrayToSort = props.arrayToSort;

  function makePiles() {
    const piles: Stack[] = [];

    arrayToSort.forEach((element) => {
      let peekValuePlaced = false;

      for (const pile of piles) {
        const peekedValue = pile.peek();
        if (peekedValue !== undefined && peekedValue >= element) {
          pile.push(element);
          peekValuePlaced = true;
          break;
        }
      }

      if (!peekValuePlaced) {
        const newPile = new Stack();
        newPile.push(element);
        piles.push(newPile);
      }
    });
    return mergePiles(piles);
  }

  function mergePiles(piles: Stack[]): number[] {
    const sortedArray: number[] = [];
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
          sortedArray.push(poppedValue);
        }
        tempPeekArray[minIndex] = piles[minIndex].peek();
      }
    }

    return sortedArray;
  }

  return (
    <>
      <h3>Patience Sort Visualizer</h3>
      <p>Unsorted array: [{arrayToSort.join(", ")}]</p>
      <p>Sorted array: [{makePiles().join(", ")}]</p>
    </>
  );
}
