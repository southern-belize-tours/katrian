import React from 'react';
import TuneService from './TuneService';

const TuneServiceContext = React.createContext();

export const TuneServiceProvider = ({ children}) => {
    const tuneService = new TuneService();

    return (
        <TuneServiceContext.Provider value = {tuneService}>
            {children}
        </TuneServiceContext.Provider>
    );
};

export const useTuneService = () => React.useContext(TuneServiceContext);