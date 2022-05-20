import React, { useState } from 'react';
import S_modalForm from './S_modalForm';
import ReactApexChart from 'react-apexcharts'


// Sonik으로 부터 받은 props로 모달창의 동작과 결과값을 출력한다

const ResultModal = (props) => {

  // useState를 사용하여 open상태를 변경한다. (open일때 true로 만들어 열리는 방식)
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true); 
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  function ClickEvent(){
    openModal()
    props.calc()
  }
 
   const series = [{
      name: 'series1',
      data: [31, 40, 28, 51, 42, 109, 100]
    }, {
      name: 'series2',
      data: [11, 32, 45, 32, 34, 52, 41]
    }]
    const options = {
      chart: {
        height: 350,
        type: 'area'
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth'
      },
      xaxis: {
        type: 'datetime',
        categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
      },
      tooltip: {
        x: {
          format: 'dd/MM/yy HH:mm'
        },
      },
    }

  return (
      <React.Fragment>
          <button className='button2' onClick={ClickEvent}>계산</button>
          {/* header 부분에 텍스트를 입력한다,  */}

          <S_modalForm open={modalOpen} close={closeModal} header="계산결과"> {/* S_Modal로 props에 modalOpen uesState와 closeModal함수 전달 */}
              {/* // Modal.js <main> {props.children} </main>에 내용이 입력된다. 리액트 함수형 모달 */}
              {props.result}
              <ReactApexChart options={options} series={series} type="area" height={350} />
          </S_modalForm>
      </React.Fragment>
  )
}

export default ResultModal