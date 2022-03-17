import { React, useState } from 'react'
import ResultModal from './Modal/ResultModal'

const Sonik = () => {

    /* const [totalSales, setTotalSale] = useState()

    function T_sales() {
        setTotalSale()
    } */

    // 총 매출
    var totalSales = 3000

    // 고정비
    const [fixCost, setFixCost] = useState("")
    const [isfixCost, setIsfixCost] = useState(false)

    function fix_cost(e) {
        setFixCost(e.target.value)
        setIsfixCost(true)
    }

    //변동비
    const [varCost, setVarCost] = useState("")
    const [isVarCost, setIsVarCost] = useState(false)

    function var_cost(e) {
        setVarCost(e.target.value)
        setIsVarCost(true)
    }

    //목표 순이익
    const [netProfit, setNetProfit] = useState("")
    const [isNetProfit, setIsNetProfit] = useState(false)
    function t_net_profit(e) {
        setNetProfit(e.target.value)
        setIsNetProfit(true)
    }

    //메뉴평균 단가
    const [avgPrice, setAvgPrice] = useState("")
    const [isAvgPrice, setIsAvgPrice] = useState(false)

    function m_avg_uprice(e) {
        setAvgPrice(e.target.value)
        setIsAvgPrice(true)
    }

    // 손익분기점 구하기 -> 고정비 / ((총매출 - 변동비) / 총매출)
    var break_even
    function break_evenCalc(fixCost, varCost, totalSales) {
        break_even = fixCost / ((totalSales - varCost) / totalSales)
        return break_even
    }

    // 목표 순이익을 위한 목표 매출 구하기 -> (고정비 + 목표이익) / ((매출 - 변동비) / 총 매출)
    //var target_sales // target_sales값을 T_daily_sales_volumeCalc()에서 쓰기 때문에 전역변수로 선언
    var target_sales = ""
    function target_salesCalc(fixCost, netProfit, totalSales, varCost) {
        target_sales = (Number(fixCost) + Number(netProfit)) / ((totalSales - varCost) / totalSales)
        return target_sales
    }

    // 목표 매출을 위한 일일 판매량 -> (목표매출 / 시간기준) / 메뉴 평균 단가
    var target_volume
    function T_daily_sales_volumeCalc(target_sales, avgPrice) {
        target_volume = (target_sales/91.25) / avgPrice
        return target_volume
    }
    
    var resultText = "" // 결과값 text초기화
    const [resultData, setResultData] = useState("") // 결과값 text를 담을 useState
    function calc() {
        if (isfixCost && isVarCost) {
            break_evenCalc(fixCost, varCost, totalSales)
            
            resultText = "손익분기점은 " + break_even + " 입니다."
            setResultData(resultText)
            
            setFixCost("")
            setVarCost("")
        }
        if (isfixCost && isVarCost && isNetProfit) {
            target_salesCalc(fixCost, netProfit, totalSales, varCost)
            
            resultText = "손익분기점은 " + break_even + "이며,\n목표 순이익을 위한 목표 매출은 " + target_sales + "입니다."
            setResultData(resultText)
            
            setFixCost("")
            setVarCost("")
            setNetProfit("")
        }
        if (isfixCost && isVarCost && isNetProfit && isAvgPrice) {
            T_daily_sales_volumeCalc(target_sales, avgPrice)
            
            resultText = "손익분기점은 " + break_even + " 이며,\n 목표 순이익을 위한 목표 매출은 " + target_sales + "입니다.\n 목표 매출을 위한 일 판매량은" +target_volume+"입니다."
            setResultData(resultText)
            
            setFixCost("")
            setVarCost("")
            setNetProfit("")
            setAvgPrice("")
        }
    }


    return (
        <div>
            고정비용:
            <input type="number" onChange={fix_cost} value={fixCost}></input><br />
            변동비용:
            <input type="number" onChange={var_cost} value={varCost}></input><br />
            목표순이익:
            <input type="number" onChange={t_net_profit} value={netProfit}></input><br />
            메뉴평균단가:
            <input type="number" onChange={m_avg_uprice} value={avgPrice}></input><br />

            <br/>
            <ResultModal calc={calc} result={resultData}> 계산 </ResultModal> {/* ResultModal로 props에 calc, resultdata담아서 보내기 */}
        </div>
    );
}

export default Sonik