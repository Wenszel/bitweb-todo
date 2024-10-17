import { List, ListItem, Divider } from '@mui/material';
import InboxIcon from '@mui/icons-material/Inbox';
import StarIcon from '@mui/icons-material/Star';
import TodayIcon from '@mui/icons-material/Today';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { SvgIconProps } from '@mui/material/SvgIcon';
import NameObject from '../interfaces/NameObject';
import AddList from './AddList/AddList';
import EntryNameListElement from './EntryNameListElement/EntryNameListElement';

interface ListCollectionProps {
    lists: NameObject[];
    handleListClick: (id: number, name: string) => void;
    handleAddListClick: () => void;
    setShowNewList: (showNewList: boolean) => void;
    addedListCallback: () => void;
    showNewList: boolean;
}

interface defaultListElement {
    id: number;
    name: string;
    icon: React.ComponentType<SvgIconProps>;
}

export default function ListCollection({ lists, handleListClick, handleAddListClick, setShowNewList, showNewList, addedListCallback}: ListCollectionProps) {
    const defaultLists: Array<defaultListElement> = [
        { id: -1, name: 'Inbox', icon: InboxIcon },
        { id: -2, name: 'Today', icon: TodayIcon },
        { id: -3, name: 'Next 7 days', icon: CalendarMonthIcon },
        { id: -4, name: 'Important', icon: StarIcon },
    ];

    return (
        <>
            <List>
                {defaultLists.map((element: defaultListElement) => (
                    <ListItem
                        sx={{
                            bgcolor: 'background.paper',
                            transition: 'all 0.3s',
                            cursor: 'pointer',
                            '&:hover': { bgcolor: '#f0f0f0' },
                        }}
                        key={element.name}
                        onClick={() => handleListClick(element.id, element.name)}
                    >
                        <element.icon sx={{ mr: 1 }} />
                        {element.name}
                    </ListItem>
                ))}
            </List>
            <Divider />
            <AddList handleAddListClick={handleAddListClick} />
            {showNewList && <EntryNameListElement addedListCallback={addedListCallback} setShowNewList={setShowNewList} />}
            <List>
                {lists.map((list: NameObject) => (
                    <ListItem
                        sx={{
                            bgcolor: 'background.paper',
                            transition: 'all 0.3s',
                            cursor: 'pointer',
                            '&:hover': { bgcolor: '#f0f0f0' },
                        }}
                        key={list.id}
                        onClick={() => handleListClick(list.id, list.name)}
                    >
                        {list.name}
                    </ListItem>
                ))}
            </List>
        </>
    );
}
