export type Food = {
    id: number;
    name: string;
    count:  number;
    expiry: string;
    category: string;
    created_at?: string;
};

export type FoodRowEditProps = {
    food: Food;
    handleFieldChange: (field: keyof Food, value: string | number) => void;
    handleSave: (food: Food) => void;
    handleBack: () => void;
};

export type FoodRowViewProps = {
    food: Food;
    updateFoodCount: (food: Food, newCount: number) => void;
    handleEdit: (food: Food) => void;
    handleDelete: (id: number) => void;
    getRemainingDays: (expiry: string) => string; // ←忘れずに追加
};

