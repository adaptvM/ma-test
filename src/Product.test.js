import { render, fireEvent } from '@testing-library/react';
import handleRemoveItems from './utils/handleRemoveItems';
import Product from './components/Product';


describe('tests for product component', () => {
    test('Should render component in the DOM', () => {
        const { container } = render(<Product />);
        expect(container.firstChild).toBeInTheDocument();
      });
      
      test('Should recieve api data and render product info', () => {
          const { getByText } = render(<Product {...mockData[0]}/>);
          const productName = getByText('Rose Gold Shimmer Clutch Bag')
      
          expect(productName).toBeInTheDocument();
        });

        test('Should check if a product is selected', () => {
            const { getByTestId } = render(<Product {...mockData[0]}/>);
            const checkbox = getByTestId(`${mockData[0].productId}`)
            expect(checkbox.checked).toEqual(false)
            fireEvent.click(checkbox)
            expect(checkbox.checked).toEqual(true)
          });

          
        test('Should return selected item product id', () => {
            const { getByTestId } = render(<div>{mockData.map(item => <Product key={item.name} {...item}/>)}</div>);
            const checkbox = getByTestId(mockData[0].productId)

            expect(checkbox.checked).toEqual(false)
            fireEvent.click(checkbox)
            expect(checkbox.checked).toEqual(true)

            const id = checkbox.parentNode.parentNode.id;
            expect(id).toEqual("100024698")
          });

        test('Should remove selected products from list', () => {
            const expectedResult = [mockData[0]]
            const result = handleRemoveItems(mockData, selectedItems)
            expect(result).toEqual(expectedResult);
        })
})


 const mockData =  [
    {
      "productId": 100024698,
      "name": "Rose Gold Shimmer Clutch Bag",
      "description": "• Shimmer finish\n• Pleat design\n• Magnetic closure\n• Inner pocket\n• Detachable chain strap",
      "price": 9.09,
      "priceWas": 12.99,
      "available": "TRUE",
      "quantity": 96,
      "lowOnStock": "FALSE",
      "promotionBadge": "30% OFF",
      "imageUrl": "https://i8.amplience.net/i/Quiz/00100024698_XM?w=1024"
    },
    {
      "productId": 100024699,
      "name": "Blue Jewel Clutch Bag",
      "description": "• Jewel finish\n• Silver colour frame\n• Clip closure\n• Detachable chain strap\n• Synthetic",
      "price": 9.99,
      "priceWas": 18.99,
      "available": "TRUE",
      "quantity": 3,
      "lowOnStock": "FALSE",
      "promotionBadge": "47% OFF",
      "imageUrl": "https://i8.amplience.net/i/Quiz/00100024699_XM?w=1024"
    },
 ]

 const selectedItems = new Set([100024699])