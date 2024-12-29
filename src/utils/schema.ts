import { SchemaResponse } from "@/types/enum";
import z, { ZodString } from "zod";

const notBlankString = (validate: ZodString = z.string()) =>
  validate.trim().refine((value) => value !== "", {
    message: SchemaResponse.REQUIRED,
  });

const customerSchema = z.object({
  username: notBlankString(),
  email: notBlankString(),
});

const cardSchema = z.object({
  cardCode: notBlankString(),
  name: notBlankString(),
});

const loginSchema = z.object({
  password: z.string().min(6, { message: SchemaResponse.PASSWORD_INVALID }),
  email: notBlankString(),
});

export type LoginFormProps = z.infer<typeof loginSchema>;

export type CustomerFormProps = z.infer<typeof customerSchema>;

export type CardFormProps = z.infer<typeof cardSchema>;

export { customerSchema, loginSchema, cardSchema };
