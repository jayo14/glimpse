import axios from 'axios';
import { api } from '../lib/axios';

export interface CreateEventPayload {
    title: string;
    description?: string;
    location?: string;
    guest_photo_limit?: number;
    attendees?: number;
    event_start?: string;
    event_end?: string;
}

export const EventService = {
    async createEvent(payload: CreateEventPayload) {
        const res = await api.post('/event/create', payload);
        return res.data;
    },

    async uploadCoverImage(eventId: string, file: File) {
        const signatureRes = await api.post(`/event/${eventId}/media-upload?filename=${file.name}`);
        const { uploadUrl } = signatureRes.data;

        await axios.put(uploadUrl, file, {
            headers: { 'Content-Type': file.type }
        });

        return signatureRes.data.storagePath;
    },

    async addCollaborator(eventId: string, email: string) {
        const res = await api.post(`/event/${eventId}/collaborators`, { email });
        return res.data;
    },

    async checkGateAccess(eventId: string, inviteToken?: string) {
        const res = await api.post('/event/verify-access', {
            event_id: eventId,
            token: inviteToken
        });
        return res.data;
    }
};