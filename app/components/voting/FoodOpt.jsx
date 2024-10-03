'use client'
import Image from "next/image";
import { useState } from "react";
import PayQueryForm from "./PayQueryForm";
import VotePay from "./VotePay";

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function FoodOpt({ id, streetFoods }) {

    const [isModal, setIsModal] = useState(false);
    const [page, setPage] = useState(0);
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        voteEL: null,
        votedId: id,
    });

    const toggleModal = (id) => {
        const selectedFood = streetFoods.find(food => food._id === id);
        setUserData({ ...userData, voteEl: selectedFood });
        setIsModal(prevModal => !prevModal);
    }

    const closeModal = () => {
        setIsModal(prevModal => !prevModal);
    }

    const PageDisplay = () => {
        if(page === 0) {
            return <PayQueryForm setUserData={setUserData} userData={userData} handleNext={handleNext} handlePrev={closeModal} />
        } else if(page === 1) {
            return <VotePay handlePrev={handlePrev} userData={userData} />
        }
    }

    const handleNext = () => {
        if(!userData.name) {
            userData.name = 'nil';
        }

        if( !userData.name || !userData.email ) {
            alert('All fields are neccessary!');
            return;
        }

        setPage((currPage) => currPage + 1);
        console.log(userData);
    }

    const handlePrev = () => {
        setPage((currPage) => currPage - 1);
    }

    return (
        <div className="flex flex-col gap-2 mt-6 h-[430px] md:h-[520px] lg:h-[350px] overflow-y-scroll pb-1 scrollbar-hide">
            {streetFoods.map((food)=> (
                <div onClick={()=> toggleModal(food._id)} key={food._id} className="flex justify-between items-center rounded-md bg-white/5 ps-2 pe-3 py-2 hover:cursor-pointer" id={food._id}>
                    <div className="flex items-center gap-3">
                        <div className="w-16 h-12 md:w-24 md:h-16 rounded-md">
                            <Image src={food.imageUrl} alt="" height={1000} width={1000} className="h-full w-full object-cover rounded-sm" />
                        </div>
                        <span>{capitalizeFirstLetter(food.name)}</span>
                    </div>
                    <span className="text-green-500 font-bold text-sm">₦{food.price}<span className="text-gray-100 font-medium text-sm"> (+{food.votePower} Votes)</span></span>
                </div>
            ))}
            {isModal && (
                <div className="fixed top-0 left-0 w-full h-screen bg-black/10 backdrop-blur-sm flex justify-center items-center">

                    {PageDisplay()}
                </div>
            )}
        </div>
        
    );
}