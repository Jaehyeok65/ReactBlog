import React, { useState, useEffect } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import axios from 'axios';


const Nav = () => {

    const listurl = '/list?pg=1&sz=10';
    const writeurl = '/write?pg=1&sz=10';
    const homeurl = '/?pg=1&sz=10';

    const [login, setLogin] = useState(false); //login이 true면 로그인 상태 false면 비로그인 상태

    useEffect( () => {  //로그인 상태 체크 (세션 스토리지의 세션 id가 유효한지)
      let values = window.localStorage.getItem('userId');
      let sessionId = JSON.parse(values);
      if(sessionId !== null) {
        sessionId = sessionId.sessionId;
      }
      axios.post('http://localhost:8088/user/sessioncheck', {
        sessionId : sessionId
      }).then( res => {
        setLogin(res.data);
      })
    },[])

    

    const Logout = () => {
      
      axios.post('http://localhost:8088/user/logout', {
        userId : JSON.parse(window.localStorage.getItem('userId')) === null ? null : (JSON.parse(window.localStorage.getItem('userId'))).userId
      }).then ( res => {
        if(res.data) {
          alert('로그아웃이 완료되었습니다.');
          window.localStorage.clear();
          document.location.href='/login';
        }
      })

    }

  
    

    return (
        <>
        <head>
        <meta charSet='UTF-8' />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous"></link>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
        </head>
      <div className='navbar'>
        <div className='margin2'>
        Blog
        </div>
      <ul className='navmenu'>
        <li><Link to={homeurl} style={{ textDecoration: 'none', color :'white' }}>블로그 홈</Link></li>
        <li><Link to={writeurl} style={{ textDecoration: 'none', color :'white' }}>게시글 쓰기</Link></li>
        <li><Link to={listurl} style={{ textDecoration: 'none', color :'white' }} >포스트 목록보기</Link></li>
        {!login ? <li><Link to='/login' style={{ textDecoration: 'none', color :'white' }}>로그인</Link></li> : <button onClick = {Logout} style = { { color : 'white', textDecoration : 'none', border : 'none', fontSize : '12px', backgroundColor : 'cornflowerblue'}}>로그아웃</button>}
        <li><Link to ='/signUp' style={{ textDecoration: 'none', color :'white' }}>회원가입</Link></li>
        <li><Link to ='/Password' style={{ textDecoration: 'none', color :'white' }}>비밀번호 찾기</Link></li>
      </ul>
      </div>
        </>
    )
}

export default Nav;