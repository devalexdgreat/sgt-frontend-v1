import DashComp from "@/app/components/admin/DashComp";
import useFetch from "@/utils/useFetch";

export default async function Dashboard() {

    const data = await useFetch(`contestants/current?pages=1&limit=20`);

    var contestants;
    if (data && Array.isArray(data.contestants)) {
        contestants = data.contestants;
    } else {
        contestants = [];
    }
    // const contestants = data.contestants;
    console.log('i am a contestants', contestants);


    const lData = await useFetch(`contestants/current?leaderboard='s'`);

    var lCon;
    if (lData && Array.isArray(lData.contestants)) {
        lCon = lData.contestants;
    } else {
        lCon = [];
    }
    // const contestants = data.contestants;
    console.log('i am a contestants', lCon);

    return (
        <div className="w-full bg-black text-black h-screen md:h-screen lg:h-screen flex md:justify-center md:items-start lg:items-center pt-5 md:pt-16 overflow-hidden">
            <DashComp data={contestants} lData={lCon} />
        </div>
    );
}