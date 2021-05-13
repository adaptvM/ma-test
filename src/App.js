import styled from "styled-components";
import Product from './components/Product'
import {useState, useEffect, useRef} from 'react';

function App() {

  const [items, _setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [isSelected, setIsSelected] = useState(false);
  const ref = useRef(items);

  const handleSelectedItem = (e) => {
    e.stopPropagation();
   if(e.target.checked) {
     setIsSelected(true)
     let id = e.target.parentNode.parentNode.id;
    setSelectedItems((prevState) => new Set(prevState.add(id)))
   }

   if(!e.target.checked) {
     let id = e.target.parentNode.parentNode.id;
     setSelectedItems((prevState) => {
       prevState.delete(id)
       return new Set(prevState);
     })
   }

  }

  const updateItems = x => {
    ref.current = x;
    _setItems(x);
  } 

  const handleRemoveItems = (e) => {
    e.stopPropagation();
    const filteredItems = items.filter((el) => {
      return !selectedItems.has(`${el.productId}`);
    })
    updateItems(filteredItems);
    setIsSelected(false);
    setSelectedItems(new Set());
  }

  useEffect(() => {
    fetch('https://run.mocky.io/v3/fca7ef93-8d86-4574-9a4a-3900d91a283e')
    .then(res => res.json())
    .then(data => _setItems(data))

  },[])

  return (
    <div style={{margin: 'auto'}} className="App">
      {isSelected && selectedItems.size !== 0 && (<Button onClick={handleRemoveItems}>Remove {selectedItems.size} products</Button>)}
    <Grid>
      {items.map((item) => {
        return (
          <Product key={item.name} onClick={handleSelectedItem} {...item}/>
        )
      })}
    </Grid>
    </div>
  );
}

const Grid = styled("div")`
  display: grid;
  grid-template-columns: repeat(4, 300px);
  grid-template-rows: auto auto;
  grid-column-gap: 15px;
  grid-row-gap: 15px;
  padding: 20px;
  background-color: #f7e8ff;
  justify-content: center;
`

const Button = styled("button")`
 background: purple;
 color: #f5f5f5;
 border: 1px solid;
 padding: 0.25em 1em;
 font-size: 12px;
 border-radius: 2px;
 margin-left: 100px;
 margin-bottom: 10px;
`
export default App;
