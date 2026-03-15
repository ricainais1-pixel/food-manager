export type NewFood = {
    id: number;
    name: string;       
    count: number;       
    expiry: string;      
    category: string;    
    created_at?: string; 
};

// 固定行データの型（新規追加や一時行などで使用）
export type FixedRow = {
    id: number;     
    name: string;
    count: string;
    expiry: string;
    category: string;
    isVisible: boolean; 
};

export type DBFood = {
    name: string;
    count: number;
    expiry: string;
    category: string;
};