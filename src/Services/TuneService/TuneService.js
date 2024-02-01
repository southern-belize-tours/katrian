import { generateClient } from "aws-amplify/api";

import { listTunes } from "../../graphql/queries";
import { createTune, updateTune, deleteTune } from "../../graphql/mutations";


const client = generateClient();

export default class TuneService {

    constructor() {
        this.tunes = [];
        this.loading = true;
    }

    isLoading () {
        return this.loading;
    }

    async fetchTunes() {
        try {
            const newTunes = await client.graphql({
                query: listTunes
            });
            this.tunes = [...newTunes.data.listTunes.items];
            return [...this.tunes];
        } catch (e) {
            console.log("Error fetching Playlist Tunes", e);
            return [];
        }
    }

    async createTune(data) {
        try {
            const newTune = await client.graphql({
                query: createTune,
                variables: {
                    input: data
                }
            });
            this.tunes = [...this.tunes, newTune.data.createTune];
            return [...this.tunes];
        } catch (e) {
            console.log("Error adding tune", e);
            return [];
        }
    }

    async deleteTune(id) {
        try {
            await client.graphql({
                query: deleteTune,
                variables: {
                    input: {
                        id: id
                    }
                }
            });
            const updatedTunes = this.tunes.filter(tune => tune.id !==id);
            this.tunes = [...updatedTunes];
            return [...this.tunes];
        } catch (e) {
            console.log("Error deleting tune", e);
            return [];
        }
    }

    async updateTune(id, name, artist) {
        try {
            await client.graphql({
                query: updateTune,
                variables: {
                    input: {
                        id: id,
                        name: name,
                        artist: artist
                    }
                }
            });
            const newTunes = await this.fetchTunes();
            return [...newTunes];
        } catch (e) {
            console.log("Error updating tune name", e);
            return [];
        }
    }

    async updateTuneName(id, name) {
        try {
            await client.graphql({
                query: updateTune,
                variables: {
                    input: {
                        id: id,
                        name: name
                    }
                }
            });
            const newTunes = await this.fetchTunes();
            return [...newTunes];
        } catch (e) {
            console.log("Error updating tune name", e);
            return [];
        }
    }

    async updateTuneArtist(id, artist) {
        try {
            await client.graphql({
                query: updateTune,
                variables: {
                    input: {
                        id: id,
                        artist: artist
                    }
                }
            });
            const newTunes = await this.fetchTunes();
            return [...newTunes];
        } catch (e) {
            console.log("Error updating tune artist", e);
            return [];
        }
    }
}