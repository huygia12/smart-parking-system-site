import { SchemaResponse } from "@/types/enum";
import z, { ZodString } from "zod";

const notBlankString = (validate: ZodString = z.string()) =>
  validate.trim().refine((value) => value !== "", {
    message: SchemaResponse.REQUIRED,
  });

// const inputFormPreprocess = (schema: z.ZodTypeAny) =>
//   z
//     .preprocess((value) => (value === undefined ? null : value), schema)
//     .nullable();

const customerSchema = z.object({
  username: notBlankString(),
});

const loginSchema = z.object({
  password: z.string().min(6, { message: SchemaResponse.PASSWORD_INVALID }),
  username: notBlankString(),
});

export type LoginFormProps = z.infer<typeof loginSchema>;

export type CustomerFormProps = z.infer<typeof customerSchema>;

export { customerSchema, loginSchema };
