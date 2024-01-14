// Amplify backend functions
import { DataStore } from 'aws-amplify/datastore';
import { Faq } from '../../models';
import { generateClient } from 'aws-amplify/api';
import { listFaqs, getFaq } from '../../graphql/queries';
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
        const newFaq = await client.graphql({
            query: createFaq,
            variables: {
                input: data
            }
        });
        // this.faqs = [...this.faqs, newFaq];
        // return [...this.faqs];
        const updatedFaqs = await this.fetchFaqs();
        return [...updatedFaqs];

        // const post = await DataStore.save(
        //     new Faq(data)
        // );
        // const newFaqs = await DataStore.query(Faq);
        // this.faqs = [...newFaqs];
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
        const deletedFaq = await client.graphql({
            query: deleteFaq,
            variables: {
                input: {
                    id: id
                }
            }
        });
        const updatedFaqs = await this.fetchFaqs();
        this.faqs = [...updatedFaqs];
        return [...this.faqs];
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
        const faqToUpdate = await client.graphql({
            query: getFaq,
            variables: {
                id: id
            }
        });
        // console.log(faqToUpdate);
        const updatedFaq = await client.graphql({
            query: updateFaq,
            variables: {
                input: {
                    id: id,
                    pinned: !pinned
                }
            }
        });
        // console.log(updatedFaq);
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
        const faqToUpdate = await client.graphql({
            query: getFaq,
            variables: {
                id: id
            }
        });
        // console.log(faqToUpdate);
        const updatedFaq = await client.graphql({
            query: updateFaq,
            variables: {
                input: {
                    id: id,
                    answer: answer
                }
            }
        });
        // console.log(updatedFaq);
        return this.fetchFaqs();
        // const faqToUpdate = await DataStore.query(Faq, id);
        // const updatedFaq = Faq.copyOf(faqToUpdate, updated => {
        //     updated.answer = answer;
        // });
        // const result = await DataStore.save(updatedFaq);
        // const newFaqs = await DataStore.query(Faq);
        // this.faqs = [...newFaqs];
        return [...this.faqs];
    } catch (e) {
        console.log("Error toggling pin ", e);
        return [];
    }
  }

}