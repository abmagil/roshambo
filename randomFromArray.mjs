export const randomFromArray = (array) => {
  const pick = Math.floor(Math.random() * array.length);
  return array[pick];
}
