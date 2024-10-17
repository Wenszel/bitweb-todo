import { useEffect, useRef, useState } from 'react';
import { ListItem, TextField } from '@mui/material';
import { addTodoList } from '../../graphQLRequests';

interface EntryNameListElementProps {
    setShowNewList: (showNewList: boolean) => void;
    addedListCallback: () => void;
}

export default function EntryNameListElement({ setShowNewList, addedListCallback }: EntryNameListElementProps) {
    const nameRef = useRef<HTMLInputElement>(null);
    const [canBeClose, setCanBeClose] = useState<boolean>(false);

    useEffect(() => {
        if (nameRef.current) {
            nameRef.current.focus();
            nameRef.current.select();
            setCanBeClose(true);
        }
    }, []);

    const handleEnter = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            setShowNewList(false);
            if (nameRef.current?.value) {
                addTodoList(nameRef.current.value);
                addedListCallback();
            }
        }
    };

    const handleBlur = () => {
        if (canBeClose) {
            setShowNewList(false);
        }
    };

    return (
        <ListItem>
            <TextField
                onKeyDown={handleEnter}
                fullWidth
                id="standard-basic"
                onBlur={handleBlur}
                variant="standard"
                defaultValue="New List"
                inputRef={nameRef}
            />
        </ListItem>
    );
}
