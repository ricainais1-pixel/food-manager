import { z } from "zod";
import { profileSchema } from "../schema/profileSchema";

export type ProfileForm = z.infer<typeof profileSchema>;