import Cleave from "cleave.js/react";
// import { validateEmail } from "../plugins/utils";  // validateEmail is not exported from ../plugins/utils
import { isMobile } from "react-device-detect";
import _ from "lodash";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { DatePicker, Select, Space, Switch } from "antd";
import { Editor } from "@tinymce/tinymce-react";
import asset from "plugins/assets/asset";
import { makeSlug } from "plugins/utils/Slug";
import ApiCall from "../../../modules/ApiCall";
const { Option } = Select;

function hasNumber(str) {
    return /^[0-9]*$/.test(str);
}

function hasLetter(str) {
    return /[a-zA-Z]/.test(str);
}

function hasNumberAndLetter(str) {
    return hasNumber(str) && hasLetter(str);
}

/**
 *
 * @param {*} email string
 * @returns boolean
 * note: username+something@gmail.com is still valid!
 */
function validateEmail(email) {
    // using regex from https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // console.log("validateEmail:", re.test(email));
    return re.test(email);
}

function apiCheck (url, value) {
    const respon = ApiCall({
        path: url + value
    })
    return respon && respon.status;
}

const ValidationType = {
    get NOT_EMPTY() {
        return "NOT_EMPTY";
    },
    get MIN_LENGTH() {
        return "MIN_LENGTH";
    },
    get EMAIL() {
        return "EMAIL";
    },
    get ID_NO() {
        return "ID_NO";
    },
    get PHONE() {
        return "PHONE";
    },
    get LETTERS() {
        return "LETTERS";
    },
    get NUMBERS() {
        return "NUMBERS";
    },
    get LETTERS_AND_NUMBERS() {
        return "LETTERS_AND_NUMBERS";
    },
    get DATE() {
        return "DATE";
    },
    get TIME() {
        return "TIME";
    },
    get DATE_TIME() {
        return "DATE_TIME";
    },
    get API_CHECK() {
        return "API_CHECK";
    },
};

const InputType = {
    get TEXT() {
        return "text";
    },
    get NUMBER() {
        return "number";
    },
    get PASSWORD() {
        return "password";
    },
};

const InputShape = {
    get DEFAULT() {
        return "default";
    },
    get ROUND() {
        return "round";
    },
    get FLUSH() {
        return "flush";
    },
    get AUTO() {
        return "auto";
    },
};

function validate({
                      value = "",
                      type = ValidationType.NOT_EMPTY,
                      minLength = 1,
                      maxLength = 0,
                      errMessage = "Not valid.",
                      api = "",
                  }) {

    if (type == ValidationType.MIN_LENGTH) {
        if (value.length < minLength || (maxLength > 0 && value.length > maxLength)) {
            return errMessage;
        }
        return true;
    }

    if (type == ValidationType.EMAIL) {
        if (!validateEmail(value) || (maxLength > 0 && value.length > maxLength)) {
            return errMessage;
        }
        return true;
    }

    if (type == ValidationType.ID_NO) {
        // console.log(value, value.length)
        if (value.length < 9 || value.length > 12) {
            return errMessage;
        }
        return true;
    }

    if (type == ValidationType.PHONE) {
        console.log(value.length);
        if (value.charAt(0) != "0" || value.length < minLength || (maxLength > 0 && value.length > maxLength)) {
            return errMessage;
        }

        return true;
    }

    if (type == ValidationType.LETTERS && value.length < minLength && (maxLength > 0 && value.length > maxLength)) {
        // console.log(value, value.length)
        if (!value || !hasLetter(value)) {
            return errMessage;
        }
        return true;
    }

    if (type == ValidationType.NUMBERS && value.length < minLength && (maxLength > 0 && value.length > maxLength)) {
        // console.log(value, value.length)
        if (!value || !hasNumber(value)) {
            return errMessage;
        }
        return true;
    }

    if (
        type == ValidationType.LETTERS_AND_NUMBERS &&
        value.length < minLength &&
        (maxLength > 0 && value.length > maxLength)
    ) {
        // console.log(value, value.length)
        if (!value || !hasNumber(value) || !hasLetter(value)) {
            return errMessage;
        }
        return true;
    }

    if (type == ValidationType.NOT_EMPTY) {
        if (!value || value.length == 0 || (maxLength > 0 && value.length > maxLength)) {
            return errMessage;
        }
        return true;
    }

    if (type == ValidationType.API_CHECK) {
        console.log("API_CHECK")
        if (value || value.length > 0) {
            console.log("vào")
            if (api.length > 0){
                if (apiCheck(api, value) == true) {
                    return true;
                }else{
                    return errMessage;
                }
            } else {
                return "please config api"
            }
        }
        return true;
    }

    return true;
}

