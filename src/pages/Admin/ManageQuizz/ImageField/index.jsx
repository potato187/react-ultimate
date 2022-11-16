import style from "./style.module.scss";
import {Ratio} from "react-bootstrap";
import imagePlaceholder from "@assets/images/placeholder.png";
import utilities from "@scss/utilities.module.scss";
import {useId, useRef, useState} from "react";
import useClickOutside from "@hooks/useClickOutside.js";

const ImageField = ({handleSetValue, name}) => {
    const id = useId();
    const [loading, setLoading] = useState(false);
    const nodeRef = useRef(null);

    useClickOutside(nodeRef, () => {
        setLoading(false);
    });

    const handleOnChange = (e) => {
        handleSetValue(name, e.target.files[0]);
        setLoading(false);
    };


    return (
        <div className={style['image-field']}>
            <label htmlFor={id} className={style['image-filed__wrapper']}
                   onClick={() => setLoading(true)} ref={nodeRef}>
                <input id={id} hidden type='file' onChange={handleOnChange}/>
                <div data-loading={loading}
                     className={`${style['image-filed__preview']} ${utilities['loading']}`}>
                    <Ratio as='span' className='d-block' aspectRatio='16x9'>
                        <img className='w-100 h-auto img-fluid' src={imagePlaceholder}
                             alt=""/>
                    </Ratio>
                </div>
            </label>
        </div>
    )
}

export default ImageField;