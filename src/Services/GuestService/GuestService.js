import { generateClient } from "aws-amplify/api"
import { listGuests } from '../../graphql/queries';
import { createGuest, updateGuest, deleteGuest } from "../../graphql/mutations";


const client = generateClient();

export default class GuestService {

    constructor () {
        this.guests = [];
    }

    // async fetchGuests() {
    //     try {
    //         const newGuests = await client.graphql({
    //             query: listGuests
    //         });
    //         this.guests = [...newGuests.data.listGuests.items];
    //         return [...this.guests];
    //     } catch (e) {
    //         console.log("Guest Service: Error fetching Guests", e);
    //         return [];
    //     }
    // }

    async fetchGuests() {
        try {
            let nextToken = null;
            let allGuests = [];
    
            do {
                const newGuests = await client.graphql({
                    query: listGuests,
                    variables: {
                        nextToken
                    }
                });
    
                allGuests = [...allGuests, ...newGuests.data.listGuests.items];
                nextToken = newGuests.data.listGuests.nextToken;
            } while (nextToken);
    
            this.guests = allGuests;
            return [...this.guests];
        } catch (e) {
            console.log("Guest Service: Error fetching Guests", e);
            return [];
        }
    }
    

    async getGuests() {
        if (this.guests.length === 0) {
            await this.fetchGuests();
        }
        return [...this.guests];
    }

    async createDummyGuest() {
        const dummyGuestData = {
            "first": "John",
            "last": "Doe",
            "attending_ceremony": false,
            "attending_brunch": false,
            "attending_rehearsal": false,
            "attending_happy_hour": false,
        }
        const newGuests = await this.createGuest(dummyGuestData);
        return newGuests;
    }

    async createGuest(data) {
        try {
            const newGuest = await client.graphql({
                query: createGuest,
                variables: {
                    input: data
                }
            });
            this.guests.push({...newGuest.data.createGuest});
            return {...newGuest.data.createGuest};
        } catch (e) {
            console.log("Guest Service: Error creating Guest", e, data);
            return [];
        }
    }

    async updateGuest(data) {
        try {
            console.log("updating guest from service:", data);
            const newGuest = await client.graphql({
                query: updateGuest,
                variables: {
                    input: data
                }
            });
            await this.fetchGuests();
            return {...newGuest};
        } catch (e) {
            console.log("Guest Service: Error updating guest", e, data);
            return null;
        }
    }

    async deleteGuest(id) {
        try {
            await client.graphql({
                query: deleteGuest,
                variables: {
                    input: {
                        id: id
                    }
                }
            });
            const updatedGuests = this.guests.filter(guest => guest.id !== id);
            this.guests = updatedGuests;
            return [...this.guests];
        } catch (e) {
            console.log("Guest Service: Error deleting Guest", e, id);
            return [];
        }
    }

    async deleteAllGuests() {
        const oldGuests = [...this.guests];
        for (let i = 0; i < oldGuests.length; ++i) {
            await this.deleteGuest(oldGuests[i].id);
        }
        this.guests = [];
        return [...this.guests];
    }
}