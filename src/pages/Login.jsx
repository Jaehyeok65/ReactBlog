/* eslint-disable */
import React, { useReducer, useRef } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';




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
    const [cookies,setCookies] = useCookies(['name']);
    setCookies('name','쿠키이름',{path : '/'})
    console.log(cookies);

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
        } catch (e) {
          dispatch({ type: 'ERROR', error: e });
        }
      };

     
    

  

  return (
    <>
    <h2>로그인 페이지</h2>
    <br/>
    
    아이디 
    <input type = 'text' style={{marginLeft : '30px'}} ref = {LoginRef} />
    <br/>
    <br/>
    비밀번호
    <input type = 'password' style={{marginLeft : '15px'}} ref = {PasswordRef} />
    <button onClick={Login}>로그인</button>
    
    </>
  );
}

export default Login;
