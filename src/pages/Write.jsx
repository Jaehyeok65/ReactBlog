import React,{ useState, useEffect } from 'react';
import './Write.css';
import axios from 'axios';
import queryString from 'query-string';
import { Transition } from 'react-transition-group';

    function Writes() {

        const location = window.location.search;
        const query = queryString.parse(location);
        const url = 'http://localhost:8088/create?pg='+query.pg+"&sz="+query.sz;

        let [title,setTitle] = useState();
        let [contents,setContents] = useState();
        let [category,setCategory] = useState([]);
        let [selected, setSelected] = useState();

        useEffect( () => {
            let values = window.localStorage.getItem('userId');
            let sessionId = JSON.parse(values);
            if(sessionId !== null) {
                sessionId = sessionId.sessionId;
            }

            axios.post('http://localhost:8088/sessioncheck', {
                sessionId : sessionId
            }).then(res => {
                if(!res.data) {
                    alert('로그인이 필요합니다.');
                    document.location.href = '/login';
                }
            })

            axios.get('http://localhost:8088/category')
            .then( res => {
                setCategory(res.data);
            })

        },[])


        const posts = () => {
            if(title === undefined || contents === undefined || title === '' || contents === '' ) {
                window.alert('제목 혹은 내용을 입력해주세요')
                return;
            }
            axios.post(url, {
                title : title,
                contents : contents,
                userId : (JSON.parse(window.localStorage.getItem('userId'))).userId,
                category : selected
            })
            .then(res => {
                document.location.href = "/contents?id="+res.data.id+"&pg="+res.data.pg+"&sz="+query.sz;
            })
        }



        const handletitleChange = (e) => {
            setTitle(e.target.value);
        };

        const handleselectChange = (e) => {
            setSelected(e.target.value);
        };

        const handlecontentsChange = (e) => {
        setContents(e.target.value);
         };

       


        


        return(
            <>
            <Transition in = {true} timeout = {700} appear>
                {state => (
                    <div className={`pageSlider-${state}`}>
                    <div className='flexcontainer'>
                    <span className='item'>카테고리 선택</span>
                    <select  style = { { marginLeft : '25px', border : 'none', fontSize : '12px' } }onChange={handleselectChange}>
                    <option value = "">선택</option>
                        {category.map( category => {
                            return <option value = {category.category} >{category.category}</option>
                        })}
                    </select>
                    </div>
                      <br/>
                      <div className='flex2'>
                      <input type='text' name='title' value = {title} placeholder='제목' className='items'
                      onChange={handletitleChange}
                      />
                       <button onClick={posts} className='items'>발행</button>
                       </div>
                      <hr/>
                      <br/>
                      <br/>
                      <textarea name='contents' value = {contents} placeholder='#을 이용하여 태그를 추가해보세요' className='inputs2' cols = '20' wrap='hard' 
                      onChange={handlecontentsChange}
                      />
              </div>
                )}
            </Transition>
            </>
        );
    }

    export default React.memo(Writes);