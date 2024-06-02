import React, { useState } from "react";
import SetStatisticsData from "../components/statistic/SetStatisticsData";
import WordStatistics from "../components/statistic/WordStatistics";
import NivoComponents from "../components/statistic/NivoComponents";
import KeywordComponents from "../components/statistic/KeywordComponents";

const StatisticsPage = () => {
    const [date, setDate] = useState([new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()]);
    const [base, setBase] = useState("월 기준"); // default : 월 기준 (주 기준, 일 기준)
    const [report, setReport] = useState({
        useWord : [],
        emotion : [],
        choiceWord : [],
        suggestion : []
    })

    return (
        <div style={{display : "flex", justifyContent : "center"}}>
            <div style={{width : "1000px", display : "flex", flexDirection : "column", gap : "50px"}}>
                <SetStatisticsData date={date} base = {base} setDate={setDate} setBase={setBase}/>
                <WordStatistics date={date} report={report}/>
                <NivoComponents date={date} base={base} setReport={setReport}/>
                <KeywordComponents/>
            </div>
        </div>
    )
}

export default StatisticsPage;