import { createContext } from "react";
import { UiStore } from "./UiStore";

interface Store {
  uiStore: UiStore; // If we have more store, we can add in this interface.
}

export const store: Store = {
  uiStore: new UiStore(),   // if we have more store, we can instantiate here.
};

export const StoreContext = createContext(store);
