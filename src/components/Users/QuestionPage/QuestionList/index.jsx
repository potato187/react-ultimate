import {Alert, Col, Row} from "react-bootstrap";
import QuestionCard from "@components/Users/QuestionPage/QuestionCard/index.jsx";


const QuestionList = ({questionList = []}) => {
    if(!questionList.length) return <Alert variant='warning'>Your don't have any quiz  now...</Alert>
    return (
        <Row className='gx-3 row-cols-4'>
            {questionList.map((props) => <Col key={props.id}><QuestionCard {...props} /></Col>)}
        </Row>
    );
}

export default  QuestionList;