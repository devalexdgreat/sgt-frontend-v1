import { FiChevronLeft, FiChevronRight, FiSearch } from "react-icons/fi";
import { BsFilterLeft } from "react-icons/bs";
import Image from "next/image";
import ContestantImg from '@/public/conte.png';
import emptyIcon from '@/public/empty.png';
import useFetch from "@/utils/useFetch";
import SearchComponent from "./SearchComponent";
import Link from "next/link";

export default async function ContestantsSection() {
    const session = await useFetch(`seasons/current`);
    const data = await useFetch(`contestants/current?pages=1&limit=20`);

    var contestants;
    if (data && Array.isArray(data.contestants)) {
        contestants = data.contestants; 
    } else {
        contestants = null;
    }
    // const contestants = data.contestants;
    console.log('i am a contestants', contestants);

    return (
        <div className="w-full" id="contestants">
            <div className="w-11/12 mx-auto">
                <div className="w-full flex justify-between mt-8">
                    <div className="md:hidden w-full text-center flex items-center justify-center">
                        { session === null ? (
                            <span className="hidden">error</span>
                        ):(
                            <h1 className="w-9/12 mx-auto font-bold text-xl">Contestants for {session.currentSeason.title}</h1>
                        )}
                    </div>
                    <div className="hidden md:flex flex-col text-md w-4/12">
                        <div className="w-full">
                            <span className="text-xl font-bold">Contestants for</span>
                        </div>
                        { session === null ? (
                            <div className="hidden">error</div>
                        ):(
                            <div className="w-full flex justify-end">
                                <span className="text-xl font-bold">Street Got Talent {session.currentSeason.title}</span>
                            </div>
                        )}
                    </div>
                    <SearchComponent />
                </div>
                <>
                    {contestants === null ? (
                        <div className="w-full py-12 flex justify-center">
                            <div className="flex flex-col justify-center items-center text-center">
                                <Image src={emptyIcon} height={100} width={100} className="h-48 w-48" alt="" />
                                <h1>No Contestants at the moment😥</h1>
                            </div>
                        </div>
                    ):(
                        <div>
                            {contestants && (
                                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-3">
                                    {contestants.map((d) => (
                                        <div key={d._id} className="relative">
                                            {d.status === 'evicted' ? (
                                                <div className="absolute top-2 right-2 bg-red-500 text-white p-2">
                                                    <span className="font-medium text-center">{d.status.charAt(0).toUpperCase() + d.status.slice(1)}</span>
                                                </div>
                                            ):(
                                                <div className="absolute top-2 right-2 bg-green-500 text-white p-2">
                                                    <span className="font-medium text-center">{d.status.charAt(0).toUpperCase() + d.status.slice(1)}</span>
                                                </div>
                                            )}
                                            <Link href={`https://www.streetgottalent.com/contestant/${d._id}`} className="top-0 absolute w-full h-full"></Link>
                                            <div className="h-80 md:h-64">
                                                <Image src={d.imageUrl} className="h-full w-full object-cover object-top" alt="" width={1000} height={1000} />
                                            </div>
                                            <div className="flex flex-col text-center justify-center py-2">
                                                <span>Name: <span className="font-bold">{d.name}</span></span>
                                                <span>Perfomance Type: <span className="font-bold">{d.performanceType}</span></span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                            <div className="w-full flex justify-center py-4">
                                <div className="flex gap-8 items-center pb-2">
                                    <button><FiChevronLeft /></button>
                                    <button><FiChevronRight /></button>
                                </div>
                            </div>
                        </div>
                    )}
                </>
                
            </div>
        </div>
    );
}