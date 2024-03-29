export interface User {
  Email: string;
  Password: string;
  Firstname: string;
  Lastname: string;
  Username: string;
  DOB: Date | undefined;
  Image: File | null;
  Gender: string;
}

export interface Host extends User {
  Bio: string;
  Interest: string[];
}

export type Participant = User;

export const createHost = () => {
  const user: Host = {
    Firstname: "",
    Lastname: "",
    Username: "",
    Bio: "",
    Gender: "",
    Email: "",
    Password: "",
    DOB: undefined,
    Interest: [],
    Image: null,
  };
  return user;
};

export const createParticipant = () => {
  const user: Participant = {
    Firstname: "",
    Lastname: "",
    Username: "",
    Gender: "",
    Email: "",
    Password: "",
    DOB: undefined,
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
