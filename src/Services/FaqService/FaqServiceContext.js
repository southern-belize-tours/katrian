import { createContext, useContext } from 'react';
import FaqService from './FaqService';

const FaqServiceContext = createContext();

export const FaqServiceProvider = ({ children }) => {
  const faqService = new FaqService();

  return (
    <FaqServiceContext.Provider value={faqService}>
      {children}
    </FaqServiceContext.Provider>
  );
}

export const useFaqService = () => useContext(FaqServiceContext);