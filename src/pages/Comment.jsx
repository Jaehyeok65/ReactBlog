import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import './Comment.css';
import queryString from 'query-string';



const Comment = (props) => { //props로 contentId를 받아옴

    const location = window.location.search; //
    const query = queryString.parse(location);
    const pg = query.pg;
    const sz = query.sz;

    const [comment, setComment] = useState({  //프론트에서 작성해서 서버로 보낼 comment state
        userId : (JSON.parse(window.localStorage.getItem('userId'))).userId,
        contentId : props.contentId,
        comment : '',
        date : '',
        id : null
    });

    const [comments, setComments] = useState([]) // 서버에서 댓글 리스트를 받아올 state
    const [update,setUpdate] = useState(false); //수정, 등록 관리할 state


    useEffect( () => {  //ComponentDidMount == 처음 렌더 되었을 때 서버에서 작성된 댓글 리스트를 가져옴

        axios.post('http://localhost:8088/comment',{
            contentId : props.contentId
        }).then( res => {
            setComments(res.data);
            console.log(res.data);
        })
    },[])

    const onChange = (e) => {
        const { name, value } = e.target;
        let altercomments = comment;
        setComment( {
            userId : (JSON.parse(window.localStorage.getItem('userId'))).userId,
            [name] : value,
            contentId : props.contentId,
            id : altercomments.id
        });
    }

    const CommentSubmit = () => {

        const nowTime = moment().format('YYYY-MM-DD HH:mm:ss');
        console.log(nowTime);

        axios.post('http://localhost:8088/commentsub',{
            userId : (JSON.parse(window.localStorage.getItem('userId'))).userId,
            contentId : comment.contentId,
            comment : comment.comment,
            date : nowTime,
        })
        .then( res => {
            document.location.href = window.location.href;
        })
        
    
    }

    const CommentUpdate = (id) => {

        axios.post('http://localhost:8088/commentupdate', {
            id : id
        })
        .then(res => {
            const altercomment = {
                userId : (JSON.parse(window.localStorage.getItem('userId'))).userId,
                contentId : res.data.contentId,
                comment : res.data.comment,
                date : res.data.date,
                id : res.data.id
            }

            setComment(altercomment);
            setUpdate(true);
        })
    }

    const Commentdeletes = (id) => {

        let result = window.confirm('삭제하시겠습니까?');
        
        if(result){
        axios.get('http://localhost:8088/commentdelete?id='+id)
        .then(res => {
          if(res.data === true) {
            alert('삭제가 완료되었습니다.');
            document.location = '/contents?id='+comment.contentId+'&pg='+pg+'&sz='+sz;
          }
          else {
            alert('삭제가 완료되지 않았습니다.');
          }
        })
        }
        else {
            alert('취소하셨습니다.');
        }
      }

    const CommentUpdates = () => {

        const nowTime = moment().format('YYYY-MM-DD HH:mm:ss');
        
        
        axios.post('http://localhost:8088/commentupdates', {
            id : comment.id,
            userId : comment.userId,
            contentId : comment.contentId,
            comment : comment.comment,
            date : nowTime,
        })
        .then( res => {
            document.location.href = '/contents?id='+comment.contentId+'&pg='+pg+'&sz='+sz;
        })
        
        
    }



    


    return (
        <>
        <details>
            <summary>댓글</summary>
            { comments.length !== 0 ? 
            <div style={ { marginLeft : '100px' , marginRight : '100px'}}>
                {comments.map( comment => {
                    return (
                        <div>
                        <p><strong>{comment.userId}</strong></p>
                        <p>{comment.comment}</p>
                        <span style={ { marginLeft : '830px'}}>{comment.userId === (JSON.parse(window.localStorage.getItem('userId'))).userId ? <span><a href="#text"><button style = { { border : 'none', backgroundColor : 'white', fontSize : '12px'} }onClick = {() => CommentUpdate(comment.id)}>수정</button></a><button style={ { marginLeft : '10px', border : 'none', backgroundColor : 'white', fontSize : '12px'}} onClick = {() => Commentdeletes(comment.id)}>삭제</button></span> : null }</span>
                        <p style={ { color : 'darkgray', fontSize : '12px'}}>{comment.date} 작성됨</p>
                        <hr/>
                        </div>
                    )
                })}
            </div> : <p style={ { marginLeft : '450px', color : 'darkgray'}}>아직 작성된 글이 없습니다.</p>
            }

            <div id = "text" style={ { marginLeft : '100px'}}>
                <p><strong>{(JSON.parse(window.localStorage.getItem('userId'))).userId}</strong></p>
                <textarea name = 'comment' value = {comment.comment} onChange = {onChange} style = { { width : '920px', height : '200px'}} />
            </div>
            {update ? <div style={ { marginLeft : '970px'}}>
            <button onClick={CommentUpdates}>수정</button>
            </div> :
            <div style={ { marginLeft : '970px'}}>
            <button onClick={CommentSubmit}>등록</button>
            </div>
            }
        </details>
        </>
    )

    



}



export default Comment;