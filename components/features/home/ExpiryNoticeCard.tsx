type Food = {
    id: number;
    name: string;
    expiry: string;
};

export type ExpiryNotice = {
    food: Food;
    text: string;
    colorClass: string;
};

type Props = {
    expiredFoods: ExpiryNotice[];
    soonFoods: ExpiryNotice[];
};

export default function ExpiryNoticeCard({expiredFoods, soonFoods}:Props){
    return(
        <section 
        className="m-10 relative w-full max-w-6xl mx-auto">
            
            <div
            className="absolute left-6 -top-4 bg-red-300 px-5 py-1 rounded-md shadow font-bold z-10">
                <h2 className="text-2xl font-bold">お知らせ</h2>
            </div>
            <div
            className="flex flex-col md:flex-row gap-6 border-2 rounded-xl p-6 pt-10 bg-white max-h-[300px] overflow-y-auto">
                <div className="flex-1 border-r pr-4">
                    <h3 className="text-xl sm:text-lg xs:text-base font-bold text-red-500 mb-2">
                        ― 期限切れ (期限切れてから3日後に削除) ―
                    </h3>
                    <ul className="space-y-2 text-lg sm:text-base xs:text-sm">
                        {expiredFoods.length === 0 ? (
                            <li>期限切れはありません。</li>
                        ) : (
                            expiredFoods.map(item => (
                                <li key={item.food.id}>
                                    {item.food.name} <span className={item.colorClass}>{item.text}</span>
                                </li>
                            ))
                        )}
                    </ul>
                </div>

                <div className="flex-1 pl-4 mt-4 md:mt-0">
                    <h3 className="text-xl sm:text-lg xs:text-base font-bold text-orange-500 mb-2">
                        ― 期限が近い ―
                    </h3>
                    <ul className="space-y-2 text-lg sm:text-base xs:text-sm">
                        {soonFoods.length === 0 ? (
                            <li>期限が近い食材はありません</li>
                        ) : (
                            soonFoods.map(item => (
                                <li key={item.food.id}>
                                    {item.food.name} <span className={item.colorClass}>{item.text}</span>
                                </li>
                            ))
                        )}
                    </ul>
                </div>
            </div>
        </section>
    )
}