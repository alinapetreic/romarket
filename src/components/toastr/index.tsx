import cn from "classnames";
import styles from "./styles.module.css";
import { Severity } from "../../enums/severity-enums";
import { hideToastr } from '../../features/toastr/slice';
import {
    FaTimes,
    FaCheckCircle
} from "react-icons/fa";
import {
    useEffect
} from 'react';
import {
    useAppDispatch,
    useAppSelector
} from '../../store';

const AUTO_CLOSE_DELAY = 5000;

const Toastr = () => {
    const dispatch = useAppDispatch();
    const { open, message, severity } = useAppSelector(state => state.toastr);

    useEffect(() => {
        let timeoutId: number;
        
        if (open) {
            timeoutId = setTimeout(() => {
                dispatch(hideToastr());
            }, AUTO_CLOSE_DELAY);
        }

        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [open, dispatch]);

    const handleClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(hideToastr());
    };

    if (!open || !message || !severity) {
        return null;
    }

    return (
        <div className={cn(styles.container, {
            [styles.success]: severity === Severity.Success,
            [styles.error]: severity === Severity.Error
        })}>
            <FaCheckCircle />
            <p>
                {message}
            </p>
            <button onClick={handleClose}>
                <FaTimes />
            </button>
            <div className={cn(styles.progressBar, {
                [styles.success]: severity === Severity.Success,
                [styles.error]: severity === Severity.Error
            })} />
        </div>
    );
};

export default Toastr;