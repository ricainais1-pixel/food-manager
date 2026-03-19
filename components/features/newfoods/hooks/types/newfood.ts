export type NewFood = {
    id: number;
    name: string;       
    count: number;       
    expiry: string;      
    category: string;    
    created_at?: string; 
};

export type FixedRow = {
    id: number;     
    name: string;
    count: number;
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