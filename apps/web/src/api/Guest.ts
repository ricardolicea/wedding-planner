export interface Guest {
    id: string;
    firstname: string;
    lastname?: string;
    email: string;
    phone: string;
    relation: string;
    hasPlusOne: boolean;
    notes: string;
    rsvpStatus: 'accepted' | 'declined' | 'pending';
    dietaryNotes: string;
    createdAt: string;
    updatedAt: string;
    invitedBy: string;
    listtype: string;
    // Add other fields as needed
}