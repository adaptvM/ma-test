const handleRemoveItems = (items, selectedItems) => {
  
    const filteredItems = items.filter((el) => {
      return !selectedItems.has(el.productId);
    })
    return filteredItems;
}

export default handleRemoveItems; 