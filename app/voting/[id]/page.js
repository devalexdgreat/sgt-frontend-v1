import Image from "next/image";
import Link from "next/link";
import { GoArrowLeft } from "react-icons/go";
import useFetch from "@/utils/useFetch";
import FoodOpt from "@/app/components/voting/FoodOpt";
import Navbar from "@/app/components/Navbar";

export default async function Voting({ params }) {

    const { id } = params

    const data = await useFetch(`/streetfoods`);
    console.log(data);

    var streetFoods;
    if (data && Array.isArray(data.streetFoods)) {
        streetFoods = data.streetFoods;
    } else {
        streetFoods = null;
    }

    const dataC = await useFetch(`contestants/current/${id}`);
    
    
    var contestant;
    if (typeof data === 'object' && dataC && !Array.isArray(dataC.contestant)) {
        contestant = dataC.contestant;
    } else {
        contestant = null;
    }
    console.log('I am a: ', contestant);
    return (
        <div className="w-full">
            <Navbar />
            <div className="w-full hero-bg text-black h-screen md:h-screen lg:h-screen flex justify-center items-start md:items-start lg:items-start pt-20 md:pt-20 lg:pt-28 overflow-hidden">

                <div className="md:mt-10 lg:mt-0 relative w-11/12 mx-auto text-white">
                    <div className="mb-4">
                        <Link href={'/'} className="">
                            <GoArrowLeft className="w-6 h-6 hover:text-[#52CF50] duration-500" />
                        </Link>
                    </div>
                    <div className="w-full md:w-11/12 lg:w-9/12 mx-auto">
                        {contestant && (
                            <div>
                                <h1 className="text-center text-lg md:text-xl">Buy {contestant.name} a street food</h1>
                                <div className="text-center flex justify-center mb-3 mt-3">
                                    <span className="text-sm w-full md:w-7/12 text-gray-200 font-light">Voting with street foods is fun and easy, Fans can vote with different foods, each with its own voting power, in just a few taps!</span>
                                </div>
                            </div>
                        )}
                        {streetFoods === null ? (
                            <div className="">No street food available.</div>
                        ):(
                            <FoodOpt id={id} streetFoods={streetFoods}/>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}