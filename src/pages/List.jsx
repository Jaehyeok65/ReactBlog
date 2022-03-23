  import axios from 'axios';
  import React,{ useState, useEffect, useRef} from 'react';
  import Modal from '../Components/Modal';
  import './List.css';
  import queryString from 'query-string';
  import { BsSearch } from 'react-icons/bs';




  function List() {  //변수의 유효범위 == 스코프 스코프체인?

    const inputRef = useRef(false); //데이터를 검색할 input창을 Ref로 관리.
    const location = window.location.search; //
    const query = queryString.parse(location);
    const size = query.sz;


    const [post,setPost] = useState([]); //게시글 담을 state 선언  
    //const [limit,setLimit] = useState(query.sz);
    const [page,setPage] = useState(query.pg);  //let과 var의 차이점 공부하기
    const [total,setTotal] = useState(0);  //state를 쓰는 이유와 기준에 대해서 공부하기(render에 관여) 리팩토링 과정 git commit으로 남겨놓을 것
    const [search,setSearch] = useState(false); //검색한 post와 일반 post mode를 나누기 위한 search state


    const url = 'http://localhost:8088/list?pg='+query.pg+"&sz="+query.sz;
    const pagenum = Math.ceil(total/size);
    console.log(page);

    
    useEffect(() => { //ComponentDidMount 역할 = 최초 렌더 되기전에 서버에서 데이터를 받아서 state에 저장.
      axios.get(url)
      .then(res => {
        setPost(res.data);
      });

      axios.get('http://localhost:8088/recordcounts') //pagination 정보를 서버에서 받아와서 state에 저장.
      .then(res => {
        setTotal(res.data.recordCount);
      });
    },[]);

    

    useEffect(() => {  //search일때와 search가 아닐 때 분기해서 axios 실행
    if(!search){
      axios.get('http://localhost:8088/list?pg='+page+"&sz="+size)
      .then(res => {
        setPost(res.data);
      })
    }
    else {
      axios.post('http://localhost:8088/search?pg='+page+"&sz="+size, {  //검색 post 결과를 받아옴
        title : inputRef.current.value
      }).then(res => {
        setPost(res.data);
      })
    }
    },[page,size]);

  
  

    const onSearch = async() => {

      const response = await axios.post('http://localhost:8088/search', {  //검색 post 결과를 받아옴
        title : inputRef.current.value
      });

      const response2 = await axios.post('http://localhost:8088/searchcounts', { //검색 결과 총 record를 받아옴
        title : inputRef.current.value
      });


      setTotal(response2.data.recordCount);  //검색 결과 총 record 설정

      setPost(response.data);    //검색 결과

      setSearch(true);  //검색한 상태임을 알려줌
      
    }


    
    

   



      return(
        <div>
        <hr />
        <span style={ { marginLeft : '780px'}}>게시글 검색</span>
        <input type ='text' ref = {inputRef} style = { {marginLeft : '20px', borderRadius : '5px', borderColor : 'aliceblue'}} />
        <button type="button" className="btn" onClick={onSearch}><BsSearch style={ { marginBottom :'5px'}}/></button>
        <hr />
            <div>
            {post.map(post => {
              return <Modal title={post.title} contents={String(post.contents).substring(0,77)} id = {post.id} pg = {page} sz = {size} key = {post.id} />
            })}
            </div>
            <footer className = 'footers'>
              <button className='custom-btn btn-16' onClick={() => setPage(page - 1)} disabled={page === 1}>&lt;</button>
              {Array(pagenum).fill().map((v,i) => {
                return <button className='custom-btn btn-16' key = {i+1} onClick={() => setPage(i+1)}
                style= { page === i + 1 ? {color : 'skyblue'} : null}
                >{i + 1}</button>
              })}
              <button className='custom-btn btn-16' onClick={() => setPage(page + 1)} disabled={page === pagenum}>&gt;</button>
            </footer>
          </div>
      );
            
  }

  export default React.memo(List);