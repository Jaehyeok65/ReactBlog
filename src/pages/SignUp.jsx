import React,{ useState } from 'react';
import axios from 'axios';
import './Login.css';
import { Transition } from 'react-transition-group';





function SignUp() {

  const [member,setMember] = useState({
    name : '',
    userId : '',
    email : '',
    password : '',
    repassword : '',
  }); //회원가입 할 유저 객체를 member로 선언

  



  





  const onChange = (e) => {
    const { name, value } = e.target;
    setMember( {
        ...member,
        [name] : value
    });
}

  const Join = async() => { //회원가입 유효성 검사

  
    
    const passwordtest = /^[a-zA-z0-9]{4,12}$/;  //비밀번호 유효성 검사를 위한 변수

    const emailtest = /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/; //이메일 유효성 검사를 위한 변수


    const check = await IdCheck();

    if(!check) {
      alert('아이디가 중복됩니다.');
      setMember( {
        ...member,
        userId : ''
      })
      return;
    }
    

    if(!passwordtest.test(member.password)) {
      alert('패스워드 형식이 올바르지 않습니다.');
      setMember( {
        ...member,
        password : ''
      })

      return;
    }

    if(!emailtest.test(member.email)) {
      alert('이메일 형식이 올바르지 않습니다.');
      setMember( {
        ...member,
        email : ''
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

    SignUp();
    

  }


  const SignUp = () => {

    axios.post('http://localhost:8088/user/signUp', {
      userId : member.userId,
      userName : member.name,
      userPassword : member.password,
      userEmail : member.email
    }).then(res => {
        if(res.data) {
          alert('회원가입이 완료되었습니다.');
          document.location.href = '/';
        }
        else {
          alert('회원가입이 완료되지 않았습니다.');
        }
    })
  }


  const IdCheck = async() => {

    const response = await axios.post('http://localhost:8088/user/checkId', {
      userId : member.userId
    })
    
    return response.data;
    
    
  }

  

  

  

    



     
    

  

  return (
    <Transition in = {true} timeout = {700} appear>
      {state => (
        <div className={`pageSlider-${state}`}>
        <table style={ {marginLeft : '280px', width : '450px' , height : '250px', position : 'absolute'}}>
        <div style={ {padding : '30px', paddingRight:'50px'}}>
        <h2 style={{marginLeft : '155px', color : 'cornflowerblue'}}>Sign Up</h2>
        <br/>
        <input type = 'text' autocomplete="off"  value = {member.name} name = 'name' onChange = {onChange} style={{marginLeft : '15px', width : '400px', height : '40px'}} placeholder ="이름" required />
        <br/>
        <br/>
        <input type = 'email' autocomplete="off" value = {member.email} name = 'email' onChange = {onChange} style={{marginLeft : '15px', width : '400px', height : '40px'}} placeholder ="이메일" required />
        <br/>
        <br/>
        <input type = 'text' value = {member.userId} name = 'userId' onChange = {onChange} style={{marginLeft : '15px', width : '400px', height : '40px'}} placeholder="아이디" required />
        <br/>
        <br/>
        <input type = 'password' value = {member.password} name = 'password' onChange = {onChange} style={{marginLeft : '15px', width : '400px', height : '40px'}} placeholder ="비밀번호" required />
        <br/>
        <br/>
        <input type = 'password' value = {member.repassword} name = 'repassword' onChange = {onChange} style={{marginLeft : '15px', width : '400px', height : '40px'}} placeholder ="비밀번호 확인" required />
        <br/>
        <br/>
        <button onClick={Join} style={{ marginLeft : '15px', width : '400px' ,borderRadius : '5px', backgroundColor : 'cornflowerblue'}}><span style={ { color : 'white'}}>회원가입</span></button>
        </div>
        </table>
        </div>

      )}
    
    </Transition>
  );
}

export default SignUp;
