import React, { useState } from 'react';
import axios from 'axios';
import { Transition } from 'react-transition-group';
import './Login.css';


const Password = () => {

    const [member, setMember] = useState({
        name : '',
        userId : '',
        email : '',
        password : '',
        repassword : ''
    })


    const onChange = (e) => {
        const { name, value } = e.target;
        setMember( {
            ...member,
            [name] : value
        });
    }

    const IdCheck = async() => {

        const response = await axios.post('http://localhost:8088/user/checkId', {
          userId : member.userId
        }) //true가 리턴된다면 아이디가 중복되지 않는 것
        
        if(response.data) {
            alert('아이디가 존재하지 않습니다.');
            return;
        }
        document.location.href = '/Password2';
      }

      


    

    


    
    return (
        <Transition in = {true} timeout = {700} appear>
        {state => (
            <div className={`pageSlider-${state}`}>
            <div className='container'>
            <table>
            <div>
            <h2 style={{textAlign : 'center', color : 'cornflowerblue'}}>Find Password</h2>
            <br/>
            <input type = 'text' autocomplete="off"  value = {member.userId} name = 'userId' onChange = {onChange} style={{marginLeft : '15px', width : '400px', height : '40px'}} placeholder ="아이디를 입력하세요" required />
            <br/>
            <br/>
            <button onClick = {IdCheck} style={ { borderRadius : '5px' , marginLeft : '290px', backgroundColor : 'cornflowerblue', color : 'white'}}>비밀번호 찾기</button>
            </div>
            </table>
            </div>
            </div>
        )}
        
        </Transition>
    )
      
}


export default Password;