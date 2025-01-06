import { createContext } from "react";

export const ActQueryContext = createContext({
  tagsList: [],
  setTagsList: () => {},
});
