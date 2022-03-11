/* eslint-disable */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Contents from '../pages/Contents';

function Modal(props) {

  const url = "/contents?id="+props.id;

  return (
    <div>
      <Link to={url} style={{ textDecoration: 'none', color : 'black' }}><h4>제목 : {props.title}</h4></Link>
      <p>내용 : {props.contents}</p>
      <hr/>
    </div>
  );
}

export default Modal;
