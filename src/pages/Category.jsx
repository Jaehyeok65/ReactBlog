import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import queryString from 'query-string';






const Category = (props) => {

    const location = window.location.search;
    const query = queryString.parse(location);
    const size = query.sz;
    const page = query.pg;
    const url = 'http://localhost:8088/list?pg='+page+'&sz='+size;

    const [categorys,setCategorys] = useState([]);
    const [category,setCategory] = useState();
    const [modal,setModal] = useState(false);

    const AddCategory = async() => {
        /*let prev = [...categorys];
        let newcategory = prev.concat(category);
        setCategorys(newcategory);*/
        
        const response = await axios.post('http://localhost:8088/addcategory', {
            category : category
        })

        setCategorys(response.data);
        
        setModal(!modal);
    }

    const onChange = (e) => {
        const value = e.target.value;
        setCategory(value);
    }


    useEffect ( () => {

        axios.get('http://localhost:8088/category')
        .then( res => {
            setCategorys(res.data);
        })

    },[])

   
    

    

    



    return (
        <>
        <div style={ { width : '200px', height : '400px', display : 'inline-block' , position : 'absolute' }}>
            <button style={ { marginLeft : '5px' , border : 'none', background : 'white', fontSize : '12px'}} onClick = { () => { setModal(!modal)}}>카테고리 추가</button>
            <hr/>
            { categorys.map( (categorys,i) => {
                 return <button key = {i} style = { { marginLeft : '60px', fontSize : '12px', border : 'none', backgroundColor : 'white'}}
                 onClick = {() => {
                    props.getData(categorys.category);
                 }}
                 >{ categorys.category }</button>
            })}
        </div>
        <Modal show = {modal}>
            <Modal.Header>
                <Modal.Title style = { { marginLeft : '190px', fontSize : '12px'}}>카테고리 추가</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <input type = 'text' style={ { marginLeft : '130px'}} name = 'category' onChange={onChange} />
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick = {() => { setModal(!modal)}}>닫기</Button>
                <Button variant="primary" onClick = {AddCategory}>저장</Button>
            </Modal.Footer>
        </Modal>
        </>
    )
}


export default Category;