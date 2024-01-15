import React from 'react';
import FaqService from './FaqService';

const FaqServiceContext = React.createContext();

export const FaqServiceProvider = ({ children }) => {
  const faqService = new FaqService();

  return (
    <FaqServiceContext.Provider value={faqService}>
      {children}
    </FaqServiceContext.Provider>
  );
};

export const useFaqService = () => React.useContext(FaqServiceContext);