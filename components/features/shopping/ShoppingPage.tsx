"use client";

import Link from "next/link";
import useShopping from "./hooks/useShopping";
import ShoppingTable from "./ShoppingTable";

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
        handleDraftDelete,
        handleNameChange,
        handleEditCountChange,
        handleUpdate,
        handleDelete,
        handleCancel,
        setEditingId,
        setOriginalItem
    } = useShopping();

    return (
    <div>
        <h2 className="text-2xl font-bold mb-10">📝購入リスト</h2>
        <ShoppingTable
            items={items}
            draftItems={draftItems}
            editingId={editingId}
            originalItem={originalItem}
            handleAdd={handleAdd}
            handleSave={handleSave}
            handleDraftNameChange={handleDraftNameChange}
            handleDraftCountChange={handleDraftCountChange}
            handleDraftDelete={handleDraftDelete}
            handleNameChange={handleNameChange}
            handleEditCountChange={handleEditCountChange}
            handleUpdate={handleUpdate}
            handleDelete={handleDelete}
            handleCancel={handleCancel}
            setEditingId={setEditingId}
            setOriginalItem={setOriginalItem}
        />
    </div>

    );
};