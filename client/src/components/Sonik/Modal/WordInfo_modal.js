import React, { useState } from 'react';
import S_modalForm from './S_modalForm';
import s from "../../../css/Sonik.module.css"

// 각 단어(분기당 매출, 고정비용, 변동비용, 목표매출, 메뉴들의 일 목표 판매 건수)에 대한 설명을 S_modalForm에 담아 출력

const ResultModal = (props) => {

  // useState를 사용하여 open상태를 변경한다. (open일때 true로 만들어 열리는 방식)
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => { // 모달창 열기 함수
    setModalOpen(true);
  };
  const closeModal = () => { // 모달창 닫기 함수
    setModalOpen(false);
  };


  return (
      <React.Fragment>
          <button className={s.button1} onClick={openModal}>?</button> {/*  */}
          {/* header 부분에 텍스트를 입력한다,  */}

          <S_modalForm open={modalOpen} close={closeModal} header={props.header}> {/* S_Modal로 props에 modalOpen uesState와 closeModal함수 전달 */}
              {/* // Modal.js <main> {props.children} </main>에 내용이 입력된다. 리액트 함수형 모달 */}
              {props.result}
          </S_modalForm>
      </React.Fragment>
  )
}

export default ResultModal