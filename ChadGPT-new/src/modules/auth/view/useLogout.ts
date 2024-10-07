import { useAuth } from "@clerk/clerk-expo";

export const useLogout = () => {
  const { signOut } = useAuth();

  const logout = () => {
    signOut();
  };
  return { logout };
};