const Form = ({ children, ...rest }) => {
    return <form {...rest}>{children}</form>;
};

const Input = forwardRef(
    (
        {
            children,
            label,
            icon,
            placeholder,
            defaultValue,
            onChange,
            marginBottom,
            shape = InputShape.DEFAULT,
            type = InputType.TEXT,
            validateConditions = [],
            ...rest
        },
        ref
    ) => {
        const inputRef = useRef();
        const [error, setError] = useState();
        // const [conditions, setConditions] = useState(validateConditions);

        const onValueChange = (e) => {
            if (onChange) onChange(inputRef.current.value);
        };

        const isValid =  () => {
            let isValid = true;
            console.log(validateConditions);
            for (let i = 0; i < validateConditions.length; i++) {
                const condition = validateConditions[i];
                isValid = validate({
                    value: inputRef.current.value,
                    type: condition.type,
                    minLength: condition.minLength,
                    maxLength: condition.maxLength,
                    errMessage: condition.errMessage,
                    api: condition.api ? condition.api : ''
                });
                console.log("isValid", isValid);
                if (typeof isValid != "boolean") {
                    setError(isValid); // display error message...
                    break;
                }
            }
            if (isValid == true) {
                setError(null);
                return true;
            } else {
                return false;
            }
        };

        useEffect(() => {
            // ref.current.addE
        }, []);

        useImperativeHandle(ref, () => ({
            get value() {
                return inputRef.current.value;
            },
            set value(val) {
                inputRef.current.value = val;
            },
            get isValid() {
                return isValid();
            },
        }));

        const keyUpHandler = (e) => {
            // console.log(e.key, e.keyCode);
            // console.log(ref.current.value);
            isValid();
        };

        const errClass = error && error.length > 0 ? "error" : "";

        return (
            <div className="form-group">
                <style jsx>{`
          .form-group {
            ${marginBottom ? `margin-bottom: ${marginBottom};` : ""}
            ${icon ? `padding-left: 26px;` : ""}
            ${icon ? `background: url(${asset("/admin/icons/" + icon + ".svg")}) no-repeat;` : ""}
            background-position: left center;
            position: relative;
          }

          label {
            display: inline-block;
          }
          .label {
            // margin-bottom: 0.5rem;

            
          }
          label.error {
            font-size: 12px;
            margin-top: 5px;
            
          }
          .error {
            display: block;
            color: red;
          }
          .label.hide,
          .error.hide {
            display: none;
          }
        `}</style>
                <label className={`label ${label ? "" : "hide"}`}>{label}</label>
                <input
                    className={`form-control ${errClass} ${shape}`}
                    type={type}
                    placeholder={placeholder}
                    onKeyUp={keyUpHandler}
                    onFocus={keyUpHandler}
                    ref={inputRef}
                    defaultValue={defaultValue}
                    onChange={onValueChange}
                    {...rest}
                ></input>
                {children}
                <label className={`error ${label ? "" : "hide"}`}>{error}</label>

            </div>
        );
    }
);

