import { DataStore } from 'aws-amplify/datastore';
import { Faq } from '../../models';

export default class FaqService {

    constructor() {
        this.faqs = [];
    }

  /**
   * Gets all faqs from GraphQL
   * 
   * @returns all tours found in the DataStore
   */
  async fetchFaqs() {
    try {
        const newFaqs = await DataStore.query(Faq);
        this.faqs = [...newFaqs];
        return [...this.faqs];
    } catch (e) {
        console.log("Error fetching Frequently Asked Questions", e);
        return [];
    }
  }

  /**
   * Creates a new FAQ item
   * 
   * @param {json object of new object based on data model} data 
   * @returns 
   */
  async createFaq(data) {
    try {
        const post = await DataStore.save(
            new Faq(data)
        );
        const newFaqs = await DataStore.query(Faq);
        this.faqs = [...newFaqs];
    } catch (e) {
        console.log("Error creating new Faq");
        return [];
    }
  }

  /**
   * Deletes a FAQ by ID
   * 
   * @param {ID of FAQ item to be deleted} id 
   * @returns 
   */
  async deleteFaq(id) {
    try {
        const faqToDelete = await DataStore.query(Faq, id);
        await DataStore.delete(faqToDelete);
        // const updatedFaqs = faqs.filter(faq => faq.id !== id);
        // this.faqs = [...updatedFaqs];
        const updatedFaqs = await this.fetchFaqs();
        return [...updatedFaqs];
    } catch (e) {
        console.log("Error deleting Frequently Asked Question", e);
        return [];
    }
  }

  /**
   * Toggles whether a Faq Item is pinned
   * 
   * @param {ID of FAQ item to be updated} id 
   * @param {current pinned status of item} pinned 
   * @returns 
   */
  async pinFaq(id, pinned) {
    try {
        const faqToUpdate = await DataStore.query(Faq, id);
        const updatedFaq = Faq.copyOf(faqToUpdate, updated => {
            updated.pinned = !pinned;
        });
        const result = await DataStore.save(updatedFaq);
        const newFaqs = await DataStore.query(Faq);
        this.faqs = [...newFaqs];
        return [...newFaqs];
    } catch (e) {
        console.log("Error toggling pin ", e);
        return [];
    }
  }

  /**
   * Answers a Faq question
   * 
   * @param {ID of FAQ item to be updated} id 
   * @param {new answer} answer
   * @returns 
   */
  async answerFaq(id, answer) {
    try {
        const faqToUpdate = await DataStore.query(Faq, id);
        const updatedFaq = Faq.copyOf(faqToUpdate, updated => {
            updated.answer = answer;
        });
        const result = await DataStore.save(updatedFaq);
        const newFaqs = await DataStore.query(Faq);
        this.faqs = [...newFaqs];
        return [...newFaqs];
    } catch (e) {
        console.log("Error toggling pin ", e);
        return [];
    }
  }

  /**
     * Builds a dictionary mapping each tour's url to an array of images from a bucket
     * 
     * @returns dictionary object
     */
//   async buildPhotoDict() {
//     let toursReceived = [...this.tours];
//     if (toursReceived.length == 0 ) {
//         try {
//             toursReceived = await this.fetchTours();
//             this.tours = [...toursReceived];
//         } catch (e) {
//             console.log("Error trying to fetch tours when building a photo dictionary", e);
//         }
//     }
//     let newTourPhotoDict = {};
//     for (let i = 0; i < toursReceived.length; ++i) {
//       const folderName = toursReceived[i].url;
//       try {
//         const folderContents = await Storage.list(`${folderName}/`);
//         let files = [];
//         if (folderContents && folderContents.results && folderContents.results.length) {
//           for(let j=0;j<folderContents.results.length; ++j) {
//             let fileExtension = folderContents.results[j].key.split('.').slice(-1)[0];
//             if (fileExtension === "png" || fileExtension === "jpg" || fileExtension === "jpeg") {
//               files.push(folderContents.results[j]);
//             }
//           }
//           const imageUrls = await Promise.all(
//             files.map(async (file) => {
//               const imageUrl = await Storage.get(file.key);
//               return imageUrl;
//             })
//           );
//           let zippedStructure = [];
//           for (let j = 0; j < imageUrls.length; ++j) {
//             let struct = {key: files[j].key, url: imageUrls[j]}
//             zippedStructure.push(struct);
//           }
//           // newTourPhotoDict[folderName] = imageUrls;
//           newTourPhotoDict[folderName] = zippedStructure;
//         } else {
//           newTourPhotoDict[folderName] = [];
//         }
//       } catch (error) {
//         console.log(`Error getting files from folder ${folderName}:`, error);
//       }
//     }
//     return newTourPhotoDict;
//   }

}