import React from 'react';
import { Button, Table } from 'react-bootstrap';
import BoardInfo from './BoardInfo';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
//-----------------CSS import--------------------//
import s from '../../css/Board.module.css';

//내가 쓴 게시글들을 확인할 수 있도록 게시판을 변경
const MyBoard = () => {
    const [myBoard, setMyBoard] = useState([])
    //내가 쓴 게시글을 받아와 설정
    useEffect(() => {
        fetch(`http://localhost:5000/api/board/${sessionStorage.getItem('user_id')}`)
            .then((res) => (res.json()))
            .then((data) => {
                setMyBoard(data)
            })
    }, [])
    return (
        <div className={s.board}>
            {/* 비로그인 시 처리 */}
            {sessionStorage.getItem('user_id')===null? <div>로그인후 이용가능</div> :         
            <div className={s.boardBody}>
            <h1>내가 쓴 게시글</h1>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>제목</th>
                        <th>날짜</th>
                        <th>작성자</th>
                        <th>내용</th>
                    </tr>
                </thead>
                <tbody>
                    {/* 내가 쓴 게시글을 map함수를 활용하여 하나씩 받아옴 */}
                    {myBoard ? myBoard.map(c => {
                        return (<BoardInfo
                            key={c.no_board}
                            no={c.no_board}
                            writer={c.b_writer}
                            title={c.b_title}
                            content={c.b_content}
                            day={c.b_day}>
                        </BoardInfo>)
                    }) :
                        <tr>
                            <td>
                                게시글 조회불가
                            </td>
                        </tr>}
                </tbody>
            </Table>
            </div>}
            <Link to ="/board">
            <Button>뒤로가기</Button>
            </Link>
        </div>
    );
};

export default MyBoard;