const TextArea = forwardRef(
    (
        {
            children,
            defaultValue,
            height = "100px",
            autoSize = false,
            shape = InputShape.DEFAULT,
            label,
            type = InputType.TEXT,
            placeholder,
            validateConditions = [],
            onChange,
            ...rest
        },
        ref
    ) => {
        const inputRef = useRef();
        const [error, setError] = useState();

        const handleChange = (e) => {
            if (onChange) onChange(inputRef.current.value);
        };

        const isValid = () => {
            let isValid = true;
            for (var i = 0; i < validateConditions.length; i++) {
                const condition = validateConditions[i];
                isValid = validate({
                    value: inputRef.current.value,
                    type: condition.type,
                    minLength: condition.minLength,
                    maxLength: condition.maxLength,
                    errMessage: condition.errMessage,
                });
                if (typeof isValid != "boolean") {
                    setError(isValid); // display error message...
                    break;
                }
            }
            if (isValid == true) {
                setError(null);
                return true;
            } else {
                return false;
            }
        };

        function OnInput() {
            this.style.height = "auto";
            this.style.height = this.scrollHeight + "px";
        }

        useEffect(() => {
            if (autoSize == true) {
                let element = inputRef.current;
                element.setAttribute("style", "height:" + element.scrollHeight + "px; overflow-y:hidden;");
                element.addEventListener("input", OnInput, false);
            }
        }, [autoSize]);

        useImperativeHandle(ref, () => ({
            get value() {
                return inputRef.current.value;
            },
            get isValid() {
                return isValid();
            },
        }));

        const keyUpHandler = (e) => {
            // console.log(e.key, e.keyCode);
            // console.log(ref.current.value);
            isValid();
        };

        const errClass = error && error.length > 0 ? "error" : "";

        return (
            <div className="form-group">
                <style jsx>{`
          label {
            display: inline-block;
          }
          .label {
            // margin-bottom: 0.5rem;
          }
          label.error {
            display: block;
            color: red;
            font-size: 0.9rem;
            margin-top: 5px;
          }
          .text-area {
            ${height ? `height: ${height};` : ""}
          }
        `}</style>
                <label className="label">{label}</label>
                <textarea
                    className={`text-area form-control ${errClass} ${shape}`}
                    defaultValue={defaultValue}
                    placeholder={placeholder}
                    onKeyUp={keyUpHandler}
                    onChange={handleChange}
                    ref={inputRef}
                    {...rest}
                />
                <label className="error">{error}</label>
                {children}
            </div>
        );
    }
);

const TextEditor = forwardRef(
    (
        {
            children,
            defaultValue,
            height,
            label,
            type = InputType.TEXT,
            placeholder,
            validateConditions = [],
            onChange,
            ...rest
        },
        ref
    ) => {
        const inputRef = useRef();
        const [error, setError] = useState();
        const [currentValue, setCurrentValue] = useState(defaultValue);

        const isValid = () => {
            let isValid = true;
            for (var i = 0; i < validateConditions.length; i++) {
                const condition = validateConditions[i];
                isValid = validate({
                    value: currentValue,
                    type: condition.type,
                    minLength: condition.minLength,
                    maxLength: condition.maxLength,
                    errMessage: condition.errMessage,
                });
                if (typeof isValid != "boolean") {
                    setError(isValid); // display error message...
                    break;
                }
            }
            if (isValid == true) {
                setError(null);
                return true;
            } else {
                return false;
            }
        };

        useEffect(() => {
            // setTimeout(function () {
            //   console.log(inputRef);
            // }, 5000);
        }, []);

        useImperativeHandle(ref, () => ({
            get value() {
                return currentValue;
            },
            get isValid() {
                return isValid();
            },
        }));

        const errClass = error && error.length > 0 ? "error" : "";
        const onEditorChange = (content, editor) => {
            setCurrentValue(content);
            if (onChange) onChange(content);
        };

        return (
            <div className="form-group">
                <style jsx>{`
          label {
            display: inline-block;
          }
          .label {
            // margin-bottom: 0.5rem;
          }
          label.error {
            display: block;
            color: red;
            font-size: 0.9rem;
            margin-top: 5px;
          }
          .hide {
            display: none;
          }
        `}</style>
                <label className={`label ${label ? "" : "hide"}`}>{label}</label>
                <Editor
                    ref={inputRef}
                    id="text-editor"
                    initialValue={defaultValue}
                    apiKey="tglg10xhq02cxgmaixdccuyfwkkvvem203eqoqlftdk2j48t"
                    init={{
                        height: 400,
                        menubar: false,
                        entity_encoding: "raw",
                        plugins: [
                            "advlist autolink lists link image charmap print preview anchor",
                            "searchreplace visualblocks code fullscreen",
                            "insertdatetime media table paste code help wordcount",
                        ],
                        toolbar:
                            "undo redo | formatselect | bold italic underline forecolor backcolor | \
                           alignleft aligncenter alignright alignjustify | \
                           bullist numlist outdent indent | removeformat | help",
                    }}
                    onEditorChange={onEditorChange}
                />
                <label className="error">{error}</label>
            </div>
        );
    }
);

