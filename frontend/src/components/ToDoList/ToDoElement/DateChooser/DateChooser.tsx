import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { changeDueTo as databaseChangeDueTo } from '../../../../graphQLRequests';
import { useBoundStore } from '../../../../store/boundStore';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

interface DateChooserProps {
    todoId: number;
    dueDate: string | undefined;
}

export default function DateChooser({ todoId, dueDate }: DateChooserProps) {
    const storeChangeDueTo = useBoundStore(state => state.changeDueTo);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    const getDate = (date: string | undefined) => {
        return dayjs(date);
    };

    const handleDateChange = async (date: any) => {
        try {
            await databaseChangeDueTo(todoId, date.format('YYYY-MM-DD'));
            storeChangeDueTo(todoId, date.format('YYYY-MM-DD'));
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 1000);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            {isMobile ? (
                <MobileDatePicker value={dueDate ? getDate(dueDate) : null} onChange={handleDateChange} />
            ) : (
                <DatePicker value={dueDate ? getDate(dueDate) : null} onChange={handleDateChange} />
            )}
        </LocalizationProvider>
    );
}
