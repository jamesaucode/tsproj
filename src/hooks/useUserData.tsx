import { useUserContext } from "../context/UserContext";
import { UserTypes } from "../../resources/user/user.model";

export const useUserData = (): { data: UserTypes } => {
  const userData = useUserContext();

  return userData;
};
