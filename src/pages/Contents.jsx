  import React,{ useState, useEffect } from 'react';
  import axios from 'axios';
  import queryString from 'query-string';
  import './Contents.css';
  import { Link } from 'react-router-dom';
  import { Transition } from 'react-transition-group';
  import Comment from './Comment';


  function Contents(props) {

  const location = window.location.search;
  const query = queryString.parse(location);
  const url = "/modify?id="+query.id+"&pg="+query.pg+"&sz="+query.sz;
  const listurl = "/list?pg="+query.pg+"&sz="+query.sz;



    const [posts,setPosts] = useState();
    const [admin,setAdmin] = useState(null);

    useEffect(() => {

      fetchs();

      /*axios.post('http://localhost:8088/contents?id='+query.id+'&pg='+query.pg+'&sz='+query.sz, {
        sessionId : JSON.parse(window.localStorage.getItem('userId')) === null ? null : (JSON.parse(window.localStorage.getItem('userId'))).sessionId
    })
      .then(res => {
        if(res.data.title === null) {
          alert('로그인이 필요합니다.');
          document.location.href = '/login';
        }
        setPosts(res.data);
        setAdmin(res.data.userId);
      })*/
    },[])

    const fetchs = async() => {
      
        const response = await axios.post('http://localhost:8088/contents?id='+query.id+'&pg='+query.pg+'&sz='+query.sz, {
              sessionId : JSON.parse(window.localStorage.getItem('userId')) === null ? null : (JSON.parse(window.localStorage.getItem('userId'))).sessionId
               })
        
        if(response.data === null) {
          alert('로그인이 필요합니다.');
          document.location.href = '/login';
        }
        
        setPosts(response.data);
        setAdmin(response.data.userId);
    }

    


    const title = () => {
      if(posts !== undefined) {
        return posts.title
      }
    }

    const comfirms = () => {
      if(window.confirm('삭제하시겠습니까?')) {
        deletes();
      }
      else {
        console.log('삭제불가');
      }
    }

    const deletes = () => {
      axios.get('http://localhost:8088/delete?id='+query.id+'&pg='+query.pg+'&sz='+query.sz)
      .then(res => {
        if(res.data === true) {
          alert('삭제가 완료되었습니다.');
          document.location.href = listurl;
        }
        else {
          alert('삭제가 완료되지 않았습니다.');
        }
      })
    }

    const contents = () =>  {
      if(posts !== undefined) {
        return posts.contents
      }
    }

    

  


    return (
      <Transition in = {true} timeout = {700} appear>
        {state => (
           <div style={ { position : 'absolute'}} className={`pageSlider-${state}`}>
           { admin ===  (JSON.parse(window.localStorage.getItem('userId'))).userId ? <p className='modify'>
             <Link to={url}><button>수정</button></Link>
             <button className='delete' onClick={comfirms}>삭제</button>
             </p> : null }
           <p>제목 : {title()}</p>
           <p>내용 : {contents()}</p>
           <hr style={ {width : '1120px'}}/>
           <Comment contentId = {query.id} userId = {admin} />
           <footer>
           <p className='listurl' style={ { marginLeft : '1040px'}}><Link to={listurl}><button>목록으로</button></Link></p>
           </footer>
         </div>
        )}
     
      </Transition>
    );
  }

  export default React.memo(Contents);