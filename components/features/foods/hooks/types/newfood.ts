export type Food = {
    id: number;
    name: string;
    count: number | null;
    expiry: string | null;
    category: string | null;
};

export type FixedRow = {
    name: string;
    count: string;
    expiry: string;
    category: string;
    isVisible: boolean;
};