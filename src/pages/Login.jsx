/* eslint-disable */
import React, { useReducer, useRef } from 'react';
import axios from 'axios';
import './Login.css';
import { Transition } from 'react-transition-group';




function reducer(state, action) {
    switch (action.type) {
      case 'LOADING':
        return {
          loading: true,
          data: null,
          error: null
        };
      case 'SUCCESS':
        return {
          loading: false,
          data: action.data,
          error: null
        };
      case 'ERROR':
        return {
          loading: false,
          data: null,
          error: action.error
        };
      default:
        throw new Error(`Unhandled action type: ${action.type}`);
    }
  }

  

function Login() {

    const LoginRef = useRef(false);
    const PasswordRef = useRef(false);

    

    const [state, dispatch] = useReducer(reducer, {
      loading: false,
      data: null,
      error: null
    });


    

      const Login = async () => {
        dispatch({ type: 'LOADING' });
        try {
          const response = await axios.post(
            'http://localhost:8088/user/Login',{
                userId : LoginRef.current.value,
                userPassword : PasswordRef.current.value
            }
          );
          dispatch({ type: 'SUCCESS', data: response.data });

          

          if(!response.data) {  //아이디 비밀번호가 다른 경우 == false 리턴
            alert('로그인에 실패하였습니다.');
          }
          else if(response.data === "overlap") {
            const result = confirm("다른 사용자가 로그인 중 입니다. 해당 사용자의 연결을 끊고 로그인 하시겠습니까?");
            if(result) {
              const responses = await axios.post(
                'http://localhost:8088/user/Logins', {
                  userId : LoginRef.current.value,
                  userPassword : PasswordRef.current.value
                }
              );
              window.sessionStorage.setItem('sessionId',responses.data); // sessionId 키로 세션 Id value 저장.
              alert('로그인에 성공하였습니다.');
              document.location.href='/';
            }

            else {
              alert('로그인을 취소하였습니다.');
            }
          }
          else {
            window.sessionStorage.setItem('sessionId',response.data); // sessionId 키로 세션 Id value 저장.
            alert('로그인에 성공하였습니다.');
            document.location.href='/';
          }
        } catch (e) {
          dispatch({ type: 'ERROR', error: e });
        }
      };

     

     

  

  return (
    <Transition in = {true} timeout = {700} appear>
      {state => (
         <div className={`pageSlider-${state}`}>
         <table style={ {marginLeft : '280px', width : '450px' , height : '250px', position : 'absolute'}}>
         <div style={ {padding : '30px', paddingRight:'50px'}}>
         <h2 style={{marginLeft : '175px', color : 'cornflowerblue'}}>Login</h2>
         <br/>
         <input type = 'text' style={{marginLeft : '15px', width : '400px', height : '40px'}} placeholder="아이디" ref = {LoginRef} />
         <br/>
         <input type = 'password' style={{marginLeft : '15px', width : '400px', height : '40px'}} placeholder ="비밀번호" ref = {PasswordRef} />
         <br/>
         <br/>
         <button onClick={Login} style={{ marginLeft : '15px', width : '400px' , borderRadius : '5px', backgroundColor : 'cornflowerblue'}}><span style={ { color : 'white'}}>로그인</span></button>
         <br/>
         </div>
         </table>
         </div>

      )}
    </Transition>
  );
}

export default Login;
