import { getToken } from "@/actions";
import SeasonBox from "@/app/components/admin/SeasonBox";
import AdminNav from "@/app/components/AdminNav";
import useAuthFetch from "@/utils/useAuthFetch";
import useFetch from "@/utils/useFetch";
import { FaChevronRight } from "react-icons/fa6";
import { FiPlus } from "react-icons/fi";
import { IoCloseOutline } from "react-icons/io5";

export default async function Seasons() {
    const accessToken = await getToken();

    const data = await useAuthFetch(`seasons`, accessToken);
    console.log('Season: ', data);

    const curData = data.filter(datum => datum.current === true);
    var curSeason;
    if (curData && Array.isArray(curData)) {
        curSeason = curData[0];
    } else {
        curSeason = {acceptance:false};
    }

    console.log('Season Data: ', curSeason);

    return (
        <div className="w-full">
            <SeasonBox data={data} sznData={curSeason} />
        </div>
    );
}