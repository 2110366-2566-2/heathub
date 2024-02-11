export interface Host {
  Firstname: string;
  Lastname: string;
  AKA: string;
  Bio: string;
  DOB: string;
  Gender: string;
}

export interface Participant {
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
  };
  return user;
};

export const isHost = (value: Host): value is Host => {
  if (value.Bio) return true;
  return false;
};
