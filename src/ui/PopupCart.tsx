import React, { RefObject, useState} from 'react';
import styled from 'styled-components';
import Comments from '../ui/Comments';

const PopupBG = styled.div`
  position:fixed;
  top:0;
  left:0;
  right:0;
  bottom:0;
  width:100%;
  height:100%;
  background:rgb(0,0,0,25%);
  z-index:20;
  overflow:auto;
`;
const Modal = styled.div`
  width:500px;
  min-height:700px;
  margin:48px auto 80px;
  background-color: #f4f5f7;
  border-radius: 2px;
  padding:25px 15px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position:relative;
`;
const TextareaTitle = styled.textarea`
  border:2px solid transparent;
  background:transparent;
  font-size:13px;
  line-height:16px;
  box-sizing:border-box;
  box-shadow:none;
  color:#172b4d;
  padding:4px 8px;
  height:30px;
  width:100%;
  resize:none;
  transition:.3s;
  &:focus {
    border-color:#172b4d;
  }
`;
const SpanTitleCol = styled.span`
  color:#5e6c84;
  margin:4px 8px 4px 2px;
  font-size:12px;
  line-height:14px;
  display:inline-block;
`;
const ButtonAdd = styled.button`
  width:100%;
  border:none;
  border-radius:3px;
  background-color: rgb(9 30 66 / 4%);
  box-shadow: none;
  display: block;
  min-height: 40px;
  padding: 8px 12px;
  text-decoration: none;
  color:#172b4d;
  font-size:12px;
  line-height:18px;
  text-align:start;
  cursor:pointer;
  transition:.3s;
  &:hover {
    background-color:rgb(9 30 66 / 10%);
  }
`;
const DescEditor = styled.div`
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
const Description = styled.p`
  margin:10px 6px 15px;
  font-size:12px;
  line-height:14px;
  color:#0079bf;
  text-align:start;
  background:transparent;
`;
const CloseModal = styled.button`
  width: 26px;
  height: 26px;
  border: none;
  border-radius: 50%;
  display: block;
  background-color: transparent;
  background-image: url("data:image/svg+xml,%3Csvg width='48' height='48' viewBox='0 0 48 48' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg clip-path='url(%23clip0_458_4673)'%3E%3Cpath d='M31.2375 11.8196L24.0613 18.9958C23.8282 19.2289 23.4502 19.2289 23.217 18.9958L16.0409 11.8196C14.8753 10.654 12.9852 10.654 11.8196 11.8196C10.654 12.9852 10.654 14.8753 11.8196 16.0409L18.9958 23.217C19.2289 23.4502 19.2289 23.8282 18.9958 24.0613L11.8196 31.2375C10.654 32.4031 10.654 34.2931 11.8196 35.4587C12.9852 36.6243 14.8753 36.6243 16.0409 35.4587L23.217 28.2826C23.4502 28.0494 23.8282 28.0494 24.0613 28.2826L31.2375 35.4587C32.4031 36.6243 34.2931 36.6243 35.4587 35.4587C36.6243 34.2931 36.6243 32.4031 35.4587 31.2375L28.2826 24.0613C28.0494 23.8282 28.0494 23.4502 28.2826 23.217L35.4587 16.0409C36.6243 14.8753 36.6243 12.9852 35.4587 11.8196C34.2931 10.654 32.4031 10.654 31.2375 11.8196Z' fill='%235B5B5B'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0_458_4673'%3E%3Crect width='33.4308' height='33.4308' fill='white' transform='translate(0 23.6392) rotate(-45)'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E");
  background-position: center;
  background-size: 20px 20px;
  background-repeat: no-repeat;
  cursor: pointer;
  -webkit-transition: .3s;
  transition: .3s;
  position:absolute;
  top:10px;
  right:10px;
`;

type PopupProps = {
  titleColumns: number,
  nameCart:string,
  idCart:number,
  descCart:string,
  changeDescCart:Function,
  changeNameCart: Function,
  showPopupModal:Function
}

function PopupCart({titleColumns, nameCart, idCart, changeNameCart, descCart, changeDescCart, showPopupModal}: PopupProps) {

  const refTextareaDesc:RefObject<HTMLTextAreaElement> = React.createRef();

  const [showEdit, setShowEdit] = useState(false);
  let dataColumnIsCart = JSON.parse(localStorage.getItem('dataColumns') || "{}").filter((colObj:{id:number, title:string}) => colObj.id === titleColumns);
  const [cartCurrent, setCartCurrent] = useState({idCart:idCart, titleCols:titleColumns, nameCart:nameCart} || { idCart:1, titleCol: "", nameCart: ""});
  const [descrip, setDescrip] = useState(descCart);

  const blockEdit =  <DescEditor>
                      <TextareaEdit ref={refTextareaDesc} onChange={(event:React.ChangeEvent<HTMLTextAreaElement>) => {
                        setDescrip(event.target.value || "");
                      }} placeholder='Добавить более подробное описание...'></TextareaEdit>
                      <ButtonSave onClick={(event) => {
                        changeDescCart(idCart, refTextareaDesc.current?.value || "");
                      }}>Сохранить</ButtonSave>
                      <CloseButton onClick={() => setShowEdit(false)}></CloseButton>
                    </DescEditor>

  const trigerEdit = <ButtonAdd onClick={() => setShowEdit(true)}>Добавить более подробное описание...</ButtonAdd>

  return (
    <PopupBG>
      <Modal>
        <TextareaTitle onChange={(event) => {
          setCartCurrent({idCart:idCart, titleCols: titleColumns, nameCart: event.target.value});
          changeNameCart(idCart, event.target.value);
        }}>{nameCart}</TextareaTitle>
        <SpanTitleCol>в колонке {dataColumnIsCart[0].title}</SpanTitleCol>
        <div className="popup-wrap-description">
          <p className="popup-wrap-description__title">Описание</p>
          <Description>{descrip}</Description>
          {(showEdit) ? blockEdit : trigerEdit}
        </div>
        <Comments idCart={idCart} />
        <CloseModal onClick={() => {
          showPopupModal(false);
        }}></CloseModal>
      </Modal>
    </PopupBG>
  );
}

export default PopupCart;