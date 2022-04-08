import React, { useEffect } from 'react';
import { Button, Table } from 'react-bootstrap'
import { useState } from 'react';
import BoardInfo from './BoardInfo';
import { Link, useHistory } from 'react-router-dom';
//게시판
const Board = () => {
    const [boards, setBoards] = useState([])
    const [searchData, setSearchData] = useState("")
    const history = useHistory();
    
    useEffect(() => { // 렌더링후 무조건 한번은 실행되는데
        fetch('http://localhost:5000/api/board') 
            .then((res) => (res.json()))
            .then((data) => {
                setBoards(data)
            })
    }, [searchData]) // useState에 저장된 searchData값이 변경될 때 마다 api/board를 렌더링한다. -> 게시판 검색

    function handleSearch(e){
        e.preventDefault();
        setSearchData(e.target.value)
    }

    function searchBoard(e){
        e.preventDefault();
        console.log(`${searchData}로 검색`)
        const board=boards.filter((c)=>c.b_title.includes(searchData)) //searchData에 해당되는 문자열만을 검색해서 board의상태로 저장
        // console.log(board)
        setBoards(board)  // 저장된 board의 상태를 useState값인 board에 저장
    }

    function writeBoard(e){ //게시판 쓰기로 이동하는 함수
        e.preventDefault(); // input고유기능 방지
        if(sessionStorage.getItem('user_id')!==null){ // 현재유지되고 있는 사용자 id값이 null값이 아니라면
            history.push({ // /addBoard로 이동 -> 게시글 작성 페이지로 이동
                pathname:'/addBoard'
            })
        }else{
            alert("로그인 후 사용가능합니다.")
            history.push({
                pathname:'/login'
            })
        }
        
    }

    return (
        <div>
            <h1>게시판</h1>{' '}<input type="text" name="searchData" value={searchData} onChange={handleSearch} placeholder="검색하기"></input>{' '}<Button onClick={searchBoard}>검색</Button>
            <div className='allBoard'>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>제목</th>
                            <th>날짜</th>
                            <th>작성자</th>
                            <th>내용</th>
                        </tr>
                    </thead>
                    <tbody>
                        {boards ? boards.map(c => {
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
            </div>
            
                <Button onClick={writeBoard}>게시글 쓰기</Button> {' '}
            
            <Link to='/myBoard'>
                <Button>내가 쓴 끌</Button>
            </Link>{' '}
        
        </div>
    );
};

export default Board;
