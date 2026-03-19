"use client";

import useFoodForm from "@/components/features/newfoods/hooks/useNewFoodForm";
import NewFoodTable from "@/components/features/newfoods/NewFoodTable";
import Button from "@/components/common/Button";


export default function NewFoodPage() {
    const {
        foods,
        fixedRow,
        setFixedRow,
        deleteFixedRow,
        handleAddFood,
        deleteFood,
        updateFood,
        handleRegisterAll
    } = useFoodForm();

        return(
        <div className="min-h-screen flex flex-col">
            <h2 className="text-2xl font-bold mb-10">📋食材登録</h2>
                <NewFoodTable
                    foods={foods}
                    fixedRow={fixedRow}
                    setFixedRow={setFixedRow}
                    deleteFixedRow={deleteFixedRow}
                    updateFood={updateFood}
                    deleteFood={deleteFood}
                    handleRegisterAll={handleRegisterAll}
                />


            <div className="flex flex-wrap justify-center mt-4 gap-4 sm:gap-6 md:gap-8">
                <Button
                    className="bg-lime-300 px-6 py-3 w-full sm:w-32 md:w-36 hover:bg-lime-500 max-w-xs"
                    onClick={handleAddFood}
                >
                    + 追加
                </Button>
                <Button
                    className="bg-blue-200 px-6 py-3 w-full sm:w-32 md:w-36 hover:bg-blue-400 max-w-xs"
                    onClick={handleRegisterAll}
                >
                    登録
                </Button>
            </div> 
        </div>           
    )
}