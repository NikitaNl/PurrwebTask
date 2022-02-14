import React, {useState, useEffect} from 'react';
import Cart from '../ui/Cart';
import PopupCart from './PopupCart';
import PopupUser from './PopupUser';
import styled from 'styled-components';

const BoardDesk = styled.div`
  display:flex;
  flex-direction:row;
  align-items:flex-start
  background:#121212;
  overflow-x:auto;
  padding: 10px 30px;
  box-sizing:border-box;
  min-height:100vh;
`;

const Columns = styled.div`
  background:#ebecf0;
  border-radius:8px;
  padding:10px 5px;
  box-sizing:border-box;
  margin:10px 5px;
  display:flex;
  flex-direction:column;
  height:100%;
  width:272px;
`;

const Title = styled.textarea`
  height:32px;
  font-size:14px;
  line-height:22px;
  padding:5px;
  resize:none;
  box-shadow:unset;
  box-sizing:border-box;
  border:2px solid transparent;
  background:transparent;
  color:#172b4d; 
`;
// interface LinkCartProps {
//   idCart: number
// }
const LinkCart = styled.button`
  background:#fff;
  border:none;
  box-sizing:border-box;
  border-radius:4px;
  padding:6px 12px;
  box-shadow:0px 0px 2px 0px rgb(0,0,0, 10%);
  outline:none;
  cursor:pointer;
  font-size:13px;
  line-height:16px;
  text-align:start;
  transition:.3s;
  color:#172b4d;
  margin-bottom:8px;
`;

export const isEmpty = (str:string) => {
  if (str.trim() === "") {
    return true;
  } else {
    return false;
  }
};

function Board() {

  const [columns, setColumns] = useState(JSON.parse(localStorage.getItem('dataColumns') || "[]") || [ { id:1, title:'TODO'}, {id:2, title:'In Progress'}, {id:3, title:'Testing'}, {id:4, title:'Done'}]);
  const [carts, setCarts] = useState(JSON.parse(localStorage.getItem('dataCart') || "[]") || [{ idCart:1, titleCol: 1, nameCart: "", desciption:""}]);
  const [showPopup, setShowPopup] = useState(false);  
  const [showPopupUser, setShowPopupUser] = useState(localStorage.getItem('userName') || "");  
  const [currentCart, setCurrentCart] = useState({idCart:1, titleCol:1, nameCart:"", description:""});

  useEffect(() => {
    localStorage.setItem('dataColumns',JSON.stringify(columns));
  },[columns]);

  useEffect(() => {
    localStorage.setItem('dataCart', JSON.stringify(carts));
  }, [carts]);

  useEffect(()=> {
    localStorage.setItem('userName', showPopupUser);
  }, [showPopupUser])

  const addCart = (title:string, nameCart:string, increment:number) => {
    setCarts([...carts, {idCart:increment, titleCols:title, nameCart:nameCart, desciption:""}])
  };

  const resultLinkCart = (id:number,currentNameCol:string) => {
    let newCarts = carts.filter((newObj:{titleCols:number, nameCart:string}) => newObj.titleCols === id)
    return newCarts.map((obj:{idCart:number, titleCols:string, nameCart:string, description:string}, index:number) => {
      return (
        <LinkCart key={index} onClick={() =>{
          setShowPopup(true);
          setCurrentCart({idCart:obj.idCart, titleCol:id, nameCart:obj.nameCart, description:obj.description})
        }}>{obj.nameCart}</LinkCart>
      )
    })
  }

  const resultCart = columns.map((obj:{title:string, id:number}, index:number) => {
    return (
      <Columns key={index}>
        <Title value={obj.title} onInput={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
          setColumns([...columns.slice(0, index), { id:obj.id, title:event.currentTarget.value} ,...columns.slice(index + 1)]);
        }}>{obj}</Title>
        {resultLinkCart(obj.id,obj.title)}
        <Cart titleCol={columns[index].id} addCart={addCart}/>
      </Columns>
    );
  });

  const changeNameCart = (idCart:number, value:string) => {
    let arrCartCur = carts.filter((filterObj:{idCart:number, titleCols:string, nameCart:string}) => filterObj.idCart === idCart);
    arrCartCur[0].nameCart = value;
    let index = carts.indexOf(arrCartCur[0]);
    setCarts([...carts.slice(0, index), arrCartCur[0] , ...carts.slice(index + 1)]);
  }
  const changeDescCart = (idCart:number, value:string) => {
    let arrCartCur = carts.filter((filterObj:{idCart:number, titleCols:string, nameCart:string, description:string}) => filterObj.idCart === idCart);
    arrCartCur[0].description = value;
    let index = carts.indexOf(arrCartCur[0]);
    setCarts([...carts.slice(0, index), arrCartCur[0] , ...carts.slice(index + 1)]);
  }
  const showPopupModal = (value:boolean) => {
    setShowPopup(value);
  }  

  const updateName = (value:string) => {
    setShowPopupUser(value)
  }

  return (
    <>
      <BoardDesk>
        {resultCart}
      </BoardDesk>
      {(showPopup)? <PopupCart showPopupModal={showPopupModal} changeNameCart={changeNameCart} changeDescCart={changeDescCart} nameCart={currentCart.nameCart} titleColumns={currentCart.titleCol} idCart={currentCart.idCart} descCart={currentCart.description} /> : <></>}
      {(isEmpty(showPopupUser || ""))? <PopupUser updateName={updateName}/> : <></>}
    </>
  );
}

export default Board;
