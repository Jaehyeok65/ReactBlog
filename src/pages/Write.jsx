    import React,{ useState } from 'react';
    import './Write.css';
    import axios from 'axios';
    import queryString from 'query-string';

    function Writes() {

        const location = window.location.search;
        const query = queryString.parse(location);
        const url = 'http://localhost:8088/create?pg='+query.pg+"&sz="+query.sz;

        let [title,setTitle] = useState()
        let [contents,setContents] = useState()


        const posts = () => {
            axios.post(url, {
                title : title,
                contents : contents
            })
            .then(res => {
                document.location.href = "/list?pg="+res.data+"&sz="+query.sz;
            })
        }

        const handletitleChange = (e) => {
            setTitle(e.target.value);
        };

        const handlecontentsChange = (e) => {
        setContents(e.target.value);
    };

        


        return(
            <div>
                    <input type='text' name='title' value = {title} placeholder='제목' className='inputs'
                    onChange={handletitleChange}
                    />
                    <button onClick={posts}>발행</button>
                    <hr/>
                    <br/>
                    <br/>
                    <textarea name='contents' value = {contents} placeholder='#을 이용하여 태그를 추가해보세요' className='inputs2'
                    onChange={handlecontentsChange}
                    />
            </div>
        );
    }

    export default Writes;