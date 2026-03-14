export type Food = {
    id: number;
    name: string;        // 食材名
    count: number;       // 個数
    expiry: string;      // 期限（yyyy-mm-dd）
    category: string;    // カテゴリー（冷蔵庫、冷凍庫など）
    created_at?: string; // 登録日時（任意）
};

// 固定行データの型（新規追加や一時行などで使用）
export type FixedRow = {
    name: string;
    count: string;
    expiry: string;
    category: string;
    isVisible: boolean; // 表示中かどうか
};