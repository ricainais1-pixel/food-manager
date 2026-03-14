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
            {/* <header 
            className="sticky top-0 bg-lime-300 border-b z-50">
                <div
                className="flex items-center justify-between px-8 py-5">
                    <h1 className="text-xl md:text-3xl font-bold ">食材ストック管理</h1>
                    <nav className="hidden md:block">
                        <ul 
                        className="flex gap-6 text-lg font-medium">
                            <li className="hover:text-lime-800 cursor-pointer">
                                <Link href="/home">ホーム</Link>
                            </li>
                            <li className="hover:text-lime-800 cursor-pointer">
                                <Link href="/foods">食材一覧</Link>
                            </li>
                            <li className="hover:text-lime-800 cursor-pointer">
                                <Link href="/newfoods">食材登録</Link>
                            </li>
                            <li className="hover:text-lime-800 cursor-pointer">
                                <Link href="/shopping">購入リスト</Link>
                            </li>
                            <li className="hover:text-lime-800 cursor-pointer">
                                <Link href="/users">ユーザー設定</Link>
                            </li>
                        </ul>
                    </nav>
                    <button className="md:hidden text-2xl font-bold">☰</button>
                </div>
            </header> */}

            <main className="max-w-[1400px] mx-auto mt-10 mb-10 px-6 flex-1">
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
                        >
                            在庫へ追加
                        </Button>
                    </Link>
                </div>                    
            </main>
            
            <footer className="bg-gray-100 border-t mt-10"> 
                <div className="max-w-[1200px] mx-auto py-4 text-center text-sm text-gray-500">© 2026 Food Stock App</div>
            </footer>
        </div>
    )
}