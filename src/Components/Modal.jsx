/* eslint-disable */
import React, { useState } from 'react';


function Modal(props) {

  return (
    <div>
      <h4>제목 : {props.title}</h4>
      <p>내용 : {props.contents}</p>
      <hr/>
    </div>
  );
}

export default Modal;
