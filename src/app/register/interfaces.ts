export interface User {
  Email: string;
  Password: string;
}

export interface Host extends User {
  Firstname: string;
  Lastname: string;
  AKA: string;
  Bio: string;
  DOB: string;
  Gender: string;
}

export interface Participant extends User {
  Firstname: string;
  Lastname: string;
  AKA: string;
  DOB: string;
  Gender: string;
}

export const createHost = () => {
  const user: Host = {
    Firstname: "",
    Lastname: "",
    AKA: "",
    Bio: "",
    DOB: "",
    Gender: "",
    Email: "",
    Password: "",
  };
  return user;
};

export const createParticipant = () => {
  const user: Participant = {
    Firstname: "",
    Lastname: "",
    AKA: "",
    DOB: "",
    Gender: "",
    Email: "",
    Password: "",
  };
  return user;
};

export const isHost = (obj: User): obj is Host => {
  return "Bio" in obj;
};
