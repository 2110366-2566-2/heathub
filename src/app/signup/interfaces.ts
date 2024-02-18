export interface User {
  Email: string;
  Password: string;
  Firstname: string;
  Lastname: string;
  AKA: string;
  DOB: Date;
}

export interface Host extends User {
  Bio: string;
  Gender: string;
  Interest: string[];
  Image: File | null;
}

export interface Participant extends User {
  Gender: string;
  Image: File | null;
}

export const createHost = () => {
  const user: Host = {
    Firstname: "",
    Lastname: "",
    AKA: "",
    Bio: "",
    Gender: "",
    Email: "",
    Password: "",
    DOB: new Date(),
    Interest: [],
    Image: null,
  };
  return user;
};

export const createParticipant = () => {
  const user: Participant = {
    Firstname: "",
    Lastname: "",
    AKA: "",
    Gender: "",
    Email: "",
    Password: "",
    DOB: new Date(),
    Image: null,
  };
  return user;
};

export const isHost = (obj: User): obj is Host => {
  return "Bio" in obj;
};

export const isParticipant = (obj: User): obj is Participant => {
  return !("Bio" in obj);
};
