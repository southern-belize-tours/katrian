import { Button } from '@mui/material';
import './Groups.css';
import { PersonAdd } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { useGuestService } from '../../Services/GuestService/GuestServiceContext';
import { toast } from 'react-toastify';
import { LoadingButton } from '@mui/lab';

const toastConfig = {
    autoClose: 2000
};

export default function Guests (props) {
    const guestService = useGuestService();

    const [guests, setGuests] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let isSubscribed = true;
        setLoading(true);

        const getGuests = async () => {
            try {
                const guestData = await guestService.getGuests();
                if (isSubscribed) {
                    setGuests(guestData);
                }
            } catch (e) {
                console.log("Guest Component: Error retrieving guests", e);
                toast.error("Failure to Retrieve Guests.", toastConfig);
            } finally {
                if (isSubscribed) {
                    setLoading(false);
                }
            }
        }

        getGuests();

        return () => {
            isSubscribed = false;
            setLoading(false);
        }
    })

    const addDummy = async () => {
        setLoading(true);
        await guestService.createDummyGuest();
        const newGuests = await guestService.getGuests();
        setGuests(newGuests);
        setLoading(false);

    }

    return (
        <div>
            <h1>Guests Works!</h1>
            <Button variant="outlined"
                // loading = {loading}
                // disabled = {loading}
                color="primary"
                onClick = {() => {
                    addDummy();
                }}>
                <PersonAdd></PersonAdd> Add Dummy Person
            </Button>
            {/* <div className="flexed col">
                {guests.map(guest =>
                <div>
                    {guest.first} {guest.last}
                </div>)}
            </div> */}
        </div>
    )
}