const InputMask = forwardRef(
    (
        {
            children,
            label,
            maskOption,
            shape = InputShape.DEFAULT,
            placeholder = "DD/MM/YYYY",
            validateConditions = [],
            ...rest
        },
        ref
    ) => {
        let inputRef;
        const [error, setError] = useState();
        // const [conditions, setConditions] = useState(validateConditions);

        const handleChange = (e) => {
            if (onChange && inputRef) onChange(inputRef.current.value);
        };

        const isValid = () => {
            let isValid = true;
            for (let i = 0; i < validateConditions.length; i++) {
                const condition = validateConditions[i];
                isValid = validate({
                    value: inputRef.current.value,
                    type: condition.type,
                    minLength: condition.minLength,
                    maxLength: condition.maxLength,
                    errMessage: condition.errMessage,
                });
                if (typeof isValid != "boolean") {
                    setError(isValid); // display error message...
                    break;
                }
            }
            if (isValid == true) {
                setError(null);
                return true;
            } else {
                return false;
            }
        };

        useEffect(() => {
            // ref.current.addE
        }, []);

        useImperativeHandle(ref, () => ({
            get value() {
                return inputRef.current.value;
            },
            get isValid() {
                return isValid();
            },
        }));

        const keyUpHandler = (e) => {
            // console.log(e.key, e.keyCode);
            // console.log(ref.current.value);
            isValid();
        };

        const errClass = error && error.length > 0 ? "error" : "";

        return (
            <div className="form-group">
                <style jsx>{`
          label {
            display: inline-block;
          }
          .label {
            
          }
          label.error {
            display: block;
            color: red;
            font-size: 0.9rem;
            margin-top: 5px;
          }
        `}</style>
                {label ? <label className="label">{label}</label> : null}
                <Cleave
                    className={`form-control ${errClass} ${shape}`}
                    onChange={handleChange}
                    // onKeyUp={keyUpHandler}
                    placeholder={placeholder}
                    options={maskOption}
                    htmlRef={(_ref) => (inputRef = _ref)}
                    {...rest}
                />
                <label className="error">{error}</label>
                {children}
            </div>
        );
    }
);

const InputDate = ({
                       maskOption = { date: true, datePattern: ["d", "m", "Y"] },
                       placeholder = "DD/MM/YYYY",
                       ...rest
                   }) => {
    return <InputMask maskOption={maskOption} placeholder={placeholder} {...rest} />;
};

const InputTime = ({
                       maskOption = { time: true, timePattern: ["h", "m", "s"] },
                       placeholder = "HH:MM:SS",
                       ...rest
                   }) => {
    return <InputMask maskOption={maskOption} placeholder={placeholder} {...rest} />;
};

const FormDatePicker = ({ placeholder, onChange }) => {
    const inputRef = useRef();
    const handleChange = (e) => {
        if (onChange) onChange(inputRef.current.value);
    };
    return <DatePicker ref={inputRef} onChange={handleChange} />;
};

const Switcher = ({ label, active = true, onChange, ...rest }) => {
    const [isActive, setIsActive] = useState(active);

    const handleChange = (checked) => {
        if (onChange) onChange(checked);
    };

    useEffect(() => {
        setIsActive(active);
    }, [active]);

    return (
        <div className="form-group">
            {label}
            <Switch checked={isActive} onChange={handleChange} {...rest} />
        </div>
    );
};

