export interface User {
  Email: string;
  Password: string;
}

export interface Host extends User {
  Firstname: string;
  Lastname: string;
  AKA: string;
  Bio: string;
  DOB?: Date;
  Gender: string;
}

export interface Participant extends User {
  Firstname: string;
  Lastname: string;
  AKA: string;
  DOB?: Date;
  Gender: string;
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
  };
  return user;
};

export const isHost = (obj: User): obj is Host => {
  return "Bio" in obj;
};

export const isParticipant = (obj: User): obj is Participant => {
  return !("Bio" in obj);
};
