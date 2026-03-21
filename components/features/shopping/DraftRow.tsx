'use client'

import Button from '@/components/common/Button'
import { Item } from './types/types'

type Props = {
  draft: Item
  handleDraftNameChange: (id: number, value: string) => void
  handleDraftCountChange: (id: number, value: number) => void
  handleDraftCategoryChange: (id: number, value: string) => void
  handleSave: (draft: Item) => void
  handleDraftDelete: (id: number) => void
}

export default function DraftRow({
  draft,
  handleDraftNameChange,
  handleDraftCountChange,
  handleDraftCategoryChange,
  handleSave,
  handleDraftDelete,
}: Props) {
  return (
    <tr>
      <td className="border-r px-2 py-1 text-xs sm:px-3 sm:py-1 sm:text-sm md:px-4 md:py-2 md:text-base">
        <input
          placeholder="食材名"
          value={draft.name}
          onChange={(e) => handleDraftNameChange(draft.id, e.target.value)}
          className="w-full border rounded px-1 py-1 text-xs sm:text-sm md:text-base"
        />
      </td>
      <td className="border-r px-2 py-1 text-center text-xs sm:text-sm md:text-base">
        <select
          className="w-full border rounded px-1 py-1 text-xs sm:text-sm md:text-base focus:outline-none"
          value={draft.count}
          onChange={(e) => handleDraftCountChange(draft.id, Number(e.target.value))}
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
        <select
          value={draft.category || ''}
          onChange={(e) => handleDraftCategoryChange(draft.id, e.target.value)}
          className="w-full border rounded px-1 py-1 text-xs sm:text-sm md:text-base"
        >
          <option value="冷蔵庫">冷蔵庫</option>
          <option value="冷凍庫">冷凍庫</option>
          <option value="野菜室">野菜室</option>
          <option value="パントリー">パントリー</option>
        </select>
      </td>
      <td className="px-2 py-2 text-center">
        <div className="flex flex-wrap justify-center mt-4 gap-4 sm:gap-6 md:gap-8">
          <Button
            className="bg-red-200 px-2 py-1 text-xs sm:text-sm md:text-base hover:bg-red-400"
            onClick={() => handleSave(draft)}
          >
            保存
          </Button>
          <Button
            className="bg-gray-300 px-2 py-1 text-xs sm:text-sm md:text-base hover:bg-gray-400"
            onClick={() => handleDraftDelete(draft.id)}
          >
            削除
          </Button>
        </div>
      </td>
    </tr>
  )
}
