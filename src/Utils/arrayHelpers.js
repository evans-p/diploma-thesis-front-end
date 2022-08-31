function optionArraysEqual(array_1, array_2) {
  if (array_1.length !== array_2.length) {
    return false;
  }
  for (var i = 0; i < array_1.length; i++) {
    if (
      array_1[i].optionTextEL !== array_2[i].optionTextEL ||
      array_1[i].optionTextEN !== array_2[i].optionTextEN
    ) {
      return false;
    }
  }
  return true;
}

function reorderArray(array, sourceIdx, destinationIdx) {
  const [removed] = array.splice(sourceIdx, 1);
  array.splice(destinationIdx, 0, removed);

  return array;
}

export { optionArraysEqual, reorderArray };
