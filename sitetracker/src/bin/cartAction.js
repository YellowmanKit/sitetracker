export const addToCart = (item) =>{
  console.log("Action: addToCart")
  return {
    type: 'add',
    payload: item
  }
}