const InputSelect = forwardRef(({ children, label,placeholder,mode, defaultValue, is_custom = 0, validateConditions=[], ...rest }, ref) => {
    const inputRef = useRef();
    const { onChange } = rest;
    const { labelInValue } = rest;
    const [currentValue, setCurrentValue] = useState(defaultValue);
    const [error, setError] = useState();

    useImperativeHandle(ref, () => ({
        get value() {
            return currentValue;
        },
        set value(val) {
            setCurrentValue(val);
        },
        get isValid() {
            return  isValid();
        },
        get input() {
            return inputRef.current;
        },
        reload() {
            setCurrentValue(defaultValue);
        },
    }));

    const handleChange = (e) => {
        if(mode != "multiple") {
            setCurrentValue(inputRef.current.value);
        } else {
            if (labelInValue) {
                console.log(labelInValue);
                const value = e.map(function (item) {
                    if (typeof item != "undefined") return {value: item.value, label: item.label, key: item.key};
                });
                setCurrentValue(value);
            }else{
                setCurrentValue(e);
            }

        }
        if (onChange){
            onChange(inputRef.current.value);
        }
        isValid();
    };

    const handleSelect = (val) => {
        if(mode != "multiple") {
            setCurrentValue(val);
        }
        if (onChange) onChange(val);
    };

    const isValid = () => {
        let isValid = true;
        for (var i = 0; i < validateConditions.length; i++) {
            const condition = validateConditions[i];
            isValid = validate({
                value: typeof currentValue === 'object' ? currentValue.value : currentValue,
                type: condition.type,
                minLength: condition.minLength,
                maxLength: condition.maxLength,
                errMessage: condition.errMessage,
                exactLength: condition.exactLength,
            });
            if (typeof isValid != "boolean") {
                setError(isValid); // display error message...
                break;
            }
        }
        if (isValid == true) {
            setError(null);
            return true;
        } else {
            return false;
        }
    };
    // const errClass = error && error.length > 0 ? "error" : "";

    // useEffect(() => {
    //   setCurrentValue(defaultValue);
    // }, [defaultValue]);

    return (
        <div className="form-group">
            <style jsx>{`
          label {
            display: inline-block;
          }
          .label {
            // margin-bottom: 0.5rem;
          }
          label.error {
            display: block;
            color: red;
            font-size: 0.9rem;
            margin-top: 5px;
          }
        `}</style>
            {label ? <label className="label">{label}</label> : null}
            <Select placeholder={placeholder} mode={mode && typeof mode != 'undefined'? mode : ''} ref={inputRef} value={currentValue} onChange={handleChange} onSelect={handleSelect} {...rest}>
                {
                    is_custom ?
                        children :
                        (children.map((item, index) =>
                            <Option value={item.id} key={index}>{item.name}</Option>
                        ))
                }
            </Select>
            <label className={`error ${label ? "" : "hide"}`}>{error}</label>
        </div>
    );
});

const InputSlug = ({ label, name = "", defaultValue, onChange, ...rest }) => {
    const inputRef = useRef();
    const [slug, setSlug] = useState(makeSlug(name));

    const onInputChange = (e) => {
        // console.log(ref.current.value);
        const newSlug = makeSlug(inputRef.current.value);
        setSlug(newSlug);
        if (onChange) onChange(newSlug);
    };

    useEffect(() => {
        // setSlug(makeSlug(name));
        const newSlug = makeSlug(name);
        inputRef.current.value = newSlug;
        if (onChange) onChange(newSlug);
    }, [name]);

    return <Input ref={inputRef} label={label} defaultValue={slug} onChange={onInputChange} />;
};

export function Checkvalidation(formInputRef) {
    let currentFormInput = {};
    let isValid = true;
    Object.keys(formInputRef.current).forEach(function(index) {
        if(typeof formInputRef.current[index].value === 'object'){
            console.log(formInputRef.current[index], formInputRef.current[index].value.value);
            if(typeof formInputRef.current[index].value.value === 'undefined'){
                let value = formInputRef.current[index].value
                currentFormInput[index] = value;
                console.log(currentFormInput[index], value);
            }else{
                currentFormInput[index] = formInputRef.current[index].value.value;
            }
        } else {
            currentFormInput[index] = formInputRef.current[index].value;
        }

        if (formInputRef.current[index].isValid == false){
            isValid = false;
        }
    });
    return {
        isValid: isValid,
        currentFormInput: currentFormInput,
    }
}

export {
    InputType,
    InputShape,
    ValidationType,
    Input,
    TextArea,
    TextEditor,
    InputMask,
    InputDate,
    InputTime,
    InputSlug,
    FormDatePicker,
    InputSelect,
    Switcher,
};

export default Form;
