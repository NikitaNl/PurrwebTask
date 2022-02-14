import React, { RefObject, useState } from 'react';
import styled from 'styled-components';

const Button = styled.button`
  padding:4px 8px 4px 26px;
  border-radius:3px;
  background:transparent;
  color:#5e6c84;
  font-size:12px;
  line-height:16px;
  border:none;
  box-sizing:border-box;
  box-shadow:none;
  cursor:pointer;
  transition:.3s;
  position:relative;
  text-align:start;
  width:100%;

  &:hover {
    color:#172b4d;
    background:rgb(9 30 66 / 8%);
  }
  &:before {
    position:absolute;
    top:4px;
    left:6px;
    content:'';
    display:block;
    width:15px;
    height:15px;
    background-repeat:no-repeat;
    background-size:contain;
    background-position:none;
    background-image: url("data:image/svg+xml,%3Csvg width='46' height='45' viewBox='0 0 46 45' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M22.9724 0C10.5463 0 0.472656 10.0737 0.472656 22.4998C0.472656 34.9254 10.5462 45 22.9721 45C35.3981 45 45.4727 34.9254 45.4727 22.4998C45.4727 10.0737 35.3982 0 22.9724 0ZM32.4645 24.9749H25.2241V32.5452C25.2236 33.8146 24.1946 34.8436 22.9249 34.8436C21.6547 34.8436 20.6257 33.8146 20.6257 32.5444V24.9749H13.578C12.3081 24.9745 11.2795 23.9455 11.2788 22.6757C11.2788 21.4063 12.3082 20.3768 13.578 20.3765L20.6255 20.377V13.6584C20.6255 12.3885 21.655 11.3592 22.9244 11.3592C24.1946 11.3592 25.2241 12.3887 25.2236 13.6584L25.2241 20.3764L32.4638 20.3771C33.7337 20.3764 34.7634 21.4061 34.763 22.6763C34.7634 23.9462 33.7337 24.9749 32.4645 24.9749Z' fill='%23172B4D'/%3E%3C/svg%3E ");
  }
`;

const CartEditorDiv = styled.div`
  display:flex;
  flex-direction:row;
  flex-wrap:wrap;
`;

const TextareaEdit = styled.textarea`
  resize:none;
  width:100%;
  box-sizing:border-box;
  box-shadow:none;
  border:2px solid #c7c7c7;
  padding:4px 8px;
  color:#5e6c84;
  font-size:13px;
  line-height:16px;
  transition:.3s;
  margin-bottom:10px;

  &:focus{
    border-color:#172b4d;
  }
`;
const ButtonSave = styled.button`
  border-radius:3px;
  border:none;
  display:inline-flex;
  box-shadow:none;
  box-sizing:none;
  background-color:#0079bf;
  font-size:12px;
  line-height:14px;
  text-aling:center;
  font-weight:bold;
  padding:6px 12px;
  cursor:pointer;
  transition:.3s;
  color:#fff;
  &:hover {
    background-color:#026aa7;
  }
`;
const CloseButton = styled.button`
  width:26px;
  height:26px;
  border:none;
  border-radius:50%;
  display:block;
  background-color:transparent;
  background-image: url("data:image/svg+xml,%3Csvg width='48' height='48' viewBox='0 0 48 48' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg clip-path='url(%23clip0_458_4673)'%3E%3Cpath d='M31.2375 11.8196L24.0613 18.9958C23.8282 19.2289 23.4502 19.2289 23.217 18.9958L16.0409 11.8196C14.8753 10.654 12.9852 10.654 11.8196 11.8196C10.654 12.9852 10.654 14.8753 11.8196 16.0409L18.9958 23.217C19.2289 23.4502 19.2289 23.8282 18.9958 24.0613L11.8196 31.2375C10.654 32.4031 10.654 34.2931 11.8196 35.4587C12.9852 36.6243 14.8753 36.6243 16.0409 35.4587L23.217 28.2826C23.4502 28.0494 23.8282 28.0494 24.0613 28.2826L31.2375 35.4587C32.4031 36.6243 34.2931 36.6243 35.4587 35.4587C36.6243 34.2931 36.6243 32.4031 35.4587 31.2375L28.2826 24.0613C28.0494 23.8282 28.0494 23.4502 28.2826 23.217L35.4587 16.0409C36.6243 14.8753 36.6243 12.9852 35.4587 11.8196C34.2931 10.654 32.4031 10.654 31.2375 11.8196Z' fill='%235B5B5B'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0_458_4673'%3E%3Crect width='33.4308' height='33.4308' fill='white' transform='translate(0 23.6392) rotate(-45)'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E ");
  background-position:center;
  background-size:20px 20px;
  background-repeat:no-repeat;
  cursor:pointer;
  transition:.3s;
  &:hover {
    opacity:.7;
  }
`;

type CardProps = {
  addCart: Function,
  titleCol: string
}

function Cart({addCart, titleCol} : CardProps) {

  const [showEdit, setEditState] = useState(false);
  const [increment, setIncrement] = useState(1);

  const refTextarea:RefObject<HTMLTextAreaElement> = React.createRef();

  // const addCart = () => {
  //   return refTextarea.current.value;
  // }

  let cartEditor = <CartEditorDiv>
                    <TextareaEdit defaultValue={""} ref={refTextarea} placeholder="Введите заголовк для этой карточки"></TextareaEdit>
                    <ButtonSave onClick={()=> {
                      setIncrement(increment+1);
                      addCart(titleCol, refTextarea.current?.value || "", increment, "");
                    }}>Сохранить</ButtonSave>
                    <CloseButton onClick={() => {setEditState(false)}}></CloseButton>
                  </CartEditorDiv>;
  let trigerShowEditor = <Button onClick={() => {setEditState(true)}}>Добавить новую карточку</Button>;

  return (
    <div className='Cart'>
      { showEdit ? cartEditor : trigerShowEditor }      
    </div>
  )
}

export default Cart;