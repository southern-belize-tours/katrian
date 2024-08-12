import { generateClient } from "aws-amplify/api";

import { listGroups } from '../../graphql/queries';
import { createGroup, updateGroup, deleteGroup } from "../../graphql/mutations";

const client = generateClient();

export default class GroupService {

    constructor() {
        this.groups = [];
    }

    async getGroups() {
        if (this.groups.length === 0) {
            const groups = await this.fetchGroups();
            return groups
        } else {
            return this.groups;
        }
    }

    async fetchGroups() {
        try {
            const newGroups = await client.graphql({
                query: listGroups
            });
            this.groups = [...newGroups.data.listGroups.items];
            return [...this.groups];
        } catch (e) {
            console.log("Group Service: Error fetching Groups", e);
            return [];
        }
    }

    async updateGroup(data) {
        try {
            const newGroup = await client.graphql({
                query: updateGroup,
                variables: {
                    input: data
                }
            });
            await this.fetchGroups();
            return {...newGroup};
        } catch (e) {
            console.log("Group Service: Error updating group", e, data);
            return null;
        }
    }

    async createDummyGroup(guestIds) {
        try {
            const dummyData = {
                "title": "Dummy Group",
                "invited_rehearsal": Math.random() >= 0.5,
                "address": "1234 Shoreline Drive",
                "city": "San Diego",
                "state": "California",
                "zip": "92122",
                "phone": "3036645036",
                "invited_happy_hour": Math.random() >= 0.5,
                "email": "Jdoe@gmail.com",
                "Guest_ids": guestIds,
            }
            const newGroup = await this.createGroup(dummyData);
            return newGroup;
        } catch (e) {
            console.log("Group Service: Error creating dummy Group", e, guestIds);
            return [];
        }
    }

    async createGroup(data) {
        try {
            const newGroup = await client.graphql({
                query: createGroup,
                variables: {
                    input: data
                }
            });
            this.groups.push({...newGroup.data.createGroup});
            return {...newGroup.data.createGroup};
        } catch (e) {
            console.log("Group Service: Error creating Group", e, data);
            return [];
        }
    }

    async deleteGroup(id) {
        try {
            await client.graphql({
                query: deleteGroup,
                variables: {
                    input: {
                        id: id
                    }
                }
            });
            const updatedGroups = this.groups.filter(group => group.id !== id);
            this.groups = updatedGroups;
            return [...this.groups];
        } catch (e) {
            console.log("Group Service: Error deleting Group", e, id);
            return [];
        }
    }

    async deleteAllGroups() {
        const oldGroups = [...this.groups];
        for (let i = 0; i < oldGroups.length; ++i) {
            await this.deleteGroup(oldGroups[i].id)
        }
        this.groups = [];
        return [...this.groups];
    }

}