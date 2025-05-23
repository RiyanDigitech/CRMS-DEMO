import Cookies from "js-cookie";
import {
  cookieAuth,
  cookieData,
  cookieHirarchyPersonData,
  cookieRefresh,
  tokenRetries,
} from "@/lib/cookies";
import { UserType } from "@/lib/types/user";

class TokenService {
  getLocalAccessToken = () => {
    return Cookies.get(cookieAuth);
  };
  saveLocalAccessToken = (token: string) => {
    Cookies.set(cookieAuth, token, { sameSite: "strict" });
  };
  getLocalRefreshToken = () => {
    return Cookies.get(cookieRefresh);
  };
  saveLocalRefreshToken = (token: string) => {
    Cookies.set(cookieRefresh, token);
  };
  getUser = (): null | any => {
    return JSON.parse(localStorage.getItem(cookieData)!);
  };
  getRole = () => {
    const user = this.getUser();
    if (user) {
      return user.roleId;
    }
    return null;
  };
  setUser = (user: UserType) => {
    localStorage.setItem(cookieData, JSON.stringify(user));
  };
  updateUser = <T extends keyof UserType>(key: T, value: UserType[T]) => {
    const userObject = this.getUser();
    if (userObject) {
      userObject[key] = value;
      this.setUser(userObject);
    } else {
      throw new Error("Error");
    }
  };
  setTokenRetries = (retries: number) => {
    localStorage.setItem(tokenRetries, retries.toString());
  };
  getTokenRetries = () => {
    return parseInt(localStorage.getItem(tokenRetries)!);
  };
  clearStorage = () => {
    localStorage.clear();
    Cookies.remove(cookieAuth);
    Cookies.remove(cookieData);
  };
}
export default new TokenService();
