    import React, { useState, useEffect } from 'react';
    import { Link } from 'react-router-dom';
    import queryString from 'query-string';
    import './Modify.css';
    import axios from 'axios';
    import { Transition } from 'react-transition-group';



    function Modify() {


        const [inputs, setInputs] = useState({
            title : '',
            contents : '',
        });

        const location = window.location.search;
        const query = queryString.parse(location);
        const listurl = "/list?pg="+query.pg+"&sz="+query.sz;
        const updateurl = 'http://localhost:8088/update?id='+query.id+"&pg="+query.pg+"&sz="+query.sz;

        useEffect(() => {

            axios.post('http://localhost:8088/contents?id='+query.id+'&pg='+query.pg+'&sz='+query.sz, {
                sessionId : (JSON.parse(window.localStorage.getItem('userId'))).sessionId
            })
            .then(res => {
                setInputs({title : res.data.title, contents : res.data.contents});
                console.log(res.data);
            })
        },[])

        const onChange = (e) => {
            const { name, value } = e.target;
            setInputs( {
                ...inputs,
                [name] : value
            });
        }

        
        const updates = () => {
            axios.post(updateurl, {
                id : query.id,
                title : inputs.title,
                contents : inputs.contents,
                userId : (JSON.parse(window.localStorage.getItem('userId'))).userId
            })
            .then(res => {
                document.location.href = "/contents?id="+res.data.id+"&pg="+query.pg+"&sz="+query.sz;
            })
        }


        return(
            <Transition in = {true} timeout = {700} appear>
                {state => (
                      <div style={ { postion : 'absolute'}} className={`pageSlider-${state}`}>
                      <input type='text' name='title' value = {inputs.title} placeholder='제목' className='inputs'
                          onChange={onChange}
                          />
                          <button onClick={updates}>수정</button>
                          <hr/>
                          <br/>
                          <br/>
                          <textarea name='contents' value = {inputs.contents} placeholder='#을 이용하여 태그를 추가해보세요' className='inputs2'
                          onChange={onChange}
                          />
                      <footer>
                      <p className='listurl'><Link to={listurl}><button>목록으로</button></Link></p>
                      </footer>
                  </div>

                )}
            </Transition>
        );
    }

    export default React.memo(Modify);