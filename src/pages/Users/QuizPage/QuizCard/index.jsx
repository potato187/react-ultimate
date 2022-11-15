import {Card, Ratio} from "react-bootstrap";
import ThemeButton from "@components/ThemeButton";
import {useImageBase64} from "@helpers";
import {useNavigate} from "react-router-dom";
import {PATH_ROUTES} from "@constant";

const QuizCard = ({quizId, image = '', description = '', ...props}) => {
    const navigate = useNavigate();

    const handleOnClick = () => {
        navigate(`/${PATH_ROUTES.USER.QUIZ}/${quizId}`, { state: {quizTitle: description}});
    }

    return (
        <Card>
           <Ratio aspectRatio='21x9'>
              <div className='overflow-hidden'>
                  <Card.Img variant="top" src={useImageBase64(image)} className='w-100 img-fluid' />
              </div>
           </Ratio>
            <Card.Body>
                <Card.Title>
                    {`Quiz ${quizId}`}
                </Card.Title>
                <Card.Text>
                    {description}
                </Card.Text>
            </Card.Body>
            <Card.Footer className='text-end'>
                <ThemeButton data-button='sm' title='Start quiz' onClick={handleOnClick} />
            </Card.Footer>
        </Card>
    );
}

export default  QuizCard;