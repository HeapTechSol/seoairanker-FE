import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { CookiesProvider, useCookies } from "react-cookie";

import { decryptData, encryptData, isEmpty } from "@/utils/helper";
import { loginInitialValues } from "../utils";
import { LoginSchema } from "@/utils/validations";
import { LoginPayloadTypes } from "../pages/SignUp/types";
import { AUTH, EXACT_ROUTES } from "@/constant/routes";
import { COOCKIES_EXPIRATION_TIME } from "@/constant/constant";

const { FORGET_PASSWORD } = EXACT_ROUTES;
const { LOGIN } = AUTH;

const useLoginHandler = () => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  const decryptCookies = decryptData(cookies?.user);

  const { control, handleSubmit } = useForm({
    defaultValues: isEmpty(decryptCookies)
      ? loginInitialValues
      : decryptCookies,
    resolver: zodResolver(LoginSchema),
  });

  const loginHandler = (credentials: LoginPayloadTypes) => {
    if (credentials?.isRemember) {
      const encryptedData = encryptData(credentials);
      setCookie("user", encryptedData, {
        path: LOGIN,
        expires: COOCKIES_EXPIRATION_TIME,
      });
    } else {
      removeCookie("user", { path: LOGIN });
    }
    try {
      console.log(credentials);
    } catch (error) {
      console.log(error);
    }
  };

  const onForgetPasswordClick = () => navigate(FORGET_PASSWORD);

  return {
    control,
    handleSubmit,
    loginHandler,
    CookiesProvider,
    onForgetPasswordClick,
  };
};

export default useLoginHandler;
