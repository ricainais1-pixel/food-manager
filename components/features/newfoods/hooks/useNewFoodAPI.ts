import { createClient } from "@/lib/supabase/client";
import { DBFood} from "./types/newfood";

const supabase = createClient();

export const deleteFoodFromDB = async (id: number) => {
    const { error } = await supabase.from("Foods").delete().eq("id", id);
    return error;
};

export const updateFoodInDB = async (id: number, field: string, value: string | number) => {
    const { error } = await supabase.from("Foods").update({ [field]: value }).eq("id", id);
    return error;
};

export const insertFoodsToDB = async (foods: DBFood[]): Promise<Error | null>  => {
    const { error } = await supabase.from("Foods").insert(foods);
    return error;
};