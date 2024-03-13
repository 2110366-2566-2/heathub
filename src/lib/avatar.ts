export function generateAvatar(name?: string) {
  return AVATAR_URL + generateOption(name);
}

export function generateOption(name?: string) {
  let base =
    "?backgroundColor=ffdfbf,ffd5dc,d1d4f9,c0aede,b6e3f4&shirtColor=000000,6bd9e9,9287ff&baseColor=f9c9b6&mouth=smirk,laughing,smile,pucker";
  if (name) {
    base += `&seed=${name}`;
  }
  return base;
}

export const AVATAR_URL = "https://api.dicebear.com/7.x/micah/svg";
