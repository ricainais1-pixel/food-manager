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
    handlers: {
        handleSave: (food: Food) => void;
        handleNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
        handleFieldChange: (field: keyof Food, value: string | number) => void;
        handleBack: () => void;
    };
};

export type FoodRowViewProps = {
    food: Food;
    handlers: {
        handleEdit: (food: Food) => void;
        handleDelete: (food: Food) => void;
        updateFoodCount: (food: Food, newCount: number) => void;
    };
    getRemainingDays: (expiry: string) => string;
};

