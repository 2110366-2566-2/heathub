import {
  faBasketball,
  faBook,
  faCamera,
  faDumbbell,
  faFilm,
  faFutbol,
  faGamepad,
  faMugHot,
  faMusic,
  faPalette,
  faPaw,
  faShirt,
  faTents,
} from "@fortawesome/free-solid-svg-icons";

export const tagStyle = {
  Football: {
    icon: faFutbol,
    color: "green"
  },
  Music: {
    icon: faMusic,
    color: "red",
  },
  "K-pop": {
    icon: faMusic,
    color: "red",
  },
  Movie: {
    icon: faFilm,
    color: "pink",
  },
  Anime: {
    icon: faFilm,
    color: "pink",
  },
  Book: {
    icon: faBook,
    color: "blue",
  },
  Fashion: {
    icon: faShirt,
    color: "pink"
  },
  Animal: {
    icon: faPaw,
    color: "yellow",
  },
  Gym: {
    icon: faDumbbell,
    color: "green",
  },
  Photography: {
    icon: faCamera,
    color: "blue",
  },
  Gaming: {
    icon: faGamepad,
    color: "blue",
  },
  Coffee: {
    icon: faMugHot,
    color: "yellow",
  },
  Arts: {
    icon: faPalette,
    color: "blue"
  },
  Camping: {
    icon: faTents,
    color: "yellow",
  },
  Basketball: {
    icon: faBasketball,
    color: "green",
  },
  }as const;

export const tagList = Object.keys(tagStyle) as TagList;

export type Tag = keyof typeof tagStyle;
export type TagList = Tag[];
