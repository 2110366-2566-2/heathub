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
    color: "bg-tag-green",
  },
  Music: {
    icon: faMusic,
    color: "bg-tag-red",
  },
  "K-pop": {
    icon: faMusic,
    color: "bg-tag-red",
  },
  Movie: {
    icon: faFilm,
    color: "bg-tag-pink",
  },
  Anime: {
    icon: faFilm,
    color: "bg-tag-pink",
  },
  Book: {
    icon: faBook,
    color: "bg-tag-blue",
  },
  Fashion: {
    icon: faShirt,
    color: "bg-tag-pink",
  },
  Animal: {
    icon: faPaw,
    color: "bg-tag-yellow",
  },
  Gym: {
    icon: faDumbbell,
    color: "bg-tag-green",
  },
  Photography: {
    icon: faCamera,
    color: "bg-tag-blue",
  },
  Gaming: {
    icon: faGamepad,
    color: "bg-tag-blue",
  },
  Coffee: {
    icon: faMugHot,
    color: "bg-tag-yellow",
  },
  Arts: {
    icon: faPalette,
    color: "bg-tag-blue",
  },
  Camping: {
    icon: faTents,
    color: "bg-tag-yellow",
  },
  Basketball: {
    icon: faBasketball,
    color: "bg-tag-green",
  },
} as const;

export const tagList = Object.keys(tagStyle) as TagList;

export type Tag = keyof typeof tagStyle;
export type TagList = Tag[];
