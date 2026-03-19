"use client";

import { Item } from "./types/types";
import ShoppingRow from "./ShoppingRow";
import DraftRow from "./DraftRow";

type Props = {
    items: Item[];
    draftItems: Item[];
    editingId: number | null;
    originalItem: Item | null;
    handleAdd: () => void;
    handleSave: (draft: Item) => void;
    handleDraftNameChange: (id: number, value: string) => void;
    handleDraftCountChange: (id: number, value: number) => void;
    handleDraftCategoryChange: (id: number, value: string) => void;
    handleDraftDelete: (id: number) => void;
    handleNameChange: (id: number, value: string) => void;
    handleCategoryChange: (id: number, value: string) => void;
    handleEditCountChange: (id: number, value: number) => void;
    handleUpdate: (item: Item) => void;
    handleDelete: (id: number) => void;
    handleCancel: () => void;
    setEditingId: React.Dispatch<React.SetStateAction<number | null>>;
    setOriginalItem: React.Dispatch<React.SetStateAction<Item | null>>;
};

export default function ShoppingTable(props: Props){
    const { items, draftItems } = props;

    return (
        <div className="overflow-x-auto">
            <table className="mt-6 w-full border-2 border-gray-400 table-fixed mb-10">
                <thead className="border-b-2">
                    <tr>
                        <th className="border-r px-2 py-1 text-xs sm:px-3 sm:py-1 sm:text-sm md:px-4 md:py-2 md:text-base w-32">食材名</th>
                        <th className="border-r px-2 py-1 text-xs sm:px-3 sm:py-1 sm:text-sm md:px-4 md:py-2 md:text-base w-14">個数</th>
                        <th className="border-r px-2 py-1 text-xs sm:px-3 sm:py-1 sm:text-sm md:px-4 md:py-2 md:text-base w-20">カテゴリー</th>
                        <th className="px-2 py-1 text-xs sm:px-3 sm:py-1 sm:text-sm md:px-4 md:py-2 md:text-base w-28"></th>
                    </tr>
                </thead>

                <tbody>
                    {items.map((item)=>(
                        <ShoppingRow key={item.id} item={item} {...props} />
                    ))}
                    
                    {draftItems.map((draft) => (
                        <DraftRow key={draft.id} draft={draft} {...props} />
                    ))}
                </tbody>
            </table>
            </div>
    );
};
