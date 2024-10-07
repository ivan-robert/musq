import { SetUsernameModal } from "#modules/Profile/Username/view/SetUsernameModal";
import { UserResource } from "#modules/auth/context/User.context";
import { UserData } from "#modules/auth/domain/userData.types";
import { useUserData } from "#modules/auth/view/useUserData";
import { createContext, useContext } from "react";

type UserDataContextInterface = UserData;

const UserDataContext = createContext<UserDataContextInterface | undefined>(
  undefined
);

export const UserDataContextProvider = ({
  children,
  user,
}: {
  children: React.ReactNode;
  user: UserResource;
}) => {
  const { data } = useUserData(user);

  if (data.username === null || data.username === undefined) {
    return <SetUsernameModal isVisible />;
  }

  return (
    <UserDataContext.Provider value={data}>{children}</UserDataContext.Provider>
  );
};

export const useUserDataContext = () => {
  const context = useContext(UserDataContext);
  if (context === undefined) {
    throw new Error(
      "useUserContext must be used within a UserDataContextProvider"
    );
  }
  return context;
};
