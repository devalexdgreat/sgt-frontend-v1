'use client'
import { IoCloseOutline } from "react-icons/io5";
import AdminNav from "../AdminNav";
import { FiPlus } from "react-icons/fi";
import Image from "next/image";
import conteImg from '@/public/conte.png';
import { useEffect, useRef, useState } from "react";
import { CiImageOn } from "react-icons/ci";
import { useRouter } from "next/navigation";
import { RiDeleteBin6Line } from "react-icons/ri";

const addCommasToNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export default function StreetFoodBox({ data }) {

    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [photo, setPhoto] = useState(null);
    const [foodName, setFoodName] = useState('');
    const [foodAmount, setFoodAmount] = useState('');
    const [votePower, setVotePower] = useState('');
    const [accessToken, setAccessToken] = useState('');
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== "undefined") {
            const token = localStorage.getItem('accessToken');
            setAccessToken(token);
        }
    }, []);

    const toggleModal = () => {
        setIsOpen(prevOpen => !prevOpen);
    }

    // accept image
    const hiddenFileInput = useRef(null);
    const [fileName, setFileName] = useState(null);

    const handleClick = (e) => {
        e.preventDefault();
        hiddenFileInput.current?.click();
    };
    
    const handleChange = (e) => {
        const fileUploaded = e.target.files[0];
        if (fileUploaded) {

            setPhoto(fileUploaded);
            const fileName = fileUploaded.name;
            setFileName(fileName);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!foodName || !foodAmount || !photo || !votePower) {
            alert('All fields are neccessary!');
            return;
        }
        setIsLoading(true);
        console.log(accessToken);
        
        const formData = new FormData();
        formData.append('name', foodName);
        formData.append('price', foodAmount);
        formData.append('vote_power', votePower);
        formData.append('image', photo);
        console.log(formData);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/streetfoods`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                },
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                const successMsg = data.message;
                setIsLoading(false);
                alert(successMsg);
                toggleModal();
                router.refresh();
            } else {
                const data = await response.json();
                const successMsg = data.message;
                setIsLoading(false);
                alert(successMsg);
            }
        } catch (error) {
            console.log('Error: ', error);
        }
    }

    const deleteFood = async (foodId) => {
        setIsDeleting(true);
        const isConfirmed = confirm('Are you sure you want to delete?');
        if(!isConfirmed) {
            return;
        }
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/streetfoods/${foodId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                },
                cache: "no-store"
            });

            if(response.ok) {
                setIsDeleting(false);
                const data = await response.json();
                const message = data.message;
                alert(message);
                router.refresh();
            } else {
                setIsDeleting(false);
                const data = await response.json();
                const errMsg = data.message;
                alert(errMsg);
            }
        } catch (error) {
            console.log('Error: ', error);
        }
    }

    return (
        <div className="w-full bg-black text-black h-screen md:h-screen lg:h-screen flex md:justify-center md:items-start lg:items-center pt-5 md:pt-16 overflow-hidden relative">
            <div className="md:mt-10 lg:mt-0 relative w-full mx-auto text-white">
                <AdminNav />
                <div className="text-center hidden md:block">
                    <h1 className="font-medium text-lg">Available Street Food</h1>
                </div>
                <div className="w-full md:w-6/12 mx-auto md:bg-black/60 backdrop-blur-sm rounded-md overflow-y-scroll scrollbar-hide h-[90vh] md:h-96 mt-12 pb-6 border border-gray-800 relative">
                    <div className="text-center md:hidden mt-2">
                        <h1 className="font-medium text-lg">Available Street Food</h1>
                    </div>
                    {data.length < 1 ? (
                        <div className="flex justify-center text-center pt-12">
                            <h1>No food available at the moment😥</h1>
                        </div>
                    ):(
                        <div className="flex flex-col px-2 pt-2">
                            {data.map((food) => (
                                <div key={food._id} className="flex justify-between border-b border-gray-800 p-2 items-center">
                                    <div className="flex gap-2 items-center">
                                        <div className="h-12 w-24">
                                            <Image src={food.imageUrl} height={1000} width={1000} className="object-cover h-full w-full" alt="" />
                                        </div>
                                        <span>{food.name}</span>
                                    </div>
                                    <div className="flex gap-4 items-center justify-center">
                                        <span className="text-green-500 font-bold">₦{addCommasToNumber(food.price)} <span className="text-gray-300 font-light">(+{food.votePower} Votes)</span></span>
                                        <button className="bg-red-500 text-white p-1 rounded-sm" onClick={(e) => deleteFood(food._id)}>
                                        <RiDeleteBin6Line /></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    <button onClick={toggleModal} className="animate-pulse bg-white rounded-full border-green-500 border-2 h-12 w-12 fixed md:bottom-2 bottom-10 left-[80%] md:left-[90%]">
                        <FiPlus className="text-green-500 h-full w-full" />
                    </button>
                </div>
            </div>
            {isOpen && (
                <div className="h-screen bg-black/10 backdrop-blur-sm w-full fixed top-0 right-0 flex justify-center items-center">
                    <div className="bg-white w-11/12 md:w-4/12 rounded-md relative">
                        <button onClick={toggleModal} className="absolute right-2 top-2 border border-black rounded-md"><IoCloseOutline className="h-5 w-5" /></button>
                        <form className="flex flex-col gap-5 w-11/12 md:w-11/12 mx-auto">
                            <div className="flex text-center justify-center items-center mt-3">
                                <h1 className="font-medium">Add Street Food</h1>
                            </div>
                            <input onChange={(e) =>setFoodName(e.target.value)} type="text" className="border border-black py-0.5 ps-1 rounded-sm placeholder-black" placeholder="Name" />

                            <input required ref={hiddenFileInput} type="file" name="img" onChange={handleChange} className="hidden py-2 md:py-0.5 w-full outline-none ps-1" accept="image/*" />
                            <button onClick={handleClick} className="flex justify-between items-center border border-black text-black py-0.5 ps-1 pe-1 text-left rounded-sm">
                                {fileName ? (
                                    <span>{fileName}</span>
                                ) : (
                                    <span>Photo</span>
                                )}
                                <CiImageOn className="h-5 w-5" />
                            </button>
                            <input onChange={(e) =>setVotePower(e.target.value)} type="text" className="border border-black py-0.5 ps-1 rounded-sm placeholder-black" placeholder="Vote Power" />
                            <input onChange={(e) =>setFoodAmount(e.target.value)} type="text" className="border border-black py-0.5 ps-1 rounded-sm placeholder-black" placeholder="Amount" />
                            <div className="w-full flex justify-center">
                                <button disabled={isLoading} onClick={handleSubmit} type="submit" className="text-white bg-green-500 font-bold w-6/12 my-4 py-2 px-6 text-sm rounded-sm">{isLoading ? 'Processing...':'Create'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}