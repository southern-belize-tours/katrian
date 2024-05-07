import { getUrl, list, remove, uploadData } from 'aws-amplify/storage'
import { listGalleries, getGallery } from '../../graphql/queries';
import { createGallery, deleteGallery, updateGallery } from '../../graphql/mutations';
import { generateClient } from 'aws-amplify/api';

const client = generateClient();

/**
 * Galleries have:
 *    1) Name: String
 *    2) Long Description: String
 *    3) Alts: String[]
 *    4) Photo Directory: String
 *    5) Admin Only: Boolean
 */
export default class GalleryService {

    constructor () {
        this.galleries = [];
        this.photos = [];
    }

    // "Validation error of type FieldUndefined: Field 'listGallerys' in type 'Query' is undefined @ 'listGallerys'"
    async fetchGalleries () {
        try {
            const newGalleries = await client.graphql({
                query: listGalleries
            });
            this.galleries = [...newGalleries.data.listGalleries.items];
            const res = await list();
            this.photos = res.items;
            return [...this.galleries];
        } catch (e) {
            console.log("Error fetching Galleries", e);
            return -1;
        }
    }

    async fetchGalleryLinks () {
        if (this.galleries.length) {
            return this.galleries;
        }
        try {
            const newGalleries = await client.graphql({
                query: listGalleries
            });
            this.galleries = [...newGalleries.data.listGalleries.items];
            return [...this.galleries]
        } catch (e) {
            console.log("Error fetching Gallery Links")
            return -1;
        }
    }

    // async removeGallery (gallery) {

    // }

    async fetchPhotosByGallery (directoryName) {
        // Fetch the photos if this hasn't already been done
        if (!this.galleries.length && !this.photos.length) {
            await this.fetchGalleries;
        }

        // List the photos in the gallery of interest
        const galleryPhotos = this.photos.filter(photo => {
            const keyParts = photo.key.split('-');
            return keyParts.length > 0 && keyParts[0] === directoryName
        });

        // Download the photos
        let downloadedPhotos = [];
        for (let i = 0; i < galleryPhotos.length; ++i) {
            try {
                const result = await getUrl({
                    key: galleryPhotos[i].key
                });
                downloadedPhotos.push({url: result.url.href, key: galleryPhotos[i].key});
            } catch (e) {
                console.log("Error downloading photos", e);
            }
        }
        return downloadedPhotos;
    }

    async updateGalleryAlts(id, newAlts) {
        const newData = { id: id, alts: [...newAlts]};
        console.log("New data: ", newData);
        try {
            const updatedGallery = await client.graphql({
                query: updateGallery,
                variables: {
                    input: newData
                }
            });
            console.log(updatedGallery);
            return this.fetchGalleries();
        } catch (e) {
            console.log("Error updating gallery", e);
            return [];
        }
    }

    async addNewFilesAlts(id, directoryName, newAlts, newFiles) {
        await this.addNewGalleryFiles(directoryName, newFiles);
        const newGalleries = await this.updateGalleryAlts(id, newAlts);
        return newGalleries;
    }

    async addNewGalleryFiles (directoryName, images) {
        // Goes through all files and adds them to bucket 
        for (let i = 0; i < images.length; ++i) {
            try {
                const result = await uploadData({
                    key: `${directoryName}-${images[i].name}`,
                    data: images[i]
                }).result;
                console.log("Success uploading file: ", result);
            } catch (e) {
                console.log("Error on file upload: ", e);
            }
        }
    }

    async resetGalleryFiles (directoryName, images) {
        console.log(directoryName);
        console.log(images);

        // File names are prefixed directory_name + fileName
        if (!this.galleries.length && !this.photos.length) {
            await this.fetchGalleries;
        }

        // List the photos in the gallery of interest
        const galleryPhotos = this.photos.filter(photo => {
            const keyParts = photo.key.split('-');
            return keyParts.length > 0 && keyParts[0] === directoryName
        });

        console.log(galleryPhotos);

        for (let i = 0; i < galleryPhotos.length; ++i) {
            let found = false;
            for (let j = 0; j < images.length; ++j) {
                if (images[j].key && images[j].key === galleryPhotos[i].key) {
                    found = true;
                    break;
                }
            }
            // Remove photos that were deleted in the component in the current gallery
            if (!found) {
                try {
                    await remove({key: galleryPhotos[i].key});
                } catch (e) {
                    console.log("Error removing file ", e);
                }
            }
        }

                
        for (let i = 0; i < images.length; ++i) {
            
        }
    }

    /**
     * 
     * @param {current route} directory 
     * @returns 
     */
    galleryExists(directory) {
        for (let i = 0; i < this.galleries; ++i) {
            if (this.galleries[i].directory === directory) {
                return true;
            }
        }
        return false;
    }

    async createGallery(metadata, images) {
        if (this.galleryExists(metadata.id)) {
            return [];
        }
        try {
            // Create the new gallery graphql entry
            await client.graphql({
                query: createGallery,
                variables: {
                    input: metadata
                }
            });
            await this.addNewGalleryFiles(metadata.directory, images);

            const updatedGalleries = await this.fetchGalleries();
            return updatedGalleries;
        } catch (e) {
            console.log("Error creating new Gallery");
            return [];
        }
    }

    async getGallery (id) {
        try {
            const gallery = await client.graphql({
                query: getGallery,
                variables: {
                    input: {
                        id: id
                    }
                }
            });
            return gallery;
        } catch (e) {
            console.log("Error getting gallery", e);
            return null;
        }
    }

    getGalleries () {
        return [...this.galleries]
    }

    async deleteGallery (id) {
        try {
            // First reset the aws bucket to be empty for files starting with the gallery directory
            const galleryDirectory = this.galleries.find(gallery => gallery.id === id).directory;
            await this.resetGalleryFiles(galleryDirectory, []);

            // Then remove the gallery object
            await client.graphql({
                query: deleteGallery,
                variables: {
                    input: {
                        id: id
                    }
                }
            });
            const updatedGalleries = await this.fetchGalleries();
            return updatedGalleries;
        } catch (e) {
            console.log("Error deleting gallery", e);
            return [];
        }
    }

    async updateGallery(id, data, files) {
        const newData = { id: id, ...data};
        try {
            const updatedGallery = await client.graphql({
                query: updateGallery,
                variables: {
                    input: newData
                }
            });
            console.log(updatedGallery);
            await this.resetGalleryFiles(updatedGallery.data.updateGallery.directory, files);
            return this.fetchGalleries();
        } catch (e) {
            console.log("Error updating gallery", e);
            return [];
        }
        
    }

    /**
     * 
     * @param {*} filename 
     * @param {*} file 
     */
    async uploadFile (filename, file) {
        try {
            const result = await uploadData({
              key: filename,
              data: file
            }).result;
            console.log('Succeeded: ', result);
          } catch (error) {
            console.log('Error : ', error);
          }
    }

}