import {leadingZero, useImageBase64} from "@helpers/index.js";
import style from "./style.module.scss";

const Quiz = ({
                  index = 1,
                  id,
                  description = '',
                  image = null,
                  children,
                  ...props
              }) => {
    return <>
        <div className={style['quiz']} {...props}>
            {image && (<div className={style['quiz-header']}>
                <div className={style['quiz-media']}>
                    <img src={useImageBase64(image)} alt={description} className='w-100 img-fluid'/>
                </div>
            </div>)}
            <div className={style['quiz-body']}>
                <div className={style['quiz-title']}>{`${leadingZero(index + 1)}. ${description}`}</div>
                {children}
            </div>
        </div>
    </>;
}

export default Quiz;