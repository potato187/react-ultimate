import {ErrorMessage} from '@hookform/error-message';
import {useState, useId} from 'react';
import {Form} from 'react-bootstrap';
import {Controller} from 'react-hook-form';
import style from './style.module.scss';
import Select from "react-select";
import {trimClassNames} from "@helpers/index.js";

const customStyles = {
    control: () => {
        return {
            position: 'relative',
        }
    },
    valueContainer: () => {
        return {
            border: '1px solid #ced4da',
            padding: '0.375rem 0.75rem',
            height: '35px',
            borderRadius: '0.25rem',
            width: '100%',
            ':hover': {
                borderColor: '#000'
            }
        }
    },
    indicatorsContainer: () => ({
        position: 'absolute',
        top: '0',
        right: '0'
    }),
    input: () => ({
        opacity: 0,
    }),
    menu: () => {
        return {
            position: 'absolute',
            top: 'calc(100% + 0.25rem)',
            left: 0,
            right: '0',
            backgroundColor: '#fff',
            border: '1px solid #ced4da',
            padding: '0 0',
            borderRadius: '0.25rem',
            zIndex: 5

        }
    },
    menuList: () => {
        return {
            padding: '0',
            borderRadius: '0.25rem',
            transition: '0.5s var(--theme-timing-function)',
        }
    },

    option: (_, state) => ({
        fontSize: '14px',
        padding: '0.375rem 0.5rem',
        background: state.isSelected ? 'var(--theme-primary-hover)' : '#fff',
        color: !state.isSelected ? 'var(--theme-gray-900)' : '#fff',
        ':first-of-type': {
            borderRadius: '0.25rem 0.25rem 0 0',
        },
        ':last-of-type': {
            borderRadius: '0 0 0.25rem 0.25rem',
        },
        ':hover': {
            background: !state.isSelected ? 'var(--theme-primary)' : 'var(--theme-primary-hover)',
            color: '#fff'
        },
        '&.selected': {
            background: 'red',
            color: '#fff'
        },
    }),
}

const SelectField = ({options = [], control, name, label, disabled = false, handleSetValue = null, className = '', ...props}) => {
    const id = useId();
    if (!options.length) return <></>;
    const classes = trimClassNames(['form-group', style['select-group'], className]);
    return (
        <Controller
            control={control}
            name={name}
            render={({field: {onChange,value, ...rest}, formState: {errors}}) => {
                return (
                    <Form.Group className={classes} controlId={id}>
                        <Form.Label>{label}</Form.Label>
                        <Select className={style['form-control']}
                                options={options}
                                defaultValue={options[0]}
                                noOptionsMessage={() => null}
                                styles={customStyles}
                                readOnly
                                isDisabled={disabled}
                                onChange={val => {
                                    onChange(val.value)
                                }}
                                {...rest}
                        />
                        <ErrorMessage
                            errors={errors}
                            name={name}
                            render={({message}) => <div className={style['invalid-message']}>{message}</div>}
                        />
                    </Form.Group>
                );
            }}
        />
    );
};

export default SelectField;
