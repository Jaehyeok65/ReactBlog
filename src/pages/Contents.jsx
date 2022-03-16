  import React,{ useState, useEffect } from 'react';
  import axios from 'axios';
  import queryString from 'query-string';
  import './Contents.css';
  import { Link } from 'react-router-dom';


  function Contents(props) {

  const location = window.location.search;
  const query = queryString.parse(location);
  const url = "/modify?id="+query.id+"&pg="+query.pg+"&sz="+query.sz;
  const listurl = "/list?pg="+query.pg+"&sz="+query.sz;



    const [posts,setPosts] = useState();

    useEffect(() => {

      axios.get('http://localhost:8088/contents?id='+query.id+'&pg='+query.pg+'&sz='+query.sz)
      .then(res => {
        setPosts(res.data);
      })
    },[])


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

    function contents() {
      if(posts !== undefined) {
        return posts.contents
      }
    }



  


    return (
      <div>
        <p className='modify'>
          <Link to={url}><button>수정</button></Link>
          <button className='delete' onClick={comfirms}>삭제</button>
          </p>
        <p>제목 : {title()}</p>
        <p>내용 : {contents()}</p>
        <hr/>
        <footer>
        <p className='listurl'><Link to={listurl}><button>목록으로</button></Link></p>
        </footer>
      </div>
    );
  }

  export default React.memo(Contents);