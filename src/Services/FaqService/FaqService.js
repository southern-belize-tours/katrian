// Amplify backend functions
import { generateClient } from 'aws-amplify/api';
import { listFaqs } from '../../graphql/queries';
import { createFaq, deleteFaq, updateFaq } from '../../graphql/mutations';

const client = generateClient();

export default class FaqService {

    constructor() {
        this.faqs = [];
        this.loading = true;
    }

    isLoading () {
        return this.loading;
    }


  /**
   * Gets all faqs from GraphQL
   * 
   * @returns all tours found in the DataStore
   */
  async fetchFaqs() {
    try {
        const newFaqs = await client.graphql({
            query: listFaqs
        });
        this.faqs = [...newFaqs.data.listFaqs.items];
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
        await client.graphql({
            query: createFaq,
            variables: {
                input: data
            }
        });
        const updatedFaqs = await this.fetchFaqs();
        return updatedFaqs;
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
        await client.graphql({
            query: deleteFaq,
            variables: {
                input: {
                    id: id
                }
            }
        });
        const updatedFaqs = await this.fetchFaqs();
        return updatedFaqs;
    } catch (e) {
        console.log("Error deleting Frequently Asked Question", e);
        return [];
    }
  }

  /**
   * Toggles whether a Faq Item is pinned
   * 
   * @param {ID of FAQ item to be updated} id 
   * @param {current pinned status of item, which will be toggled} pinned 
   * @returns 
   */
  async pinFaq(id, pinned) {
    try {
        await client.graphql({
            query: updateFaq,
            variables: {
                input: {
                    id: id,
                    pinned: !pinned
                }
            }
        });
        return this.fetchFaqs();
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
        await client.graphql({
            query: updateFaq,
            variables: {
                input: {
                    id: id,
                    answer: answer
                }
            }
        });
        return this.fetchFaqs();
    } catch (e) {
        console.log("Error answering faq ", e);
        return [];
    }
  }

}