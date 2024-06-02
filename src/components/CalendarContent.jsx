import React, { useEffect, useState } from "react";
import Container from "../styles/components/calendarcontent";
import { useNavigate } from "react-router-dom";
import { getDiaryToDate } from "../apis/diary";


const CalendarContent = ({today}) => {
    const navigate = useNavigate();
    const formattedTodays = `${today.getMonth() + 1}월 ${today.getDate()}일의 이야기`;
    const [diaryData, setDiaryData] = useState([]);
    const [diaryNum, setDiaryNum] = useState(0);
    
    useEffect(() => {
        handleGetDailyDiary();
    }, [today])

    const handleGetDailyDiary = async () => {
        try {
            const response = await getDiaryToDate({year : today.getFullYear(), month : today.getMonth() + 1, date : today.getDate()});
            if(response.length !== 0){
                setDiaryData(response);
                setDiaryNum(0);
            }
        } catch(e) {
            console.error(e);
        }
    }
    return (
        <Container onClick={() => {
            diaryData.length !== 0 && navigate(`/calendar/detail/${today.getFullYear()}.${today.getMonth() + 1}.${today.getDate()}`, {
                state : {
                    diaryNum
                }
            })
            }}>
            <div className="header">
                {formattedTodays}
            </div>
            <div className="text">
                {
                    diaryData.length === 0 ? "" : diaryData[diaryNum].diary.content
                }
            </div>
            <ul>
                {
                    diaryData.length === 0 ? "" : diaryData.map((_, index) => {
                        return (
                            <li key={index} onMouseEnter={() => setDiaryNum(index)} style={{backgroundColor : index === diaryNum ? "#47588C" : "#EAEAEA"}}></li>
                        );
                    })
                }
            </ul>
        </Container>
    );
}

export default CalendarContent;