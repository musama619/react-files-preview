import { configureStore } from "@reduxjs/toolkit";

import file from "./src/redux/fileSlice";

const store = configureStore({
  reducer: {
    file: file,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type RootState = ReturnType<typeof store.getState>
export default store;