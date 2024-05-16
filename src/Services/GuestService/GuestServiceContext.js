import React from "react";
import GuestService from "./GuestService";

const GuestServiceContext = React.createContext();

export const GuestServiceProvider = ({children}) => {
    const guestService = new GuestService();

    return (
        <GuestServiceContext.Provider value = {guestService}>
            {children}
        </GuestServiceContext.Provider>
    );
};

export const useGuestService = () => React.useContext(GuestServiceContext);