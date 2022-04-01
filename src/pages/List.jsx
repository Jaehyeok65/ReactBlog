  import axios from 'axios';
  import React,{ useState, useEffect, useRef} from 'react';
  import Modal from '../Components/Modal';
  import './List.css';
  import queryString from 'query-string';
  import { BsSearch } from 'react-icons/bs';
  import Footer from './Footer';
  import { Transition } from 'react-transition-group';




  function List(props) {  //변수의 유효범위 == 스코프 스코프체인?

    const inputRef = useRef(false); //데이터를 검색할 input창을 Ref로 관리.
    const location = window.location.search; //
    const query = queryString.parse(location);
    const size = query.sz;


    const [post,setPost] = useState([]); //게시글 담을 state 선언  
    //const [limit,setLimit] = useState(query.sz);
    const [page,setPage] = useState(query.pg);  //let과 var의 차이점 공부하기
    const [total,setTotal] = useState(0);  //state를 쓰는 이유와 기준에 대해서 공부하기(render에 관여) 리팩토링 과정 git commit으로 남겨놓을 것
    const [search,setSearch] = useState(false); //검색한 post와 일반 post mode를 나누기 위한 search state
    const [defaultPage,setDefaultPage] = useState(0); //pagenation을 관리하기 위한 state

    const url = 'http://localhost:8088/list?pg='+query.pg+"&sz="+query.sz;
    const pagenum = Math.ceil(total/size);

    

    
    useEffect(() => { //ComponentDidMount 역할 = 최초 렌더 되기전에 서버에서 데이터를 받아서 state에 저장.
      axios.get(url)
      .then(res => {
        setPost(res.data);
      });

      const getRecord = async() => {

      const response = await axios.get('http://localhost:8088/recordcounts') //pagination 정보를 서버에서 받아와서 state에 저장.
      
      setTotal(response.data.recordCount);

      const querypage = parseInt(query.pg) % 5 === 0 ? parseInt(query.pg) - 1 : parseInt(query.pg);

      const pg = Math.floor(parseInt(querypage) / 5) * 5;

      setDefaultPage(pg);

    }

     getRecord();
    
    },[]);

    //console.log(window.sessionStorage.getItem('sessionId'));

    

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

      setPage(1); //검색했으므로 1페이지로 설정
      
    }

    const LeftButton = () => {

      const defalutnum = defaultPage - 5 < 1 ? 0 : defaultPage - 5; //1보다 작을 순 없으므로 1보다 작다면 1로 수정
      const pages = parseInt(page);
      const dp = pages - 5 < 1 ? 1 : pages - 5;
      console.log(dp);

      setDefaultPage(defalutnum);
      setPage(dp);
    }

    const RightButton = () => {

      const defalutnum = defaultPage + 5 > pagenum ? pagenum - pagenum % 5 : defaultPage + 5; 
      const pages = parseInt(page);
      const dp = pages + 5 > pagenum ? pagenum : pages + 5;
      console.log(dp);

      setDefaultPage(defalutnum);
      setPage(dp);
    }


    //console.log(defaultPage);


      return(
        <>
        <Transition in = {true} timeout = {700} appear>
        {state => (
          <div className={`pageSlider-${state}`}>
           <br/>
        <div style={ { position : 'absolute'}}>
        <span style={ { marginLeft : '780px' , fontWeight : 'bold'}}>게시글 검색</span>
        <input type ='text' ref = {inputRef} style = { {marginLeft : '20px', borderRadius : '5px', borderColor : 'aliceblue'}} />
        <button type="button" className="btn" onClick={onSearch}><BsSearch style={ { marginBottom :'5px'}}/></button>
        <hr />
            <div>
            {post.map(post => {
              return <Modal title={post.title} contents={String(post.contents).substring(0,77)} id = {post.id} pg = {page} sz = {size} key = {post.id} />
            })}
            </div>
            <footer className = 'footers'>
              <button className='custom-btn btn-16' onClick={LeftButton} disabled={page === 1}>&lt;</button>
              {Array(defaultPage >= pagenum - pagenum % 5 ? pagenum % 5 : 5).fill().map((v,i) => {
                return <button className='custom-btn btn-16' key = {i + 1} onClick={() => setPage(defaultPage + i + 1)}
                style= { page === i + 1 ? {color : 'skyblue'} : null}
                >{defaultPage + i + 1}</button>
              })}
              <button className='custom-btn btn-16' onClick={RightButton} disabled={page === pagenum}>&gt;</button>
            </footer>
            <Footer />
            </div>
          </div>
        )}
            </Transition>
          </>
      );
            
  }

  export default React.memo(List);