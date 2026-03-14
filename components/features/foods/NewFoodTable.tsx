"use client";

import { Food, FixedRow } from "./hooks/types/newfood";
import FoodRow from "./FoodRow";
import FixedFoodRow from "./FixedFoodRow";

type Props = {
    foods: Food[];
    fixedRow: FixedRow;
    setFixedRow: React.Dispatch<React.SetStateAction<FixedRow>>;
    deleteFixedRow: () => void;
    updateFood: (id: number, field: string, value: string | number) => Promise<void>;
    deleteFood: (id: number) => Promise<void>;
    handleRegisterAll: () => void;
}

export default function NewFoodTable({
    foods,
    fixedRow,
    setFixedRow,
    deleteFixedRow,
    updateFood,
    deleteFood,
    handleRegisterAll
}: Props) {

    const showFixedRow = () => setFixedRow({ ...fixedRow, isVisible: true });

        return(
            <div>

                <table className="w-full border-2 border-gray-400 table-fixed mb-10">
                    <thead className="border-b-2">
                    <tr>
                        <th className="border-r px-4 py-2">食材</th>
                        <th className="border-r px-4 py-2">個数</th>
                        <th className="border-r px-4 py-2">期限</th>
                        <th className="border-r px-4 py-2">カテゴリー</th>
                        <th className="px-2 py-2 w-18"></th>
                    </tr>
                </thead>


                <tbody>
                    {/* 固定行 */}
                    {fixedRow.isVisible && fixedRow.name.trim() !== "" && (
                        <FixedFoodRow
                            fixedRow={fixedRow}
                            setFixedRow={setFixedRow}
                            registerFixedRow={handleRegisterAll}
                            deleteFixedRow={deleteFixedRow}
                        />
                    )}

                    {foods
                    .filter(food => food.id < 0) // まだ登録されていない行だけ
                    .map((food: Food) => (
                        <FoodRow
                            key={food.id}
                            food={food}
                            updateFood={updateFood}
                            deleteFood={deleteFood}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    )
}