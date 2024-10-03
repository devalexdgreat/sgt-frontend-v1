'use client'
import { FaChevronRight } from "react-icons/fa6";
import { FiPlus } from "react-icons/fi";
import AdminNav from "../AdminNav";
import { IoCloseOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import Image from "next/image";
import img from '@/public/conte.png';
import { SiAdobeaudition } from "react-icons/si";
import { MdErrorOutline, MdGroups } from "react-icons/md";
import { FaAward } from "react-icons/fa";
import { PiCalendarCheckFill } from "react-icons/pi";
import { BsCalendarCheckFill } from "react-icons/bs";
import { PiNetworkXLight } from "react-icons/pi";
import { useRouter } from "next/navigation";
import utilityFetch from "@/utils/utilityFetch";

const addCommasToNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

function formatDate(isoDate, format = 'YYYY-MM-DD') {
    const date = new Date(isoDate);

    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = date.getUTCFullYear();
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');

    switch (format) {
        case 'YYYY-MM-DD':
            return `${year}-${month}-${day}`;
        case 'MM/DD/YYYY':
            return `${month}/${day}/${year}`;
        case 'YYYY-MM-DD HH:MM:SS':
            return `${year}-${month}-${day} ${hours}:${minutes}:${seconds} UTC`;
        case 'MM/DD/YYYY HH:MM:SS':
            return `${month}/${day}/${year} ${hours}:${minutes}:${seconds} UTC`;
        default:
            return `${year}-${month}-${day}`; // Default to 'YYYY-MM-DD'
    }
}

export default function SeasonBox({ data, sznData }) {

    const [amount, setAmount] = useState('');
    const [title, setTitle] = useState('');
    const [deadline, setDeadline] = useState('');
    const [regFee, setRegFee] = useState('');
    const [sznWinner, setSznWinner] = useState(null);
    const [selSzn, setSelSzn] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [modal, setModal] = useState(false);
    const [panel, setPanel] = useState(false);
    const [isComplete, setIsComplete] = useState(true);
    const [isOn, setIsOn] = useState(sznData?.acceptance);
    const [isActive, setIsActive] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isAdvance, setIsAdvance] = useState(false);
    const [accessToken, setAccessToken] = useState('');

    const [activeStage, setActiveStage] = useState(sznData?.status); // Current active stage

    const stages = [
        { name: 'audition', label: 'Auditions', icon: SiAdobeaudition },
        { name: 'group', label: 'Groups', icon: MdGroups },
        { name: 'semi', label: 'Semi-Finals', icon: PiNetworkXLight },
        { name: 'final', label: 'Finals', icon: FaAward },
        { name: 'completed', label: 'Complete', icon: BsCalendarCheckFill }
    ];

    useEffect(() => {
        if (typeof window !== "undefined") {
            const token = localStorage.getItem('accessToken');
            setAccessToken(token);
        }
    }, []);

    const router = useRouter();

    const toggleModal = () => {
        setIsOpen(prevOpen => !prevOpen);
    };

    const togglePanel = () => {
        setPanel(prevOpen => !prevOpen);
    };

    const reToggle = () => {
        setModal(false);
    }

    const toggleResultModal = async (status, szn_id) => {
        if(status === 'completed') {
            setIsComplete(true);
            const data = await utilityFetch(`seasons/${szn_id}/winner`, accessToken);
            if(data !== null) {
                setSznWinner(data?.winner);
                setSelSzn(data?.season);
            } else {
                alert("There's No winner for this Season");
                return;
            }
            
        } else {
            setIsComplete(false);
        }
        setModal(prevOpen => !prevOpen);
        console.log('Season Data: ', sznData);
    };

    const toggleOn = () => {
        setIsOn(prevVal => !prevVal);
        toggleAppl();
    }

    const changeFee = async (e) => {
        e.preventDefault();
        if(!amount) {
            alert('Field is required!');
            return;
        }
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/seasons/${sznData._id}
            `, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify({ registrationFee: amount }),
            });

            if(response.ok) {
                const data = await response.json();
                const msg = data.message;
                alert(msg);
                togglePanel();
                router.refresh();
            } else {
                const data = await response.json();
                const errMsg = data.message;
                alert(errMsg);
            }
        } catch (error) {
            console.log('error: ', error);
            alert('An Error Occured!');
        }
    }

    const toggleAppl = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/seasons/${sznData._id}
            `, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify({ acceptance: !isOn }),
            });

            if(response.ok) {
                const data = await response.json();
                const msg = data.message;
                alert(msg);
                router.refresh();
            } else {
                const data = await response.json();
                const errMsg = data.message;
                alert(errMsg);
            }

        } catch (error) {
            console.log('error: ', error);
            alert('An Error Occured!');
        }
    }

    const handleAdvance = async () => {
        // Logic to advance to the next stage
        // Example: Change to the next stage manually
        const currentIndex = stages.findIndex(stage => stage.name === activeStage);
        if (currentIndex < stages.length - 1) {
            const nextStage = stages[currentIndex + 1].name;
            setIsAdvance(true);
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/seasons/advance
                    `, {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${accessToken}`,
                        }
                    });
                if(response.ok) {
                    setIsAdvance(false);
                    setActiveStage(nextStage);
                    router.refresh();
                } else {
                    setIsAdvance(false);
                    const data = await response.json();
                    const errMsg = data.message;
                    alert(errMsg);
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        if(!title || !deadline || !regFee) {
            alert('All fields are neccessary!');
            return;
        }
        setIsLoading(true); 
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/seasons/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify({ title: title, application_deadline: deadline, reg_fee: regFee }),
            });

            if(response.ok) {
                const data = await response.json();
                const msg = data.message;
                alert(msg);
                toggleModal();
                router.refresh();
            } else {
                const data = await response.json();
                const errMsg = data.message;
                alert(errMsg);
            }
        } catch (error) {
            console.log('error: ', error);
            alert('An Error Occured!');
        }
    }
    return (
        <div className="w-full bg-black text-black h-screen md:h-screen lg:h-screen flex md:justify-center md:items-start lg:items-center pt-5 md:pt-16 overflow-hidden relative">
            <div className="md:mt-10 lg:mt-0 relative w-full mx-auto text-white">
                <AdminNav />
                <div className="text-center hidden md:block">
                    <h1 className="font-medium text-lg">Seasons</h1>
                </div>
                <div className="w-full md:w-6/12 mx-auto md:bg-black/60 backdrop-blur-sm rounded-md overflow-y-scroll scrollbar-hide h-[90vh] md:h-96 mt-12 pb-6 border border-gray-800 relative">
                    <div className="text-center md:hidden mt-2">
                        <h1 className="font-medium text-lg">Seasons</h1>
                    </div>
                    <div className="flex flex-col px-2 pt-2">
                        {data.map((el) => (
                            <div key={el._id} className="flex justify-between border-b-2 border-gray-800 px-2 py-3 items-center">
                                <div className="flex flex-col gap-1">
                                    <span className="text-base">{el.title}</span>
                                </div>
                                <div>
                                    <span className="text-green-500 text-sm">{el.status}</span>
                                </div>
                                <div>
                                    <button onClick={(e) =>toggleResultModal(el.status, el._id)} className="bg-white/20 backdrop-blur-sm p-1">
                                        <FaChevronRight />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button onClick={toggleModal} className="animate-pulse bg-white rounded-full border-green-500 border-2 h-12 w-12 fixed md:bottom-2 bottom-10 left-[80%] md:left-[90%]">
                        <FiPlus className="text-green-500 h-full w-full" />
                    </button>
                </div>
            </div>
            {isOpen && (
                <div className="h-screen bg-black/10 backdrop-blur-sm w-full fixed top-0 right-0 flex justify-center items-center flex-col">
                    <span className="w-11/12 justify-center text-center flex gap-1 items-center mb-2">
                        <MdErrorOutline className="text-red-500 h-6 w-6" />
                        <span className="text-red-500 font-medium">Warning: Creating new season will automatically end previous seasons</span>
                    </span>
                    <div className="bg-white w-11/12 md:w-6/12 rounded-md relative">
                        <button onClick={toggleModal} className="absolute right-2 top-2 border border-black rounded-md"><IoCloseOutline className="h-5 w-5" /></button>
                        <form className="flex flex-col gap-5 w-11/12 md:w-10/12 mx-auto">
                            <div className="flex text-center justify-center items-center mt-3">
                                <h1 className="font-medium">Create new season</h1>
                            </div>
                            <div className="flex flex-col gap-1">
                                <label htmlFor="title">
                                    Season Title
                                </label>
                                <input onChange={(e) => setTitle(e.target.value)} type="text" className="border border-black rounded-sm text-sm ps-2" placeholder="Credibility" />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label htmlFor="deadline">
                                    Application Deadline
                                </label>
                                <input onChange={(e) => setDeadline(e.target.value)} type="date" className="border border-black rounded-sm text-sm ps-2"   placeholder="Deadline" />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label htmlFor="fee">
                                    Registration Fee
                                </label>
                                <input onChange={(e) => setRegFee(e.target.value)} type="number" className="border border-black rounded-sm text-sm ps-2" placeholder="20,000" />
                            </div>
                            <div className="w-full flex justify-center">
                                <button disabled={isLoading} onClick={handleCreate} type="submit" className="text-white bg-green-500 font-bold w-6/12 my-4 py-2 px-6 text-sm rounded-sm">{isLoading ? 'Creating...':'Create'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {modal && (
                <div className="w-full h-screen fixed top-0">
                    {isComplete === true ? (
                        <div className="h-screen bg-black/90 backdrop-blur-sm w-full fixed top-0 right-0 flex justify-center items-center">
                            <div className=" text-white w-11/12 md:w-6/12 rounded-md relative">
                                <button onClick={reToggle} className="absolute right-0 top-0 border border-white rounded-md"><IoCloseOutline className="h-5 w-5" /></button>
                                <div className="flex text-center flex-col items-center gap-2 ">
                                    <h1 className="text-lg">{selSzn.title}</h1>
                                    <span className="text-sm text-gray-400">Season was completed on {formatDate(selSzn.updatedAt, 'MM/DD/YYYY')}</span>
                                </div>
                                <div className="mt-3">
                                    <span className="text-gray-300">Winner of {selSzn.title}</span>
                                </div>
                                <div className="mt-3">
                                    <div className="border border-white rounded-md flex gap-2 p-2 items-center">
                                        <div className="h-24 w-24">
                                            <Image src={sznWinner.imageUrl} height={1000} width={1000} className="object-cover rounded-md h-full w-full" alt="" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="">{sznWinner.name}</span>
                                            <span className="text-gray-400 text-sm">Perfomance type: <span>{sznWinner.performanceType}</span></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ):(
                        <div className="mt-6 w-full h-screen absolute top-0 bg-black/80 backdrop-blur-sm flex justify-center items-center">
                            <div className="bg-black/30 border border-gray-300 text-white w-11/12 md:w-5/12 backdrop-blur-sm rounded-md relative">
                                <button onClick={reToggle} className="absolute top-1 right-1 border border-white rounded-md">
                                    <IoCloseOutline className="h-5 w-5 text-white" />
                                </button>
                                <div className="w-11/12 mx-auto py-5">
                                    <div className="w-full text-center">
                                        <h1>Monitor Season Progress</h1>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span>Registration Fee</span>
                                        <span>{addCommasToNumber(sznData?.registrationFee)}</span>
                                    </div>
                                    <div className="mt-2">
                                        <button onClick={togglePanel} className="border border-green-500 text-white py-1 px-2 text-sm">Change Registration Fee</button>
                                    </div>
                                    <div className="flex justify-between mt-2">
                                        <span>Registration</span>
                                        <button onClick={toggleOn} className="border rounded-3xl px-1 flex justify-between items-center">
                                            {isOn === true ? (
                                                <div className="flex gap-1">
                                                    <div className="duration-300 rounded-full bg-transparent p-2">
                                                    </div>
                                                    <div className="duration-300 rounded-full bg-green-500 p-2">
                                                    </div>
                                                </div>
                                            ):(
                                                <div className="flex gap-1">
                                                    <div className="duration-300 rounded-full bg-white p-2">
                                                    </div>
                                                    <div className="duration-300 rounded-full bg-transparent p-2">
                                                    </div>
                                                </div>
                                            )}
                                        </button>
                                    </div>
                                    <div className="w-full flex flex-col items-center my-4 gap-4">
                                        {stages.map((stage, index) => {
                                            const Icon = stage.icon;
                                            const isActive = stage.name === activeStage;
                                            return (
                                                <div key={index} className="flex items-center gap-3">
                                                    {isActive && (
                                                        <div className={`p-2 rounded-full ${isActive ? 'bg-green-500' : 'bg-gray-400'}`}
                                                        ></div>
                                                    )}
                                                    <Icon className={`h-6 w-6 ${isActive ? 'text-green-500' : 'text-gray-400'}`} />
                                                    <div className="flex flex-col gap-0">
                                                        <span className={`${isActive ? 'text-green-500' : 'text-gray-400'} font-medium text-sm`}>
                                                            {stage.label}
                                                        </span>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                        <div className="flex items-center">
                                            <button disabled={isAdvance} onClick={handleAdvance} className="border border-green-500 text-white py-1 px-4 text-sm">
                                                {isAdvance ? 'Processing...':'Advance Stage'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {panel && (
                <div className="w-full h-screen fixed top-0 bg-black/60 backdrop-blur-sm text-white flex justify-center items-center">
                    <form onSubmit={changeFee} className="w-11/12 md:w-4/12 bg-white text-black flex flex-col justify-center items-center rounded-md gap-2 p-3 relative">
                        <button onClick={togglePanel} className="absolute top-1 right-1 border border-black rounded-md">
                            <IoCloseOutline className="h-5 w-5" />
                        </button>
                        <div className="w-full">
                            <h1 className="text-center text-lg font-medium">New Registration Fee</h1>
                        </div>
                        <input onChange={(e) => setAmount(e.target.value)} type="number" className="border border-gray-500 rounded-md py-1 my-4 w-full ps-2" placeholder="Amount" />
                        <button type="submit" className="bg-green-500 text-white w-6/12 py-1 rounded-md">Save</button>
                    </form>
                </div>
            )}
        </div>
    );
}