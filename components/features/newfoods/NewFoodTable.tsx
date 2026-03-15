"use client";

import { NewFood, FixedRow } from "./hooks/types/newfood";
import FoodRow from "./NewFoodRow";
import FixedFoodRow from "./FixedNewFoodRow";

type Props = {
    foods: NewFood[];
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

        return(
            <div>

                <table className="w-full border-2 border-gray-400 table-fixed mb-10">
                    <thead className="border-b-2">
                    <tr>
                        <th className="border-r px-4 py-2 w-24 sm:w-32 md:w-52">食材名</th>
                        <th className="border-r px-4 py-2 w-24 sm:w-14 md:w-32">個数</th>
                        <th className="border-r px-4 py-2 w-24 sm:w-32 md:w-40">期限</th>
                        <th className="border-r px-4 py-2 w-24 sm:w-20 md:w-32">カテゴリー</th>
                        <th className="border-r px-4 py-2 w-24 sm:w-32 md:w-28"></th>
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
                    .map((food: NewFood) => (
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