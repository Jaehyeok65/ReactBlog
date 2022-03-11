import React,{ useState, useEffect } from 'react';
import axios from 'axios';
import queryString from 'query-string';



function Contents(props) {

const location = window.location.search;
const query = queryString.parse(location);



  var [posts,setPosts] = useState();

  useEffect(function() {

    axios.get('http://localhost:8088/contents?id='+query.id)
    .then(res => {
      setPosts(res.data);
    })
  })

  function title() {
    if(posts !== undefined) {
      return posts.title
    }
  }

  function contents() {
    if(posts !== undefined) {
      return posts.contents
    }
  }

  


  return (
    <div>
      <p>제목 : {title()}</p>
      <p>내용 : {contents()}</p>
    </div>
  );
}

export default Contents;