import axios from 'axios';
import React,{ useState, useEffect} from 'react';
import Modal from '../Components/Modal';
import './List.css';


function List() {

var [post,setPost] = useState([]); //게시글 담을 state 선언
var [limit,setLimit] = useState(10);
var [page,setPage] = useState(1);
var [total,setTotal] = useState(0);


  
  useEffect(function() { //ComponentDidMount 역할 = 최초 렌더 되기전에 서버에서 데이터를 받아서 state에 저장.
    axios.get('http://localhost:8088/list')
    .then(res => {
      setPost(res.data);
    })
    console.log('이게 실행되는지 테스트');

    axios.get('http://localhost:8088/recordcounts')
    .then(res => {
      setPage(res.data.pg);
      setLimit(res.data.sz);
      setTotal(res.data.recordCount);
    })
  },[]);

  useEffect(function() {
    axios.get('http://localhost:8088/list?pg='+page+'&sz='+limit)
    .then(res => {
      setPost(res.data);
    })
  },[page,limit]);

    
  const pagenum = Math.ceil(total / limit);
  console.log(total);



    return(
        <div>
          <div>
          {post.map(post => {
            return <Modal title={post.title} contents={post.contents} />
          })}
          </div>
          <footer className = 'footers'>
            <button className='custom-btn btn-16' onClick={() => setPage(page - 1)} disabled={page === 1}>&lt;</button>
            {Array(pagenum).fill().map((v,i) => {
              return <button className='custom-btn btn-16' key = {i+1} onClick={() => setPage(i+1)}
              aria-current={page === i + 1 ? "page" : null}
              >{i + 1}</button>
            })}
            <button className='custom-btn btn-16' onClick={() => setPage(page + 1)} disabled={page === pagenum}>&gt;</button>
          </footer>
        </div>
    );
}

export default List;