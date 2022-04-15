package net.skhu.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.session.SessionRepository;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import net.skhu.dto.Write;
import net.skhu.entity.Board;
import net.skhu.entity.Category;
import net.skhu.entity.Comment;
import net.skhu.model.Pagination;
import net.skhu.model.Session;
import net.skhu.repository.BoardRepository;
import net.skhu.repository.CategoryRepository;
import net.skhu.repository.CommentRepository;
import net.skhu.repository.UserRepository;


@Controller
@RequestMapping("")
@CrossOrigin(origins="http://localhost:3000")
public class HomeController {

	 @Autowired BoardRepository boardRepository;
	 @Autowired UserRepository userRepository;
	 @Autowired SessionRepository<?> sessionRepository;
	 @Autowired CommentRepository commentRepository;
	 @Autowired CategoryRepository categoryRepository;


    @ResponseBody
    @RequestMapping("list")
    public List<Board> list(Model model , Pagination pagination) {
        List<Board> boards = boardRepository.findAll(pagination);
        //System.out.println(pagination);
        return boards;

    }




    @ResponseBody
    @RequestMapping("recordcounts")
    public Pagination record(Model model,Pagination pagination) {
    	boardRepository.findAll(pagination);
        return pagination;
    }

    @ResponseBody
    @PostMapping("contents")
    public Board edit(Model model, @RequestParam("id") int id, Pagination pagination, @RequestBody Session sessionId) {
    	//System.out.println(sessionId.getSessionId());
    	//System.out.println(sessionRepository.findById(sessionId.getSessionId()));
    	if(sessionRepository.findById(sessionId.getSessionId()) == null) { //권한이 없음
    		Board boards = new Board();
    		return boards;
    	}
        Board board = boardRepository.findById(id).get();
        return board;
    }

    @ResponseBody
    @PostMapping("search")
    public List<Board> Search(Model model, @RequestBody Board board, Pagination pagination) {
    	//System.out.println(pagination);
        List<Board> boards = boardRepository.findByTitleStartingWith(board.getTitle(),pagination);
        return boards;
    }


    @ResponseBody
    @PostMapping("searchcounts")
    public Pagination Searchrecord(Model model, @RequestBody Board board, Pagination pagination) {
    	boardRepository.findByTitleStartingWith(board.getTitle(),pagination);
        return pagination;
    }



    @ResponseBody
    @PostMapping("create")
    public Write blogs(Model model, @RequestBody Board board, Pagination pagination) {
    	boardRepository.save(board);
    	boardRepository.findAll(pagination);
    	int lastPage = (int)Math.ceil((double)boardRepository.count() / pagination.getSz());
    	Write write = new Write();
    	write.setPg(lastPage);
    	write.setId(board.getId());
    	return write;
    }

    @ResponseBody
    @PostMapping("comment")
    public List<Comment> comments(Model model, @RequestBody Comment comment) {
    	List<Comment> comments = commentRepository.findByContentId(comment.getContentId());
    	return comments;
    }

    @ResponseBody
    @PostMapping("commentupdate")
    public Comment commentUpdate(Model model, @RequestBody Comment comment) {
    	Comment comments = commentRepository.findById(comment.getId()).get();
    	return comments;
    }

    @ResponseBody
    @PostMapping("commentsub")
    public boolean commentsub(Model model, @RequestBody Comment comment) {
    	commentRepository.save(comment);
    	return true;
    }

    @ResponseBody
    @PostMapping("commentupdates")
    public boolean commentUpdates(Model model, @RequestBody Comment comment) {
    	commentRepository.save(comment);
    	return true;
    }

    @ResponseBody
    @GetMapping("commentdelete")
    public boolean commentDelete(Model model, Comment comment) {
    	commentRepository.delete(comment);
    	return true;
    }

    @ResponseBody
    @PostMapping("sessioncheck")
    public boolean SessionCheck(Model model, @RequestBody Session sessionId) {
    	//System.out.println(sessionId.getSessionId());
    	//System.out.println(sessionRepository.findById(sessionId.getSessionId()));
    	if(sessionRepository.findById(sessionId.getSessionId()) == null) {
    		return false;
    	}
    	return true;
    }


    @ResponseBody
    @PostMapping("update")
    public Board update(Model model, @RequestBody Board board, Pagination pagination) {
    	boardRepository.save(board);
    	boardRepository.findAll(pagination);
    	return board;
    }

    @ResponseBody
    @RequestMapping("delete")
    public boolean delete(Model model, Board board, Pagination pagination) {
    	boardRepository.delete(board);
        return true;
    }

    @ResponseBody
    @GetMapping("category")
    public List<Category> category(Model model, Pagination pagination) {
    	List<Category> lists = categoryRepository.findAll();
    	return lists;
    }

    @ResponseBody
    @PostMapping("addcategory")
    public List<Category> Addcategory(Model model, @RequestBody Category category, Pagination pagination) {
    	categoryRepository.save(category);
    	List<Category> lists = categoryRepository.findAll();
    	return lists;
    }

    @ResponseBody
    @PostMapping("categorylist")
    public List<Board> categorylist(Model model, @RequestBody Category category, Pagination pagination) {
    	List<Board> lists = boardRepository.findByCategory(category.getCategory(), pagination);
    	return lists;

    }

    @ResponseBody
    @PostMapping("categorycounts")
    public Pagination Categoryrecord(Model model, @RequestBody Category category, Pagination pagination) {
    	boardRepository.findByCategory(category.getCategory(),pagination);
        return pagination;
    }



}
