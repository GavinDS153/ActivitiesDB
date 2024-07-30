import { createContext } from "react";

export const TagsContext = createContext({
  tagsList: [],
  setTagsList: () => {},
});
