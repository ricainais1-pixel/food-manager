'use client'

import useShopping from './hooks/useShopping'
import ShoppingTable from './ShoppingTable'

export default function ShoppingPage() {
  const {
    items,
    draftItems,
    editingId,
    originalItem,
    handleAdd,
    handleSave,
    handleDraftNameChange,
    handleDraftCountChange,
    handleDraftCategoryChange,
    handleDraftDelete,
    handleNameChange,
    handleCategoryChange,
    handleEditCountChange,
    handleUpdate,
    handleDelete,
    handleCancel,
    setEditingId,
    setOriginalItem,
  } = useShopping()

  return (
    <div className="overflow-x-auto">
      <h2 className="text-2xl font-bold mb-10">📝購入リスト</h2>
      <ShoppingTable
        items={items}
        draftItems={draftItems}
        editingId={editingId}
        originalItem={originalItem}
        handleAdd={handleAdd}
        handleSave={handleSave}
        handleEditCountChange={handleEditCountChange}
        handleNameChange={handleNameChange}
        handleDraftNameChange={handleDraftNameChange}
        handleDraftCountChange={handleDraftCountChange}
        handleDraftCategoryChange={handleDraftCategoryChange}
        handleDraftDelete={handleDraftDelete}
        handleCategoryChange={handleCategoryChange}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
        handleCancel={handleCancel}
        setEditingId={setEditingId}
        setOriginalItem={setOriginalItem}
      />
    </div>
  )
}
