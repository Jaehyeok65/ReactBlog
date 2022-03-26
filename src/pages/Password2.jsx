import React, { useState } from 'react';
import axios from 'axios';
import { Transition } from 'react-transition-group';






const Password2 = () => {

    const [member, setMember] = useState({
        name : '',
        userId : '',
        email : '',
        password : '',
        repassword : ''
    })

    const [states, setStates] = useState(null);

 


    const onChange = (e) => {
        const { name, value } = e.target;
        setMember( {
            ...member,
            [name] : value
        });
    }

    const PasswordCheck = async() => {

        const response = await axios.post('http://localhost:8088/user/Password', {
          userId : member.userId
        }) //true가 리턴된다면 아이디가 중복되지 않는 것
        
       
        console.log(response.data);

        if(response.data === '') {
            alert('아이디가 존재하지 않습니다.');
        }
        else {
            if(response.data.userName === member.name) {
                if(response.data.userEmail === member.email) { //이메일과 이름이 일치한다면 비밀번호 재설정 페이지로
                    setStates({
                        ...states,
                        states : true
                    })
                }
                else {
                    alert('이메일을 확인해주세요.');
                    return;
                }
            }
            else {
                alert('이름을 확인해주세요.')
                return;
            }
        }
      }

      const ChangePassword = () => {

        axios.post('http://localhost:8088/user/ChangePassword', {
            userId : member.userId,
            userPassword : member.password
          }).then(res => {
              if(!res.data) {
                  alert('새로운 비밀번호를 입력해주세요.');
                  return;
              }
              else {
                  alert('비밀번호가 변경되었습니다.');
                  document.location.href = '/login';
              }
          }
          )

      }

      const Join = () => { //회원가입 유효성 검사
    
        const emailtest = /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/; //이메일 유효성 검사를 위한 변수
    
        if(!emailtest.test(member.email)) {
          alert('이메일 형식이 올바르지 않습니다.');
          setMember( {
            ...member,
            email : ''
          })
    
          return;
        }
    
        PasswordCheck();
    
      }

      const Join2 = () => { //회원가입 유효성 검사

        const passwordtest = /^[a-zA-z0-9]{4,12}$/;  //비밀번호 유효성 검사를 위한 변수
    
        if(!passwordtest.test(member.password)) {
            alert('패스워드 형식이 올바르지 않습니다.');
            setMember( {
              ...member,
              password : ''
            })
      
            return;
          }

          if(member.password !== member.repassword) {
            alert('비밀번호를 확인하세요.');
            setMember( {
              ...member,
              password : '',
              repassword : ''
            })
      
            return;
          }
          
          ChangePassword();


    
      }

    

      


    

    if(states) {
        return(
          <Transition in = {true} timeout ={1000} appear>
            {state => (
               <div className={`pageSlider-${state}`}>
               <table style={ {marginLeft : '280px', width : '450px' , height : '250px', position : 'absolute'}}>
               <div style={ {padding : '30px', paddingRight:'50px'}}>
               <h2 style={{marginLeft : '120px', color : 'cornflowerblue'}}>Find Password</h2>
               <br/>
               <input type = 'password' autocomplete="off"  value = {member.password} name = 'password' onChange = {onChange} style={{marginLeft : '15px', width : '400px', height : '40px'}} placeholder ="비밀번호를 입력하세요" required />
               <br/>
               <br/>
               <input type = 'password' autocomplete="off"  value = {member.repassword} name = 'repassword' onChange = {onChange} style={{marginLeft : '15px', width : '400px', height : '40px'}} placeholder ="비밀번호 확인" required />
               <br/>
               <br/>
               <button onClick = {Join2} style={ { borderRadius : '5px' , marginLeft : '15px', width : '400px', backgroundColor : 'cornflowerblue', color : 'white'}}>비밀번호 재설정</button>
               </div>
               </table>
               </div>
            )}
            </Transition>
        )
    } 


    
    return (
      <Transition in = {true} timeout = {700} appear>
        {state => (
          <div className={`pageSlider-${state}`}>
          <table style={ {margin : 'auto', width : '450px' , height : '250px'}}>
          <div style={ {padding : '30px', paddingRight:'50px'}}>
          <h2 style={{marginLeft : '120px', color : 'cornflowerblue'}}>Find Password</h2>
          <br/>
          <input type = 'text' autocomplete="off"  value = {member.userId} name = 'userId' onChange = {onChange} style={{marginLeft : '15px', width : '400px', height : '40px'}} placeholder ="아이디를 입력하세요" required />
          <br/>
          <br/>
          <input type = 'text' autocomplete="off"  value = {member.name} name = 'name' onChange = {onChange} style={{marginLeft : '15px', width : '400px', height : '40px'}} placeholder ="이름을 입력하세요" required />
          <br/>
          <br/>
          <input type = 'email' autocomplete="off"  value = {member.email} name = 'email' onChange = {onChange} style={{marginLeft : '15px', width : '400px', height : '40px'}} placeholder ="이메일을 입력하세요" required />
          <br/>
          <br/>
          <button onClick = {Join} style={ { borderRadius : '5px' , marginLeft : '290px', backgroundColor : 'cornflowerblue', color : 'white'}}>비밀번호 찾기</button>
          </div>
          </table>
          </div>

        )}
        </Transition>
    )
      
}


export default Password2;