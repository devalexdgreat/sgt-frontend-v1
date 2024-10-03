import Image from "next/image";
import Link from "next/link";
import { GoArrowLeft } from "react-icons/go";
import { FaInstagram, FaTiktok } from "react-icons/fa6";
import ShareBtn from "@/app/components/ShareBtn";
import useFetch from "@/utils/useFetch";
import Navbar from "@/app/components/Navbar";

export default async function Contestant({ params }) {
    const { id } = params;
    const {contestant} = await useFetch(`contestants/current/${id}`);


    return (
        <div className="w-full">
            <Navbar />
            <div className="w-full hero-bg text-black h-screen md:h-screen lg:h-screen flex justify-center items-center md:items-start lg:items-center pt-5 md:pt-16 overflow-hidden">
                <div className="md:mt-10 lg:mt-0 relative w-11/12 mx-auto text-white">
                    <div className="mb-4">
                        <Link href={'/'} className="">
                            <GoArrowLeft className="w-6 h-6 hover:text-[#52CF50] duration-500" />
                        </Link>
                    </div>
                    {contestant && (
                        <div>
                            <div className="flex flex-col md:flex-row gap-3 w-full">
                                <div className="h-52 md:h-52 w-full md:w-64">
                                    <Image src={contestant.imageUrl} alt="" className="h-full w-full object-cover object-top rounded-md" height={1000} width={1000} />
                                </div>
                                <div className="flex flex-col justify-center w-full">
                                    <h1 className="font-bold">{contestant.name}</h1>
                                    <span className="mb-3 text-sm text-gray-400">Performance: {contestant.performanceType}</span>
                                    <div className="flex gap-2 w-full">
                                        <Link href={`/voting/${contestant._id}`} className=" bg-[#52CF50] text-white py-1 px-2 rounded-md hover:bg-[#52CF50]/90 duration-500">Vote for me</Link>
                                        <ShareBtn id={id} />
                                    </div>
                                    {/* <div>
                                        <h1>Share Vote Link</h1>
                                        <div className="flex gap-2 w-full">
                                            <button className=" bg-[#52CF50] text-white py-1 px-2 rounded-md hover:bg-[#52CF50]/90 duration-500">Vote for me</button>
                                            <ShareBtn id={id} />
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                            <div className="mt-12 flex flex-col gap-3">
                                <div className="w-full bg-white/10 backdrop-blur-sm flex justify-between items-center px-3 py-3 rounded-sm relative hover:bg-[#52CF50]/70 duration-500">
                                    <Link href={contestant.socials.tiktok} className="top-0 absolute w-full h-full" passHref legacyBehavior>
                                        <a target="_blank" className="absolute top-0 w-full h-full">
                                        </a>
                                    </Link>
                                    <div className="flex items-center gap-2">
                                        <FaTiktok />
                                        <span>Tiktok Handle</span>
                                    </div>
                                    <div>
                                        <span className="text-sm text-gray-300">{(contestant.socials.tiktok).split('/').pop()}</span>
                                    </div>
                                </div>
                                <div className="w-full bg-white/10 backdrop-blur-sm flex justify-between items-center px-3 py-3 rounded-sm relative hover:bg-[#52CF50]/70 duration-500">
                                    <Link href={contestant.socials.instagram} className="top-0 absolute w-full h-full flex justify-start items-start" passHref legacyBehavior>
                                        <a target="_blank" className="absolute top-0 w-full h-full">
                                        </a>
                                    </Link>
                                    <div className="flex items-center gap-2">
                                        <FaInstagram />
                                        <span>Instagram Handle</span>
                                    </div>
                                    <div>
                                        <span className="text-sm text-gray-300">{(contestant.socials.instagram).split('/').pop()}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}