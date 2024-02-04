enum Type {
    host,
    participant
}

export interface user {
    id: string;
    firstname?: string;
    lastname?: string;
    AKA?: string;
    dateOfBirth?: Date;
    type: Type
}

