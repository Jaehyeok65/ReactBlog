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
          if(response.data) {
            alert('로그인에 성공했습니다.');
          }
          else {
            alert('로그인에 실패했습니다.');
          }
        } catch (e) {
          dispatch({ type: 'ERROR', error: e });
        }
      };

     

     
    if(state.data) {
      return <div>
        <h2>로그인 완료</h2>
        <button onClick = {() => {
          dispatch({ type : 'SUCCESS', data : false})
        }}>로그아웃</button>
      </div>
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
