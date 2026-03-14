"use client";

import Link from "next/link";
import useShopping from "./hooks/useShopping";
import ShoppingTable from "./ShoppingTable";
import Button from "@/components/common/Button";

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
        
        <div className="flex justify-center mt-4">
            <Button 
            className="text-center rounded-md bg-red-200 px-8 py-3 w-32 text-lg hover:bg-red-400"
            onClick={handleAdd}
            >
                + 追加
            </Button>
            <Link href="./shopping/stock-from-shopping" >
                <Button 
                className="text-center rounded-md ml-20 bg-blue-200 px-8 py-3 text-lg whitespace-nowrap hover:bg-blue-400"
                >在庫へ追加
                </Button>
            </Link>
        </div>                    
    </div>

    );
};