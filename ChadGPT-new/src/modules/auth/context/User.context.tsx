import { useUser } from "@clerk/clerk-expo";

import { createContext, useContext } from "react";

export type UserResource = Exclude<
  ReturnType<typeof useUser>["user"],
  null | undefined
>;

interface UserContextInterface {
  user: UserResource;
}

const UserContext = createContext<UserContextInterface | undefined>(undefined);

export const UserContextProvider = ({
  children,
  user,
}: {
  children: React.ReactNode;
  user: UserResource;
}) => {
  const value = { user };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserContextProvider");
  }
  return context;
};
