import Button from '@/components/common/Button'
import { FoodRowEditProps } from './types/food'

export default function FoodRowEdit({ food, handlers }: FoodRowEditProps) {
  return (
    <tr>
      <td className="border-r px-2 py-1 text-xs sm:px-3 sm:py-1 sm:text-sm md:px-4 md:py-2 md:text-base">
        <input
          type="text"
          value={food.name}
          onChange={(e) => handlers.handleFieldChange('name', e.target.value)}
          className="w-full border rounded px-1 py-1 text-xs sm:text-sm md:text-base"
        />
      </td>
      <td className="border-r px-2 py-1 text-center text-xs sm:text-sm md:text-base">
        <select
          value={food.count}
          onChange={(e) => handlers.handleFieldChange('count', Number(e.target.value))}
          className="w-full border rounded px-1 py-1 text-xs sm:text-sm md:text-base focus:outline-none"
        >
          <option value={0}>0</option>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </td>
      <td className="border-r px-2 py-1 text-center text-xs sm:text-sm md:text-base">
        <input
          type="date"
          value={food.expiry}
          onChange={(e) => handlers.handleFieldChange('expiry', e.target.value)}
          className="w-full border rounded px-1 py-1 text-xs sm:text-sm md:text-base"
        />
      </td>
      <td className="border-r px-2 py-1 text-center text-xs sm:text-sm md:text-base">
        <select
          value={food.category}
          onChange={(e) => handlers.handleFieldChange('category', e.target.value)}
          className="w-full border rounded px-1 py-1 text-xs sm:text-sm md:text-base focus:outline-none"
        >
          <option value="冷蔵庫">冷蔵庫</option>
          <option value="冷凍庫">冷凍庫</option>
          <option value="野菜室">野菜室</option>
          <option value="パントリー">パントリー</option>
        </select>
      </td>
      <td className="border-r px-2 py-1">
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4">
          <Button
            className="bg-green-200 px-2 py-1 text-xs sm:text-sm md:text-base hover:bg-green-400"
            onClick={() => handlers.handleSave(food)}
          >
            保存
          </Button>
          <Button
            onClick={handlers.handleBack}
            className="bg-gray-300 px-2 py-1 text-xs sm:text-sm md:text-base hover:bg-gray-400"
          >
            戻る
          </Button>
        </div>
      </td>
    </tr>
  )
}
