import { useId } from "react";}

import styles from "./text-input.module.scss";

const TextInput = ({label, type = "text", ...props}) => {
    const id = useId();

    rerturn (
        <div className={styles.field}>
            {label && <label htmlFor={id}>{label}</label>}
            <input className={styles.label} type={type} {...props} />
        </div>
    )
}

export default TextInput;