import React,{ useState, useEffect } from 'react';
import './Write.css';
import axios from 'axios';
import queryString from 'query-string';
import { Transition } from 'react-transition-group';

    function Writes() {

        const location = window.location.search;
        const query = queryString.parse(location);
        const url = 'http://localhost:8088/create?pg='+query.pg+"&sz="+query.sz;

        let [title,setTitle] = useState()
        let [contents,setContents] = useState()
        const [fileitem,setFileitem] = useState([]);

        useEffect( () => {

            axios.post('http://localhost:8088/sessioncheck', {
                sessionId : sessionStorage.getItem('sessionId')
            }).then(res => {
                if(!res.data) {
                    alert('로그인이 필요합니다.');
                    document.location.href = '/login';
                }
            })

        },[])


        const posts = () => {
            axios.post(url, {
                title : title,
                contents : contents,
            })
            .then(res => {
                document.location.href = "/list?pg="+res.data+"&sz="+query.sz;
            })
        }

        const onChanges = (e) => {
            let files = [...fileitem];
            let file = files.concat(e.target.files[0]);
            setFileitem(file);
            console.log(file);
           // console.log(e.target.files[0]);
        }


        const handletitleChange = (e) => {
            setTitle(e.target.value);
        };

        const handlecontentsChange = (e) => {
        setContents(e.target.value);
    };

        


        return(
            <>
            <Transition in = {true} timeout = {700} appear>
                {state => (
                      <div className={`pageSlider-${state}`} style={ { postion : 'absolute'}}>
                      <br/>
                      <input name = 'fileitem' type = 'file' multiple onChange={onChanges} />
                      <input type='text' name='title' value = {title} placeholder='제목' className='inputs'
                      onChange={handletitleChange}
                      />
                      <button onClick={posts} style = { { width : '100px', backgroundColor : 'cornflowerblue', color : 'white', borderRadius : '5px', marginLeft : '10px'}}>발행</button>
                      <hr/>
                      <br/>
                      <br/>
                      <textarea name='contents' value = {contents} placeholder='#을 이용하여 태그를 추가해보세요' className='inputs2'
                      onChange={handlecontentsChange}
                      />
              </div>
                )}
            </Transition>
            </>
        );
    }

    export default React.memo(Writes);