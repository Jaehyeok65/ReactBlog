import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';


const Comment = (props) => { //props로 contentId를 받아옴

    const [comment, setComment] = useState({  //프론트에서 작성해서 서버로 보낼 comment state
        userId : (JSON.parse(window.localStorage.getItem('userId'))).userId,
        contentId : props.contentId,
        comment : '',
        date : '',
    });

    const [comments, setComments] = useState([]) // 서버에서 댓글 리스트를 받아올 state


    useEffect( () => {  //ComponentDidMount == 처음 렌더 되었을 때 서버에서 작성된 댓글 리스트를 가져옴

        axios.post('http://localhost:8088/comment',{
            contentId : props.contentId
        }).then( res => {
            setComments(res.data);
        })
    },[])

    const onChange = (e) => {
        const { name, value } = e.target;
        setComment( {
            userId : (JSON.parse(window.localStorage.getItem('userId'))).userId,
            [name] : value,
            contentId : props.contentId
        });
    }

    const CommentSubmit = () => {

        const nowTime = moment().format('YYYY-MM-DD HH:mm:ss');
        console.log(nowTime);

        axios.post('http://localhost:8088/commentsub',{
            userId : (JSON.parse(window.localStorage.getItem('userId'))).userId,
            contentId : comment.contentId,
            comment : comment.comment,
            date : nowTime
        })
        .then( res => {
            document.location.href = window.location.href;
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
                        <p style={ { color : 'darkgray', fontSize : '12px'}}>{comment.date} 작성됨</p>
                        <hr/>
                        </div>
                    )
                })}
            </div> : <p style={ { marginLeft : '450px', color : 'darkgray'}}>아직 작성된 글이 없습니다.</p>
            }

            <div style={ { marginLeft : '100px'}}>
                <p><strong>{(JSON.parse(window.localStorage.getItem('userId'))).userId}</strong></p>
                <textarea name = 'comment' value = {comment.comment} onChange = {onChange} style = { { width : '920px', height : '200px'}} />
            </div>
            <div style={ { marginLeft : '972px'}}>
                <button onClick={CommentSubmit}>등록</button>
            </div>
        </details>
        </>
    )

    



}



export default Comment;