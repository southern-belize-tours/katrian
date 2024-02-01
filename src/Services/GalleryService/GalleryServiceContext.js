import { createContext, useContext } from "react";
import GalleryService from './GalleryService'

const GalleryServiceContext = createContext();

export const GalleryServiceProvider = ({ children }) => {
    const galleryService = new GalleryService();

    return (
        <GalleryServiceContext.Provider value = {galleryService}>
            {children}
        </GalleryServiceContext.Provider>
    );
}

export const useGalleryService = () => useContext(GalleryServiceContext);