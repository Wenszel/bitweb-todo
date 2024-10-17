import { Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

interface AddListProps {
    handleAddListClick: () => void;
}

export default function AddList({ handleAddListClick }: AddListProps) {
    return (
        <Box
         onClick={() => handleAddListClick()}
         sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <AddIcon />
            Add new list
        </Box>
    );
}
