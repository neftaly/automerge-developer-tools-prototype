import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// Save Zustand state to URL params
const hashStorage = {
  getItem: (key) => {
    const searchParams = new URLSearchParams(window.location.search.slice(1));
    return searchParams.get(key) ?? "";
  },
  setItem: (key, newValue) => {
    const searchParams = new URLSearchParams(window.location.search.slice(1));
    searchParams.set(key, newValue);
    window.history.replaceState(null, "", `?${searchParams.toString()}`);
  },
  removeItem: (key) => {
    const searchParams = new URLSearchParams(window.location.search.slice(1));
    searchParams.delete(key);
    window.location.search = searchParams.toString();
  },
};

export const useStore = create(
  persist(
    (set) => ({
      selectedUrl: null,
      setSelectedUrl: (selectedUrl) => set({ selectedUrl }),
    }),
    {
      name: "s",
      storage: createJSONStorage(() => hashStorage),
    },
  ),
);

// Generate a URL describing a state
export const getUrl = (state, { name, version }) => {
  const newValue = JSON.stringify({ state, version });
  const searchParams = new URLSearchParams();
  searchParams.set(name, newValue);
  return `${window.location.origin}?${searchParams.toString()}`;
};

// Generate a link to open an automerge document URL
export const getLinkUrl = (selectedUrl) => {
  const oldState = useStore.getState();
  const state = { ...oldState, selectedUrl };
  const options = useStore.persist.getOptions();
  return getUrl(state, options);
};
