"use client";

import useStockFromShopping from "@/components/features/stock-from-shopping/hooks/useStockFromShopping";
import StockFromShoppingTable from "@/components/features/stock-from-shopping/StockFromShoppingTable";

export default function StockFromShopping() {
    const {
        items,
        selectedItems,
        handleSelectChange,
        handleExpiryChange,
        handleCategoryChange,
        addSelectedToStock,
        goBackToShoppingList,
    } = useStockFromShopping();


    return (
        <StockFromShoppingTable
            items={items}
            selectedItems={selectedItems}
            handleSelectChange={handleSelectChange}
            handleExpiryChange={handleExpiryChange}
            handleCategoryChange={handleCategoryChange}
            addSelectedToStock={addSelectedToStock}
            goBackToShoppingList={goBackToShoppingList}
        />
    );
}