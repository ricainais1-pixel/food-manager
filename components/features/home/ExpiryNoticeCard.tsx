type Food = {
    id: number;
    name: string;
    expiry: string;
};

type Props = {
    foods: Food[];
    formatExpiryNotice: (
        expiry: string
    ) => { text: string; colorClass: string };
};

export default function ExpiryNoticeCard({foods,formatExpiryNotice}:Props){
    return(
        <section 
        className="m-10 relative w-full max-w-6xl mx-auto">
            
            <div
            className="absolute left-6 -top-4 bg-red-300 px-5 py-1 rounded-md shadow font-bold z-10">
                <h2 className="text-2xl font-bold">期限のお知らせ</h2>
            </div>
            <div
            className="border-2 rounded-xl p-6 pt-10 bg-white max-h-[300px] overflow-y-auto ">
                <ul className="space-y-2 text-lg">
                    {foods.length === 0 ? (
                        <li>期限が近い食材はありません。</li>
                    ) : (
                        foods.map((food) => {
                        const notice = formatExpiryNotice(
                        food.expiry
                        );

                        return (
                            <li key={food.id}>
                                {food.name} が{" "}
                                <span className={notice.colorClass}>
                                {notice.text}
                                </span>
                            </li>
                            );
                        })
                    )}
                </ul>
            </div>
        </section>
    )
}