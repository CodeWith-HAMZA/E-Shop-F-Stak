"use client";
import { Provider } from "react-redux";
import { store } from "./store";
import { ReactNode } from "react";
interface Props {
  children: ReactNode;
}
const StoreProvider: React.FC<Props> = ({ children }: Props) => (
  <Provider store={store}>{children}</Provider>
);

export default StoreProvider;
