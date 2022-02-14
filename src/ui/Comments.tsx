import React, { RefObject, useEffect, useState } from 'react';
import styled from 'styled-components';


const Wrapper = styled.div`
  display:flex;
  flex-direction:row;
  flex-wrap:wrap;
  width:100%;
  margin-top:20px;
  padding-top:30px;
  position:relative;
  &::before {
    content:'Комментарии';
    display: block;
    font-size:14px;
    font-weight:bold;
    line-height:16px;
    margin-bottom:4px;
    color:#172b4d;
    text-align:start;
    position:absolute;
    top:0;
    left:0;
  }
`;

const Input = styled.input`
  display:block;
  width:calc(100% - 110px);
  box-sizing:border-box;
  padding:12px 6px;
  background:#fff;
  border:2px solid #c7c7c7;
  border-radius:4px;
  margin:4px 10px 20px 4px;
`;

const Button = styled.button`
  display:block;
  width:90px;
  border:none;
  font-size:12px;
  line-height:14px;
  font-weight:bold;
  text-align:center;
  color:#fff;
  background:#0079bf;
  border-radius:3px;
  padding:6px 12px;
  box-sizing:border-box;
  box-shadow:none;
  transition:.3s;
  margin:4px 0 20px 0;
  cursor:pointer;
  &:hover {
    opacity:.8;
  }
`;
const CommentSingle = styled.div`
  position:relative;
  padding-bottom:20px;
  width:100%;
`;
const CommentP = styled.p`
  background:#fff;
  font-size:12px;
  color:#0079bf;
  margin:0;
  padding:12px 6px;
  border-radius:3px;
  border:1px solid #c7c7c7;
  box-sizing:border-box;
  width:100%;
  text-align:start;
`;
const DeleteBtn = styled.button`
  box-sizing:border-box;
  background:unset;
  color:#000;
  font-size:11px;
  border:none;
  text-decoration:underline;
  position:absolute;
  bottom:5px;
  left:0;
  cursor:pointer;
  &:hover {
    text-decoration:none;
  }
`;

interface CommentsProps {
  idCart: number
}

function Comments({idCart}:CommentsProps) {

  let dataFilterCart = JSON.parse(localStorage.getItem('dataCart') || "{}").filter((curObj:{idCart:number}) => curObj.idCart === idCart)[0];
  const refInput:RefObject<HTMLInputElement> = React.createRef();
  const [comment, setComment] = useState(JSON.parse(localStorage.getItem('dataComments') || "[]") || [{idCart: 0, text: "", userName:""}]);

  useEffect(() => {
    localStorage.setItem('dataComments', JSON.stringify(comment));
  }, [comment]);

  const resultComment = comment.filter((filObj:{idCart:number, text:string}) => filObj.idCart === idCart).map((obj:{idCart:string, text:number, userName:string}, index:number) => {
    return (
      <CommentSingle key={index}>
        <CommentP>{obj.text}</CommentP>
        <DeleteBtn onClick={() => {
          setComment([...comment.slice(0,index), ...comment.slice(index + 1)])
        }}>Удалить</DeleteBtn>
      </CommentSingle>
    );
  })

  return (
      <Wrapper>
        <Input ref={refInput} placeholder='Введите свой коментарий...'/>
        <Button onClick={() => {
          setComment([...comment, {idCart:idCart, text:refInput.current?.value, userName:""}]);
        }}>Сохранить</Button>
        {resultComment}
      </Wrapper>
  );
}

export default Comments;