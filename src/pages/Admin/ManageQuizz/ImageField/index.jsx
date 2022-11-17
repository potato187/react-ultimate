import style from "./style.module.scss";
import {Ratio} from "react-bootstrap";
import imagePlaceholder from "@assets/images/placeholder.png";
import utilities from "@scss/utilities.module.scss";
import {useId, useRef, useState} from "react";
import useClickOutside from "@hooks/useClickOutside.js";
import {checkIfFileIsCorrectType} from "@helpers/index.js";
import {ErrorMessage} from "@hookform/error-message";
import "@scss/helpers.scss";
import {toast} from "react-toastify";

const ImageField = ({handleSetValue = null, errors = null, name}) => {
    const id = useId();
    const [loading, setLoading] = useState(false);
    const nodeRef = useRef(null);
    const imagePreview = useRef(imagePlaceholder);

    useClickOutside(nodeRef, () => {
        setLoading(false);
    });


    const handleOnChange = (e) => {
        const { files } = e.target;

        if(checkIfFileIsCorrectType(files)) {
            imagePreview.current = URL.createObjectURL(files[0]);
            handleSetValue(name, files[0]);

        } else {
            imagePreview.current = imagePlaceholder;
            handleSetValue(name, '');
            toast.warn('Only PNG/JPG/JPEG image formats can be used');
        }
        setLoading(false);
    };

    return (
        <div className={`form-group ${style['image-field']}`}  >
            <label htmlFor={id} className={style['image-filed__wrapper']}
                   onClick={() => setLoading(true)} ref={nodeRef} >
                <input id={id} hidden type='file' onChange={handleOnChange}/>
                <span data-loading={loading}
                     className={`${style['image-filed__preview']} ${utilities['loading']}`}>
                    <Ratio as='span' className='d-block' aspectRatio='16x9'>
                        <img className='w-100 h-auto img-fluid' src={imagePreview.current}
                             alt=""/>
                    </Ratio>
                </span>
            </label>
            <ErrorMessage
                errors={errors}
                name={name}
                render={({ message }) => <div className='error-message text-center pt-2'>{message}</div>}
            />
        </div>
    )
}

export default ImageField;