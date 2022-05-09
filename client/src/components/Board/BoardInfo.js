import React from 'react';
import { useHistory } from 'react-router-dom';

//게시판 꺼내기
const BoardInfo = (props) => {
    const history = useHistory()

    function selectBoard(e){
        e.preventDefault();
        history.push({
            pathname:'/boardDetail',
            state: {props: props} // history값에 인자를 전달하는 형태 _ state값에 {key값: value값}형태로 전달
        })
    }
    
    return (
     <tr onClick={selectBoard}>
         <td>{props.title}</td>
         <td>{props.day}</td>
         <td>{props.writer}</td>
         <td>{props.content}</td>
     </tr>  
    )
};

export default BoardInfo;
