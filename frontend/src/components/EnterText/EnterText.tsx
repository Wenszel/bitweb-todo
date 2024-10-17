import { useEffect, useRef, useState } from 'react';
import { TextField } from '@mui/material';

interface EnterTextProps {
    close: () => void;
    submit: (text: string) => void;
    defaultValue?: string;
}

export default function EnterText({ close, submit, defaultValue }: EnterTextProps) {
    const nameRef = useRef<HTMLInputElement>(null);
    const [canBeClose, setCanBeClose] = useState<boolean>(false);

    useEffect(() => {
        if (nameRef.current) {
            nameRef.current.focus();
            nameRef.current.select();
            setCanBeClose(true);
        }
    }, []);

    const handleEnter = async (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            close();
            try {
                if (nameRef.current?.value) {
                    const text = nameRef.current.value;
                    submit(text);
                }
            } catch (error) {
                console.error(error);
            }
        }
    };

    const handleBlur = () => {
        if (canBeClose) {
            close();
        }
    };

    return (
        <TextField
            onKeyDown={handleEnter}
            fullWidth
            id="standard-basic"
            onBlur={handleBlur}
            variant="standard"
            defaultValue={defaultValue}
            inputRef={nameRef}
        />
    );
}
