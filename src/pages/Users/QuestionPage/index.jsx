import {useEffect, useState} from "react";
import questionApi from "@api/questionApi.js";
import {Container} from "react-bootstrap";
import QuestionList from "./QuestionList";

const QuestionPage = () => {
    const [arrQuestion, setArrQuestion] = useState([]);

    useEffect(() => {
        (async () => {
            const response = await  questionApi.getQuestionByParticipant();
            const { EC, DT } = response;
            if(EC === 0 && DT) {
                setArrQuestion(DT);
            }
        })();
    }, []);
    
    return (
      <div className='py-5'>
          <Container>
              <QuestionList questionList={arrQuestion}  />
          </Container>
      </div>
    )
};

export default  QuestionPage;