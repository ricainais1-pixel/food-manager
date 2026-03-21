'use client'

import { Food } from './types/food'
import FoodRowView from './FoodRowView'
import FoodRowEdit from './FoodRowEdit'

type FoodHandlers = {
  handleEdit: (food: Food) => void
  handleDelete: (id: number) => Promise<void>
  handleSave: (food: Food) => void
  handleNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  updateFoodCount: (id: number, count: number) => void
  handleFieldChange: (field: keyof Food, value: string | number) => void
  handleBack: () => void
}

type Props = {
  foods: Food[]
  editingFood: Food | null
  selectedCategory: string
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>
  handlers: FoodHandlers
  getRemainingDays: (expiry: string | null) => string
  checkedFoods: number[]
  toggleCheck: (id: number) => void
}

export default function FoodsTable({
  foods,
  editingFood,
  selectedCategory,
  handlers,
  getRemainingDays,
  checkedFoods,
  toggleCheck,
}: Props) {
  const filteredFoods = foods.filter(
    (food) => selectedCategory === 'すべて' || food.category === selectedCategory
  )

  return (
    <div className="overflow-x-auto">
      {editingFood === null ? (
        <div className="overflow-x-auto w-full">
          <table className="table-fixed w-full border-2 border-gray-400 mb-10">
            <thead className="border-b-2">
              <tr>
                <th className="border-r px-2 py-1 text-xs sm:px-3 sm:py-1 sm:text-sm md:px-4 md:py-2 md:text-base w-8"></th>
                <th className="border-r px-2 py-1 text-xs sm:px-3 sm:py-1 sm:text-sm md:px-4 md:py-2 md:text-base w-32">
                  食材名
                </th>
                <th className="border-r px-2 py-1 text-xs sm:px-3 sm:py-1 sm:text-sm md:px-4 md:py-2 md:text-base w-14">
                  個数
                </th>
                <th className="border-r px-2 py-1 text-xs sm:px-3 sm:py-1 sm:text-sm md:px-4 md:py-2 md:text-base w-24">
                  期限
                </th>
                <th className="border-r px-2 py-1 text-xs sm:px-3 sm:py-1 sm:text-sm md:px-4 md:py-2 md:text-base w-20">
                  カテゴリー
                </th>
                <th className="px-2 py-1 text-xs sm:px-3 sm:py-1 sm:text-sm md:px-4 md:py-2 md:text-base w-28"></th>
              </tr>
            </thead>
            <tbody>
              {filteredFoods.map((food) => (
                <FoodRowView
                  key={food.id}
                  food={food}
                  handlers={{
                    handleEdit: handlers.handleEdit,
                    handleDelete: handlers.handleDelete,
                    updateFoodCount: handlers.updateFoodCount,
                  }}
                  getRemainingDays={getRemainingDays}
                  checkedFoods={checkedFoods}
                  toggleCheck={toggleCheck}
                />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>
          <table className="mt-6 w-full border-2 border-gray-400 table-fixed mb-10">
            <thead className="border-b-2">
              <tr>
                <th className="border-r px-2 py-1 text-xs sm:px-3 sm:py-1 sm:text-sm md:px-4 md:py-2 md:text-base w-32">
                  食材名
                </th>
                <th className="border-r px-2 py-1 text-xs sm:px-3 sm:py-1 sm:text-sm md:px-4 md:py-2 md:text-base w-14">
                  個数
                </th>
                <th className="border-r px-2 py-1 text-xs sm:px-3 sm:py-1 sm:text-sm md:px-4 md:py-2 md:text-base w-24">
                  期限
                </th>
                <th className="border-r px-2 py-1 text-xs sm:px-3 sm:py-1 sm:text-sm md:px-4 md:py-2 md:text-base w-20">
                  カテゴリー
                </th>
                <th className="px-2 py-1 text-xs sm:px-3 sm:py-1 sm:text-sm md:px-4 md:py-2 md:text-base w-28"></th>
              </tr>
            </thead>
            <tbody>
              {editingFood && (
                <FoodRowEdit
                  food={editingFood}
                  handlers={{
                    handleSave: (food: Food) => handlers.handleSave(food),
                    handleNameChange: handlers.handleNameChange,
                    handleFieldChange: handlers.handleFieldChange,
                    handleBack: handlers.handleBack,
                  }}
                  getRemainingDays={getRemainingDays}
                  checkedFoods={checkedFoods}
                  toggleCheck={toggleCheck}
                />
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
