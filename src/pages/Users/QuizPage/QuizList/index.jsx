import {Alert, Col, Row} from "react-bootstrap";
import QuizCard from "../QuizCard";



const QuizList = ({quizList = []}) => {
    if(!quizList.length) return <Alert variant='warning'>Your don't have any quiz  now...</Alert>
    return (
        <Row className='gx-3 row-cols-4'>
            {quizList.map((props) => <Col key={props.id}><QuizCard quizId={props.id} {...props} /></Col>)}
        </Row>
    );
}

export default  QuizList;