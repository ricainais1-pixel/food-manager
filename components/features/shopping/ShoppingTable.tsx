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
        <table className="w-full border-2 border-gray-400 table-fixed mb-10">
            <thead className="border-b-2">
                <tr>
                    <th className="border-r px-4 py-2 w-24 sm:w-32 md:w-52">食材</th>
                    <th className="border-r px-4 py-2 w-24 sm:w-14 md:w-32">個数</th>
                    <th className="border-r px-4 py-2 w-24 sm:w-32 md:w-40">カテゴリ</th>
                    <th className="border-r px-4 py-2 w-24 sm:w-32 md:w-40"></th>
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
    );
};
