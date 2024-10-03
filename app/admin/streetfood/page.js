import StreetFoodBox from "@/app/components/admin/StreetFoodBox";
import useFetch from "@/utils/useFetch";

export default async function StreetFood() {

    const data = await useFetch(`/streetfoods`);
    var streetFoods;
    if (data && Array.isArray(data.streetFoods)) {
        streetFoods = data.streetFoods;
    } else {
        streetFoods = [];
    }

    return (
        <div className="w-full">
            <StreetFoodBox data={streetFoods} />
        </div>
    );
}