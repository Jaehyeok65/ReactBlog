package net.skhu.controller;


import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.session.SessionRepository;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import net.skhu.entity.User;
import net.skhu.model.Session;
import net.skhu.repository.UserRepository;


@Controller
@RequestMapping("/user")
@CrossOrigin(origins="http://localhost:3000")
public class UserController {

	 @Autowired UserRepository userRepository;
	 @Autowired SessionRepository<?> sessionRepository;

	 private static final Map<String, HttpSession> sessions = new ConcurrentHashMap<>();





    @ResponseBody
    @RequestMapping("Login")
    public String Login(Model model, @RequestBody User user, HttpServletRequest request) {
    	//System.out.println(request.getSession().getId()); //request.getSession을 하면 세션이 데이터베이스에 저장됨.
    	User usera = userRepository.findByUserId(user.getUserId());
    	System.out.println(sessions.size());
    	if(usera == null) {   //usera가 null이라면 아이디가 없으므로 false
    		return "false";
    	}

    	if(usera.getUserPassword().equals(user.getUserPassword())) {
    		if(sessions.containsKey(user.getUserId())) { //해당 아이디가 이미 로그인 되어 있는 경우
    			return "overlap";
    			 //sessions.get(user.getUserId()).invalidate(); == 따로 로직 짤 것
    	         //sessions.remove(user.getUserId()); //세션에서 지움 == 강제 로그아웃
    		}
    		System.out.println("응애하이");
    		HttpSession session = request.getSession(); //인증이 성공하면 세션 발급
    		session.setAttribute(session.getId(), user);
    		//System.out.println(session.getId());
    		//System.out.println(session);
    		//System.out.println(session.getAttribute(session.getId()));
    		sessions.put(user.getUserId(), session);
    		return session.getId();
    	}
        return "false";
    }

    @ResponseBody
    @RequestMapping("Logins")
    public String Logins(Model model, @RequestBody User user, HttpServletRequest request) {
    	//System.out.println(request.getSession().getId()); //request.getSession을 하면 세션이 데이터베이스에 저장됨.
    	sessions.get(user.getUserId()).invalidate();
   	    sessions.remove(user.getUserId()); //세션에서 지움 == 강제 로그아웃
    	HttpSession session = request.getSession(); //인증이 성공하면 세션 발급
    	session.setAttribute(session.getId(), user);
    	//System.out.println(session.getId());
    	//System.out.println(session);
    	//System.out.println(session.getAttribute(session.getId()));
    	sessions.put(user.getUserId(), session);
    	return session.getId();
    	}

    @ResponseBody
    @RequestMapping("sessioncheck")
    public boolean SessionCheck(Model model, @RequestBody Session session) {
    	if(sessionRepository.findById(session.getSessionId()) == null) { //권한이 없음
    		return false;
    	}
    	return true;
    }

    @ResponseBody
    @RequestMapping("logout")
    public boolean Logout(Model model, @RequestBody User user) {
    	System.out.println(user.getUserId());
    	if(sessions.containsKey(user.getUserId())) { //userId가 세션에 있다면 == 로그인 되어 있다면
    		System.out.println("하이하이");
    		sessions.get(user.getUserId()).invalidate();
       	    sessions.remove(user.getUserId()); //세션에서 지움 == 강제 로그아웃
       	 System.out.println(sessions.size());
       	    return true; //성공적으로 세션에서 삭제 완료
    	}
    	return false; //세션 삭제 실패
    }

    @ResponseBody
    @RequestMapping("checkId")
    public boolean CheckId(Model model, @RequestBody User user) {
    	User usera = userRepository.findByUserId(user.getUserId());
    	if(usera == null) {   //usera가 null이라면 아이디가 없으므로 중복되지 않음
    		return true;
    	}

        return false;
    }

    @ResponseBody
    @RequestMapping("Password")
    public User Password(Model model, @RequestBody User user) {
    	User usera = userRepository.findByUserId(user.getUserId());

    	return usera;
    }

    @ResponseBody
    @RequestMapping("ChangePassword")
    public boolean ChangePassword(Model model, @RequestBody User user) {
    	//System.out.println(user);
    	User usera = userRepository.findByUserId(user.getUserId());
    	if(usera.getUserPassword().equals(user.getUserPassword())) {
    		return false;
    	}
    	usera.setUserPassword(user.getUserPassword());
    	//System.out.println(usera);
    	userRepository.save(usera);
    	return true;
    }

    @ResponseBody
    @RequestMapping("signUp")
    public boolean SignUp(Model model, @RequestBody User user) {
    	userRepository.save(user);
    	return true;
    }







}