'use client'
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FiPlus } from "react-icons/fi";
import AdminNav from "../AdminNav";
import { FaInstagram, FaRegUser, FaTiktok } from "react-icons/fa6";
import { MdOutlineMail, MdOutlinePhoneEnabled } from "react-icons/md";
import { IoCloseOutline } from "react-icons/io5";

export default function User({ data }) {

    const [isLoading, setIsLoading] = useState(false);
    const [formLoad, setFormLoad] = useState(false);
    const [modal, setModal] = useState(false);
    const router = useRouter();

    // form data for inputs
    const [name, setName] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [ig, setIg] = useState('');
    const [tik, setTik] = useState('');
    const [email, setEmail] = useState('');
    const [perf, setPerf] = useState('');
    const [img, setImg] = useState(null);
    const [accessToken, setAccessToken] = useState('');

    const hiddenFileInput = useRef(null);
    const [fileName, setFileName] = useState(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const token = localStorage.getItem('accessToken');
            setAccessToken(token);
        }
    }, []);

    const handleClick = async (user_id, token) => {
        const isConfirmed = confirm('Are you sure you want to eliminate this contestant?');
        if(!isConfirmed) {
            return;
        }
        setIsLoading(true);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/Contestants/${user_id}/eliminate
                `, {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${token}`
                        },
                        cache: "no-store"
                    });
        
                    if(response.ok) {
                        setIsLoading(false);
                        const data = await response.json();
                        const message = data.message;
                        alert(message);
                        router.refresh();
                    } else {
                        setIsLoading(false);
                        const data = await response.json();
                        const errMsg = data.message;
                        alert(errMsg);
                    }
        } catch (error) {
            setIsLoading(false);
            const errMsg = error.message;
            alert(errMsg);
            console.log('error during elimination', error);
        }
    }

    const toggleModal = () => {
        setModal(prevOpt => !prevOpt);
    }

    const handleSelect = (e) => {
        e.preventDefault();
        hiddenFileInput.current?.click();
    };
    
    const handleChange = (e) => {
        const fileUploaded = e.target.files[0];
        if (fileUploaded) {
            setImg(fileUploaded);
            const fileName = fileUploaded.name;
            setFileName(fileName);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!ig || !tik) {
            setIg('nil');
            setTik('nil');
        }

        if(!name || !phoneNo || !email || !perf || !img ) {
            alert('All fields are neccessary!');
            return;
        }
        setFormLoad(true);
        const formData = new FormData();
        formData.append('name', name);
        formData.append('phone', phoneNo);
        formData.append('instagram', ig);
        formData.append('tiktok', tik);
        formData.append('email', email);
        formData.append('performance_type', perf);
        formData.append('profile', img);
        console.log(formData);

        try {
            const registerResponse = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/contestants/register`, {
                method: 'POST',
                body: formData,
            });

            if (registerResponse.ok) {
                const registerData = await registerResponse.json();
                const successMsg = registerData.message;
                setFormLoad(false);
                alert(successMsg);
                toggleModal();
                router.refresh();
            } else {
                const registerData = await registerResponse.json();
                const successMsg = registerData.message;
                setFormLoad(false);
                alert(successMsg);
            }
        } catch (error) {
            console.error('Error during registration:', error);
        }
    }

    return (
        <div className="md:mt-10 lg:mt-0 relative w-full mx-auto text-white">
            <AdminNav />
            <div className="text-center hidden md:block">
                <h1 className="font-medium text-lg">Manage Contestants</h1>
            </div>
            <div className="w-full md:w-6/12 mx-auto md:bg-black/60 backdrop-blur-sm rounded-md overflow-y-scroll scrollbar-hide h-[90vh] md:h-96 mt-12 pb-6 border border-gray-800 relative">
                <div className="text-center md:hidden mt-2 mb-2">
                    <h1 className="font-medium text-lg">Manage Contestants</h1>
                </div>
                <>
                    {data.length < 1 ? (
                        <div className="h-full flex justify-center items-center">
                            <span className="w-full text-center">No Contestant at the moment😥</span>
                        </div>
                    ):(
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 px-2 pt-2">
                            {data.map((user) => (
                                <div key={user._id} className="flex flex-col border rounded-md border-green-500">
                                    <div className="h-36 md:h-36 w-full rounded-t-md">
                                        <Image height={1000} width={1000} src={user.imageUrl} className="object-cover object-center h-full w-full rounded-t-md" alt="" />
                                    </div>
                                    <div className="flex flex-col items-center bg-white md:bg-black b border-green-500 rounded-b-md text-black md:text-white">
                                        <span className="mt-2">{user.name}</span>
                                        <span className="text-sm md:text-gray-300">Performance: <span>{user.performanceType}</span></span>
                                        <button onClick={(e) => handleClick(user._id, accessToken)} disabled={isLoading} className="bg-red-500 text-white py-1 px-6 rounded-md mt-4 mb-2 text-sm">Eliminate</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </>
                <button onClick={toggleModal} className="animate-pulse bg-white rounded-full border-green-500 border-2 h-12 w-12 sticky md:bottom-2 bottom-20 left-[80%] md:left-[90%]">
                    <FiPlus className="text-green-500 h-full w-full" />
                </button>
            </div>
            {modal && (
                <div className="bg-black/60 backdrop-blur-sm h-screen w-full flex justify-center items-center fixed top-0 overflow-y-scroll scrollbar-hide">
                    <div className="mt-12 md:mt-0 bg-white w-11/12 md:w-5/12 text-black rounded-md relative">
                        <button onClick={toggleModal} className="absolute right-2 top-2 border border-black rounded-md"><IoCloseOutline className="h-5 w-5" /></button>
                        <form className="w-full">
                            <div className="w-full text-center py-5">
                                <h1 className="font-bold">Contestants Registration</h1>
                            </div>
                            <div className="w-11/12 md:w-11/12 mx-auto flex flex-col gap-3 text-sm">
                                <div className="flex flex-col md:flex-row gap-5 w-full">
                                    <div className="flex flex-col gap-2 w-full md:w-6/12">
                                        <label className="font-semibold">Name</label>
                                        <div className="border border-black flex justify-between items-center px-1">
                                            <input required onChange={(e) => setName(e.target.value)} type="text" placeholder="input name" className="py-2 md:py-0.5 w-full outline-none ps-1" />
                                            <FaRegUser />
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2 w-full md:w-6/12">
                                        <label className="font-semibold">Phone Number</label>
                                        <div className="border border-black flex justify-between items-center px-1">
                                            <input required onChange={(e) => setPhoneNo(e.target.value)} type="number" placeholder="input phone number" className="py-2 md:py-0.5 w-full outline-none ps-1" />
                                            <MdOutlinePhoneEnabled />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col md:flex-row gap-5 w-full">
                                    <div className="flex flex-col gap-2 w-full md:w-6/12">
                                        <label className="font-semibold">Instagram</label>
                                        <div className="border border-black flex justify-between items-center px-1">
                                            <input required onChange={(e) => setIg(e.target.value)} type="text" placeholder="input instagram" className="py-2 md:py-0.5 w-full outline-none ps-1" />
                                            <FaInstagram />
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2 w-full md:w-6/12">
                                        <label className="font-semibold">Tiktok</label>
                                        <div className="border border-black flex justify-between items-center px-1">
                                            <input required onChange={(e) => setTik(e.target.value)} type="text" placeholder="input tiktok" className="py-2 md:py-0.5 w-full outline-none ps-1" />
                                            <FaTiktok />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col md:flex-row gap-5 w-full">
                                    <div className="flex flex-col gap-2 w-full md:w-6/12">
                                        <label className="font-semibold">Email Address</label>
                                        <div className="border border-black flex justify-between items-center px-1">
                                            <input required onChange={(e) => setEmail(e.target.value)} type="email" placeholder="input email address" className="py-2 md:py-0.5 w-full outline-none ps-1" />
                                            <MdOutlineMail />
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2 w-full md:w-6/12">
                                        <label className="font-semibold">Performance Type</label>
                                        <div className="border border-black flex justify-between items-center px-1">
                                            <input required onChange={(e) => setPerf(e.target.value)} type="text" placeholder="e.g dance, sing..." className="py-2 md:py-0.5 w-full outline-none ps-1" />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <input required ref={hiddenFileInput} type="file" name="img" onChange={handleChange} className="hidden py-2 md:py-0.5 w-full outline-none ps-1" accept="image/*" />
                                    <button
                                        onClick={handleSelect}
                                        className="border border-black px-1 py-1 mt-1"
                                    >
                                        {fileName ? (
                                            <span>{fileName}</span>
                                        ) : (
                                            <span>Upload Image of yourself</span>
                                        )}
                                    </button>
                                </div>
                                <div className="mb-5 mt-3">
                                    <button disabled={formLoad} type="submit" onClick={handleSubmit} className="bg-[#52CF50] text-white w-full py-2 px-6 rounded-md">{formLoad ? 'Processing...':'Continue'}</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}