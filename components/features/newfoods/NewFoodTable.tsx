"use client";

import { NewFood, FixedRow } from "./hooks/types/newfood";
import FoodRow from "./NewFoodRow";
import FixedFoodRow from "./FixedNewFoodRow";
import NewFoodRow from "./NewFoodRow";

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
            <div className="overflow-x-auto">
                <table className="mt-6 w-full border-2 border-gray-400 table-fixed mb-10">
                    <thead className="border-b-2">
                    <tr>
                        <th className="border-r px-2 py-1 text-xs sm:px-3 sm:py-1 sm:text-sm md:px-4 md:py-2 md:text-base w-32">食材名</th>
                        <th className="border-r px-2 py-1 text-xs sm:px-3 sm:py-1 sm:text-sm md:px-4 md:py-2 md:text-base w-14">個数</th>
                        <th className="border-r px-2 py-1 text-xs sm:px-3 sm:py-1 sm:text-sm md:px-4 md:py-2 md:text-base w-24">期限</th>
                        <th className="border-r px-2 py-1 text-xs sm:px-3 sm:py-1 sm:text-sm md:px-4 md:py-2 md:text-base w-20">カテゴリー</th>
                        <th className="px-2 py-1 text-xs sm:px-3 sm:py-1 sm:text-sm md:px-4 md:py-2 md:text-base w-28"></th>
                    </tr>
                </thead>

                <tbody>
                    {fixedRow.isVisible && (
                        <FixedFoodRow
                            fixedRow={fixedRow}
                            setFixedRow={setFixedRow}
                            registerFixedRow={handleRegisterAll}
                            deleteFixedRow={deleteFixedRow}
                        />
                    )}

                    {foods
                    .filter(food => food.id < 0)
                    .map((food: NewFood) => (
                        <NewFoodRow
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