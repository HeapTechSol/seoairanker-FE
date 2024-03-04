import { z } from "zod";

import { SchemaConstants } from "./validationSchema";
import { CommonValidations } from "./commonValidations";
import { ALPHABETS_REGEX, PASSWORD_REGEX } from "./regex";
import { registerBuyerLabel } from "@/constant/validationsMessages";

import {
  ChangePasswordPayloadTypes,
  ForgetPasswordPayloadTypes,
  LoginPayloadTypes,
  ResetPasswordPayloadTypes,
  SignupPayloadTypes,
  VerifyOTPPayloadTypes,
} from "@/container/auth/pages/SignUp/types";

const {
  requiredMessage,
  minCountMessage,
  maxCountMessage,
  invalidEmail,
  onlyAlphabets,
} = CommonValidations;

export const SignUpSchema: z.ZodType<SignupPayloadTypes> = z
  .object({
    firstName: z
      .string()
      .min(1, requiredMessage(registerBuyerLabel.firstName))
      .regex(ALPHABETS_REGEX, onlyAlphabets(registerBuyerLabel.firstName))
      .min(
        SchemaConstants.firstName.minCount,
        minCountMessage(
          registerBuyerLabel.firstName,
          SchemaConstants.firstName.minCount
        )
      )
      .max(
        SchemaConstants.firstName.maxCount,
        maxCountMessage(
          registerBuyerLabel.firstName,
          SchemaConstants.firstName.minCount
        )
      ),
    lastName: z
      .string()
      .min(1, requiredMessage(registerBuyerLabel.lastName))
      .regex(ALPHABETS_REGEX, onlyAlphabets(registerBuyerLabel.lastName))
      .min(
        SchemaConstants.lastName.minCount,
        minCountMessage(
          registerBuyerLabel.lastName,
          SchemaConstants.lastName.minCount
        )
      )
      .max(
        SchemaConstants.lastName.maxCount,
        maxCountMessage(
          registerBuyerLabel.lastName,
          SchemaConstants.lastName.minCount
        )
      ),

    email: z.string().min(1, requiredMessage(registerBuyerLabel.email)).email({
      message: invalidEmail,
    }),
    password: z
      .string()
      .min(1, requiredMessage(registerBuyerLabel.password))
      .regex(PASSWORD_REGEX, SchemaConstants.password.invalidPassword)
      .min(
        SchemaConstants.password.minCount,
        minCountMessage(
          registerBuyerLabel.password,
          SchemaConstants.password.minCount
        )
      )
      .max(
        SchemaConstants.password.maxCount,
        maxCountMessage(
          registerBuyerLabel.password,
          SchemaConstants.password.maxCount
        )
      ),
    confirmPassword: z
      .string()
      .min(1, requiredMessage(registerBuyerLabel.confirmPassword)),
  })
  .required()
  .refine((data) => data.confirmPassword === data.password, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const LoginSchema: z.ZodType<LoginPayloadTypes> = z.object({
  email: z.string().min(1, requiredMessage(registerBuyerLabel.email)).email({
    message: invalidEmail,
  }),
  isRemember: z.boolean(),
  password: z.string().min(1, requiredMessage(registerBuyerLabel.password)),
});

export const ResetPasswordSchema: z.ZodType<ResetPasswordPayloadTypes> = z
  .object({
    password: z
      .string()
      .min(1, requiredMessage(registerBuyerLabel.password))
      .regex(PASSWORD_REGEX, SchemaConstants.password.invalidPassword)
      .min(
        SchemaConstants.password.minCount,
        minCountMessage(
          registerBuyerLabel.password,
          SchemaConstants.password.minCount
        )
      )
      .max(
        SchemaConstants.password.maxCount,
        maxCountMessage(
          registerBuyerLabel.password,
          SchemaConstants.password.maxCount
        )
      ),
    confirmPassword: z
      .string()
      .min(1, requiredMessage(registerBuyerLabel.confirmPassword)),
  })
  .required()
  .refine((data) => data.confirmPassword === data.password, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const ChangePasswordSchema: z.ZodType<ChangePasswordPayloadTypes> = z
  .object({
    oldPassword: z
      .string()
      .min(1, requiredMessage(registerBuyerLabel.password))
      .regex(PASSWORD_REGEX, SchemaConstants.password.invalidPassword)
      .min(
        SchemaConstants.password.minCount,
        minCountMessage(
          registerBuyerLabel.password,
          SchemaConstants.password.minCount
        )
      )
      .max(
        SchemaConstants.password.maxCount,
        maxCountMessage(
          registerBuyerLabel.password,
          SchemaConstants.password.maxCount
        )
      ),
    password: z
      .string()
      .min(1, requiredMessage(registerBuyerLabel.password))
      .regex(PASSWORD_REGEX, SchemaConstants.password.invalidPassword)
      .min(
        SchemaConstants.password.minCount,
        minCountMessage(
          registerBuyerLabel.password,
          SchemaConstants.password.minCount
        )
      )
      .max(
        SchemaConstants.password.maxCount,
        maxCountMessage(
          registerBuyerLabel.password,
          SchemaConstants.password.maxCount
        )
      ),
    confirmPassword: z
      .string()
      .min(1, requiredMessage(registerBuyerLabel.confirmPassword)),
  })
  .required()
  .refine((data) => data.confirmPassword === data.password, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const ForgetPasswordSchema: z.ZodType<ForgetPasswordPayloadTypes> =
  z.object({
    email: z.string().min(1, requiredMessage(registerBuyerLabel.email)).email({
      message: invalidEmail,
    }),
  });

export const VerifyOTPSchema: z.ZodType<VerifyOTPPayloadTypes> = z.object({
  p1: z.string().min(1, "").max(1,""),
  p2: z.string().min(1, "").max(1,""),
  p3: z.string().min(1, "").max(1,""),
  p4: z.string().min(1, "").max(1,""),
});
