import User from "@/app/components/admin/User";
import useFetch from "@/utils/useFetch";

export default async function Contestants() {

    const data = await useFetch(`contestants/current?pages=1&limit=20`);

    var contestants;
    if (data && Array.isArray(data.contestants)) {
        const filteredContestants = data.contestants.filter(contestant => 
            contestant.status !== 'evicted' && contestant.status !== 'eliminated'
          );
        contestants = filteredContestants;
    } else {
        contestants = [];
    }
    // const contestants = data.contestants;
    console.log('i am a contestants', contestants);

    return (
        <div className="w-full bg-black text-black h-screen md:h-screen lg:h-screen flex md:justify-center md:items-start lg:items-center pt-5 md:pt-16 overflow-hidden">
            <User data={contestants} />
        </div>
    );
}