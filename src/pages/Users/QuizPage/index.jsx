import {useEffect, useState} from "react";
import quizApi from "@api/quizApi.js";
import {Container} from "react-bootstrap";
import QuizList from "./QuizList";

const QuizPage = () => {
    const [quizz, setQuizz] = useState([]);

    useEffect(() => {
        (async () => {
            const response = await  quizApi.getQuizByParticipant();
            const { EC, DT } = response;
            if(EC === 0 && DT) {
                setQuizz(DT);
            }
        })();
    }, []);
    
    return (
      <div className='py-5'>
          <Container>
              <QuizList quizList={quizz}  />
          </Container>
      </div>
    )
};

export default  QuizPage;