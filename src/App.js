/* eslint-disable */
import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { Link, Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import Home from './pages/Home';
import Write from './pages/Write';
import List from './pages/List';
import About from './pages/About';



function App() {




 




  return (
    <div>
      <head>
        <meta charSet='UTF-8' />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous"></link>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
      </head>

      <div className='nav'>
      <div className='margin1'>
      <span className='item1'>
        Blog
      </span>
      <span className='item2'>
        <input type ='text' className='input-bar' />
      </span>
      <span className='item3'>
      <button type="button" class="btn btn-light">검색</button>
      </span>
      <span className='item4'>
      <button type="button" class="btn btn-success">로그인</button>
      </span>
      </div>
      </div>
      <Router>
      <div className='nav2'>
        <div className='margin2'>
        <span className='span1'><Link to=''>블로그 홈</Link></span>
        <span className='span2'><Link to='write'>게시글 쓰기</Link></span>
        <span className='span3'><Link to='list'>포스트 목록보기</Link></span>
        <span className='span6'>블로그 마켓 가입</span>
        <span className='span7'>블로그팀 공식 블로그</span>
        </div>
      </div>
      <article className='margin1'>
        <hr />
        <span>게시글</span>
        <hr />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/list' element={<List />} />
          <Route path='/write' element={<Write />} />
          <Route path='/about' element={<About />} />
        </Routes>
      </article>
      </Router>
      <footer className='footer'>
      <div className='margin1'>
        <span className='span8'>이용약관</span>
        <span className='span9'>블로그 서비스 운영정책</span>
        <span className='span10'>개인정보처리방침</span>
        <span className='span11'>책임의 한계와 법적고지</span>
        <span className='span12'>글 권리 보호하기</span>
        <span className='span13'>게시중단요청서비스</span>
        </div>
      </footer>
    </div>
  );
}


export default App;
