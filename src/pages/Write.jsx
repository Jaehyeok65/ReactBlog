import React from 'react';
import './Write.css';

function Write() {


    return(
        <div>

            <form action='http://localhost:8088/blog' method='post'>
                <input type='text' name='title' placeholder='제목' className='inputs' />
                <input type='submit' value='발행' className='submits' />
                <hr/>
                <br/>
                <br/>
                <textarea name='contents' placeholder='#을 이용하여 태그를 추가해보세요' className='inputs2' />
            </form>
        </div>
    );
}

export default Write;