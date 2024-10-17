import { useEffect, useRef, useState } from 'react';
import { ListItem, TextField } from '@mui/material';
import { addTodoList as databaseAddTodoList } from '../../../graphQLRequests';
import { useBoundStore } from '../../../store/boundStore';

export default function EntryNameListElement() {
    const nameRef = useRef<HTMLInputElement>(null);
    const [canBeClose, setCanBeClose] = useState<boolean>(false);
    const storeAddTodoList = useBoundStore(state => state.addList);
    const setShowNewList = useBoundStore(state => state.setShowNewList);

    useEffect(() => {
        if (nameRef.current) {
            nameRef.current.focus();
            nameRef.current.select();
            setCanBeClose(true);
        }
    }, []);

    const handleEnter = async (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            setShowNewList(false);
            try {
                if (nameRef.current?.value) {
                    const listName = nameRef.current.value;
                    const { id } = await databaseAddTodoList(listName);
                    storeAddTodoList(listName, id);
                }
            } catch (error) {
                console.error(error);
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
