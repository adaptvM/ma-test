import styled from "styled-components";

interface Item {
  name: string;
  imageUrl: string;
  price: number;
  priceWas: number;
  promotionBadge: string;
  productId: number;
  onClick: () => void;
  available: string;
  quantity: number;
  lowOnStock: string;
  isTrue: boolean;
  isLowOnStock: boolean;
}

const Product = (props: Item) => {
  const {
    name,
    imageUrl,
    price,
    priceWas,
    promotionBadge,
    productId,
    available,
    lowOnStock,
    quantity,
    isTrue = available == "TRUE",
    isLowOnStock = lowOnStock == "TRUE",
    onClick,
  } = props;

  return (
    <ItemWrapper id={`${productId}`} display={isTrue ? "flex" : "none"}>
      <Image
        imageUrl={imageUrl}
        promotionBadge={promotionBadge}
        display={promotionBadge ? "block" : "none"}
      >
        <input
          type="checkbox"
          autoComplete="off"
          onClick={onClick}
          data-testid={`${productId}`}
        ></input>
      </Image>

      <Info id="productDetail">
        <p style={{ fontSize: "14px" }}>{name}</p>
        <p>
          <span style={{ fontWeight: "bold" }}>{`£${price}`}</span>
          <span style={{ textDecoration: "line-through", color: "red" }}>
            {`£${priceWas}`}
          </span>
        </p>
        <p>
          {quantity > 0 && (
            <span
              style={{ color: "green", fontSize: "12px" }}
            >{`${quantity} in stock`}</span>
          )}
          {isLowOnStock && quantity < 1 && (
            <span style={{ color: "red" }}>{"OUT OF STOCK"}</span>
          )}
        </p>
        {isLowOnStock && quantity == 1 && (
          <span style={{ color: "#FFD700", fontSize: "12px" }}>
            {"LOW ON STOCK"}
          </span>
        )}
      </Info>
    </ItemWrapper>
  );
};

const ItemWrapper = styled("div")<{ display: string }>`
  display: ${(props) => props.display};
  flex-direction: column;
  justify-content: space-between;
  width: 300px;
  height: 520px;
`;

const Image = styled("div")<{
  imageUrl: string;
  promotionBadge: string;
  display: string;
}>`
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.imageUrl});
  background-size: 100% 100%;
  background-repeat: no-repeat;
  border-radius: 5px 5px 0px 0px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  &:after {
    display: ${(props) => props.display};
    content: "${(props) => props.promotionBadge}";
    width: 100%;
    color: #ffff;
    background-color: rgba(255, 0, 0, 0.5);
    padding-top: 3px;
    text-align: center;
  }
  & > input[type="checkbox"] {
    margin: 20px;
  }
  & > input[type="checkbox"]:checked {
    position: relative;
  }

  & > input[type="checkbox"]:checked:after {
    content: "✓";
    display: inline-block;
    position: absolute;
    color: #fff;
    font-size: 12px;
    font-weight: 600;
    padding-bottom: 2px;
    padding-left: 2px;
    background-color: purple;
    width: 100%;
    height: 100%;
    border-radius: 2px;
  }
`;

const Info = styled("div")`
  background: #ffff;
  border-radius: 0px 0px 5px 5px;
  width: 100%;
  height: 155px;
  padding: 20px;
  & > p {
    padding: 2px;
    font-family: "Times New Roman", Times, serif !important;
    & > span {
      padding-right: 6px;
    }
  }
`;

export default Product;
