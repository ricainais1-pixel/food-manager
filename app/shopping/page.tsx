"use client";

import Link from "next/link";
import useShopping from "@/components/features/shopping/hooks/useShopping";
import ShoppingTable from "@/components/features/shopping/ShoppingTable";
import Button from "@/components/common/Button";


export default function Shopping () {
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
        setOriginalItem,
    } = useShopping();


    return(
        <div className="min-h-screen flex flex-col">
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

                <div className="flex justify-center space-x-14 mt-4 gap-4 sm:gap-6 md:gap-8">
                    <Button 
                        className=" bg-lime-300 px-8 py-3 w-32  hover:bg-lime-500"
                        onClick={handleAdd}
                    >
                        + 追加
                    </Button>
                    <Link href="./shopping/stock-from-shopping" >
                        <Button 
                            className=" ml-20 bg-blue-200 px-8 py-3 whitespace-nowrap hover:bg-blue-400"
                        >
                            在庫へ追加
                        </Button>
                    </Link>
                </div>                    
        </div>
    )
}