import { useState, useCallback } from "react";

const useForm = (initialState, onSubmit) => {
    const [state, setState] = useState({ ...initialState });

    const handleChange = useCallback(({ target }) => {
        const { name, value, type, checked } = target;
        const newValue = type === "checkbox" ? checked : value;
        
        setState(prevState => ({
            ...prevState,
            [name]: newValue,
        }));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ ...state });
        reset();
    };

    const reset = useCallback(() => {
        setState({ ...initialState });
    }, []);

    return {state, setState, handleChange, handleSubmit, reset}
}

export default useForm;