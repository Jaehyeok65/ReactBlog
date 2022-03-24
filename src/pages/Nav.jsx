import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';


const Nav = () => {

    const listurl = '/list?pg=1&sz=10';
    const writeurl = '/write?pg=1&sz=10';
    const homeurl = '/?pg=1&sz=10';

    return (
        <>
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
        <span className='item4'>
        </span>
        </div>
      </div>
      <div className='nav2'>
        <div className='margin2'>
        <span className='span1'><Link to={homeurl}>블로그 홈</Link></span>
        <span className='span2'><Link to={writeurl}>게시글 쓰기</Link></span>
        <span className='span3'><Link to={listurl}>포스트 목록보기</Link></span>
        <span className='span6'><Link to='/login'>로그인</Link></span>
        <span className='span7'><Link to ='/signUp'>회원가입</Link></span>
        <span className='span8'><Link to ='/Password'>비밀번호 찾기</Link></span>
        </div>
      </div>
        </>
    )
}

export default Nav;