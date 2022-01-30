/* eslint-disable */
import React, { useState } from 'react';
import './App.css';

function App() {

  let [웹툰제목,웹툰제목변경] = useState(['신의 탑', '연애혁명', '화산귀환']);
  let [숫자,숫자변경] = useState([0,0,0]);

  function 제목변경() {
    let 제목데이터 = [...웹툰제목];
    제목데이터[0] = '최강신선';
    웹툰제목변경(제목데이터);
  }
  
  function 정렬() {
    let 정렬데이터 = [...웹툰제목];
    정렬데이터[0] = '연애혁명';
    정렬데이터[1] = '신의 탑';
    웹툰제목변경(정렬데이터);
  }
  
  function 숫자변경1() {
    let 숫자데이터 = [...숫자];
    숫자데이터[0] = 숫자데이터[0] + 1;
    숫자변경(숫자데이터);
  }

  function 숫자변경2() {
    let 숫자데이터 = [...숫자];
    숫자데이터[1] = 숫자데이터[1] + 1;
    숫자변경(숫자데이터);
  }

  function 숫자변경3() {
    let 숫자데이터 = [...숫자];
    숫자데이터[2] = 숫자데이터[2] + 1;
    숫자변경(숫자데이터);
  }




  return (
    <div className="App">
    <div className="black-nav">
      <div>혁툰</div>
    </div>
    <div className="lists">
      <button onClick={제목변경}>버튼</button>
      <button onClick={정렬}>정렬</button>
      <h3> { 웹툰제목[0] } <span onClick={ 숫자변경1}>👍</span> {숫자[0]}</h3>
      <p>등록일 : 2022-01-29</p>
      <hr/>
      <h3> { 웹툰제목[1] } <span onClick={ 숫자변경2}>👍</span> {숫자[1]}</h3>
      <p>등록일 : 2022-01-29</p>
      <hr/>
      <h3> { 웹툰제목[2] }<span onClick={ 숫자변경3}>👍</span> {숫자[2]}</h3>
      <p>등록일 : 2022-01-29</p>
      <hr/>
    </div>
    </div>
  );
}

export default App;
