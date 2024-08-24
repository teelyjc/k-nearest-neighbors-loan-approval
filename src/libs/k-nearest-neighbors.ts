export function getEuclidean(inputs: number[]): number {
  let inputSum = 0;
  inputs.map((input) => (inputSum += input));

  return Math.sqrt(inputSum);
}

export function getDifference(input1: number, input2: number): number {
  return Math.pow(input1 - input2, 2);
}
