import React, {RefObject, useState, useEffect} from 'react';
import styled from 'styled-components';

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
  min-height:auto;
  margin:48px auto 80px;
  background-color: #f4f5f7;
  border-radius: 2px;
  padding:25px 15px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position:relative;
`;
const Label = styled.p`
  margin:0;
  margin-bottom:12px;
  font-size:16px;
  line-height:20px;
  font-weight:bold;
  text-align:start;
  color:#000;
`;
const InputName = styled.input`
  border:2px solid #c7c7c7;
  background:#fff;
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
  margin-bottom:10px;
  border-radius:3px;
  &:focus {
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

interface PropsPopupUser {
  updateName:Function
}

function PopupUser({updateName}:PropsPopupUser) {

  // const [userName, setUserName] = useState(localStorage.getItem('userName') || "");
  const refInput:RefObject<HTMLInputElement> = React.createRef(); 

  // useEffect(()=> {
  //   localStorage.setItem('userName', userName);
  // }, [userName])

  return (
    <PopupBG>
      <Modal>
        <Label>Введите своё имя/никнейм</Label>
        <InputName ref={refInput} placeholder='Пример: Иван или pro100stas'/>
        <ButtonSave onClick={() => {
          // setUserName(refInput.current?.value || "");
          if(refInput.current?.value !== "") {
            updateName(refInput.current?.value || "");
          }
        }}>Сохранить</ButtonSave>
      </Modal>
    </PopupBG>
  );
}

export default PopupUser;