import { useState } from "react";
import { NewFood,FixedRow} from "./types/newfood";

export default function useFoodState() {
    const [foods,setFoods] = useState <NewFood[]> ([
        { id: -1, name: "", count: 1, expiry: new Date().toISOString().split("T")[0], category: "冷蔵庫" },
        { id: -2, name: "", count: 1, expiry: new Date().toISOString().split("T")[0], category: "冷蔵庫" },
        { id: -3, name: "", count: 1, expiry: new Date().toISOString().split("T")[0], category: "冷蔵庫" },
    ]);

    const [fixedRow, setFixedRow] = useState<FixedRow>({
        id: -1,
        name: "",
        count: 1,
        expiry: new Date().toISOString().split("T")[0],
        category: "冷蔵庫",
        isVisible: true
    });

    const deleteFixedRow = () => {
        setFixedRow({ ...fixedRow, isVisible: false });
    };

    const handleAddFood = () => {
        setFoods([
            ...foods,
            {
            id: -Date.now(), 
            name: "",
            count: 1,
            expiry: new Date().toISOString().split("T")[0],
            category: "冷蔵庫"
            }
        ]);
    };


    const removeFoodLocally = (id: number) => 
        setFoods(foods.filter((food) => food.id !== id));


    return { 
        foods, 
        fixedRow, 
        setFixedRow, 
        deleteFixedRow, 
        handleAddFood, 
        removeFoodLocally, 
        setFoods };
}

