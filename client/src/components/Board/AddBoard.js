import axios from 'axios';
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
//게시판 추가
const AddBoard = () => {

    const history = useHistory();
    const [boardTitle, setBoardTitle] = useState("");
    const [boardContent, setBoardConetent]= useState("");

    function handleBoardTitle(e){
        e.preventDefault(); //input의 고유동작을 중단 시키기위해서 사용
        setBoardTitle(e.target.value) // 이후에 boardTitle을 e.target.value로 받아온다
    }
    function handleBoardContent(e){
        e.preventDefault();
        setBoardConetent(e.target.value);
    }
    function addBoard(){ // server.js에서 열어놓은 
        const userData = {
            title: boardTitle,
            content: boardContent,
            writer: sessionStorage.getItem('user_id') // sessionStorage나 localStorage는 브라우저 내에 key-value쌍을 저장시킬 수 있게한다.
        } // sessionStorage.getItem('key값')으로 가져온 user_id에 해당되는 값은 페이지가 새로고침하여도 값이 유지된다.

        axios.post("http://localhost:5000/api/board", userData) // api주소에 userData(제목, 내용, 사용자 id)값 등록
        .then((res)=>{
            if(res.status===200){ // 게시글을 성공적으로 등록했을 경우, 200(요청성공값)
                alert("생성이 완료되었습니다.")
                history.push('/board')
            }
            else{
                alert("생성이 실패하였습니다.")
            }
        })
    }
    
    return (
        <div>
            <h1>게시글 작성</h1>
            제목:<input type="text" name="boardTitle" value={boardTitle} onChange={handleBoardTitle}></input> <br/><br/>
            내용:<textarea name="boardContent" value={boardContent} onChange={handleBoardContent}></textarea><br/>
            <Button onClick={addBoard}>완료</Button> {' '}
            <Link to='/board'>
            <Button>취소</Button>
            </Link>
        </div>
    );
};

export default AddBoard;
