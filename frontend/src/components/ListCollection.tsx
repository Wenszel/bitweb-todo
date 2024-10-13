import { List, ListItem, Divider } from '@mui/material';
import InboxIcon from '@mui/icons-material/Inbox';
import StarIcon from '@mui/icons-material/Star';
import TodayIcon from '@mui/icons-material/Today';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { SvgIconProps } from '@mui/material/SvgIcon';
interface ListCollectionProps {
    lists: string[];
}

interface defaultListElement {
    name: string;
    icon: React.ComponentType<SvgIconProps>;
}

export default function ListCollection({ lists }: ListCollectionProps) {
    const defaultLists: Array<defaultListElement> = [
        { name: 'Inbox', icon: InboxIcon },
        { name: 'Today', icon: TodayIcon },
        { name: 'Next 7 days', icon: CalendarMonthIcon },
        { name: 'Important', icon: StarIcon },
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
                    >
                        <element.icon sx={{ mr: 1 }} />
                        {element.name}
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {lists.map(list => (
                    <ListItem
                        sx={{
                            bgcolor: 'background.paper',
                            transition: 'all 0.3s',
                            cursor: 'pointer',
                            '&:hover': { bgcolor: '#f0f0f0' },
                        }}
                        key={list}
                    >
                        {list}
                    </ListItem>
                ))}
            </List>
        </>
    );
}
