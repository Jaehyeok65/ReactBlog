    import React, { useState, useEffect } from 'react';
    import { Link } from 'react-router-dom';
    import queryString from 'query-string';
    import './Modify.css';
    import axios from 'axios';



    function Modify() {

        let [title,setTitle] = useState();
        let [contents,setContents] = useState();

        const location = window.location.search;
        const query = queryString.parse(location);
        const listurl = "/list?pg="+query.pg+"&sz="+query.sz;
        const updateurl = 'http://localhost:8088/update?id='+query.id+"&pg="+query.pg+"&sz="+query.sz;

        useEffect(() => {

            axios.get('http://localhost:8088/contents?id='+query.id+'&pg='+query.pg+'&sz='+query.sz)
            .then(res => {
            setTitle(res.data.title);
            setContents(res.data.contents);
            })
        },[])

        const handletitleChange = (e) => {
            setTitle(e.target.value);
        };

        const handlecontentsChange = (e) => {
            setContents(e.target.value);
        };

        
        const updates = () => {
            axios.post(updateurl, {
                id : query.id,
                title : title,
                contents : contents
            })
            .then(res => {
                document.location.href = "/contents?id="+res.data.id+"&pg="+query.pg+"&sz="+query.sz;
            })
        }


        return(
            <div>
                <input type='text' name='title' value = {title} placeholder='제목' className='inputs'
                    onChange={handletitleChange}
                    />
                    <button onClick={updates}>수정</button>
                    <hr/>
                    <br/>
                    <br/>
                    <textarea name='contents' value = {contents} placeholder='#을 이용하여 태그를 추가해보세요' className='inputs2'
                    onChange={handlecontentsChange}
                    />
                <footer>
                <p className='listurl'><Link to={listurl}><button>목록으로</button></Link></p>
                </footer>
            </div>
        );
    }

    export default Modify;