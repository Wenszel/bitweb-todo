import { Box } from '@mui/material';
import { useBoundStore } from '../../../store/boundStore';
import AddIcon from '@mui/icons-material/Add';

export default function AddList() {
    const setShowNewList = useBoundStore(state => state.setShowNewList);

    const handleAddListClick = () => {
        setShowNewList(true);
    };

    return (
        <Box onClick={handleAddListClick} sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <AddIcon />
            Add new list
        </Box>
    );
}
