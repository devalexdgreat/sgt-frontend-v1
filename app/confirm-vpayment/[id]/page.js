'use client';
import Image from "next/image";
import paymentIcon from '@/public/process.png'
import successIcon from '@/public/verified.png'
import failIcon from '@/public/failed.png'
import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";

export default function ConfirmVpayment({ params }) {
    const [userData, setUserData] = useState(null);
    const [isDone, setIsDone] = useState(false); //false
    const [isSuccess, setIsSuccess] = useState(false);
    const [msg, setMsg] = useState('');
    const { id } = params;

    const url = window.location.href;
    const reference = url.split('&transaction_id=')[1];

    useEffect(() => {
        const fetchData = async () => {
            const userDataString = localStorage.getItem('userData');
            if (userDataString) {
                try {
                    const data = JSON.parse(userDataString);
                    setUserData(data);
                } catch (error) {
                    console.error('Error parsing user data:', error);
                }
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const verifyPayment = async () => {
            if (!userData || !reference) {
                setIsDone(true);
                setIsSuccess(false);
                setMsg('Error! Payment failed...')
                return; // Exit if userData or reference is not available
            } 
            localStorage.removeItem('userData');

            // const formData = new FormData();
            // formData.append('contestant', userData.votedId);
            // formData.append('streetfood', userData.voteEl._id);

            try {
                setIsDone(false);
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/payments/verify`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ reference }),
                });

                if (response.ok) {
                    const data = await response.json();
                    const paymentFor = data.payment.paymentFor;
                    if (paymentFor === 'voting') {
                        try {
                            const registerResponse = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/contestants/vote`, {
                                method: 'POST',               
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    "contestant": userData.votedId,
                                    "streetfood": userData.voteEl._id
                                }),
                            });
                            if (registerResponse.ok) {
                                const registerData = await registerResponse.json();
                                const successMsg = registerData.message;
                                setIsDone(true);
                                setIsSuccess(true);
                                setMsg(successMsg);
                            }
                        } catch (error) {
                            console.error('Error during voting:', error);
                        }
                    }
                }
            } catch (error) {
                console.log('Error during verification', error);
            }
        };

        verifyPayment();
    }, [userData, reference]);

    return (
        <div className="w-full">
            <Navbar />
            <div className="w-full overflow-hidden hero-bg h-screen flex justify-center items-center">
                {isDone ? (
                    <>
                    {isSuccess ? (
                        <div className="bg-white backdrop-blur-sm rounded-md h-3/6 w-11/12 md:w-6/12 flex justify-center items-center flex-col">
                            <h1 className="mb-2 text-black font-bold text-xl">Payment Successful</h1>
                            <Image src={successIcon} className="w-44" height={100} width={100} alt="Payment Icon" />
                            <p className="text-center text-sm w-10/12">{msg}</p>
                            <Link href={'/'} className="mt-3 mb-2 bg-[#52CF50] text-white py-2 px-6 rounded-md flex justify-center items-center text-center"> 
                                <span>Go Back</span>
                            </Link>
                        </div>
                    ):(
                        <div className="bg-white backdrop-blur-sm rounded-md h-3/6 w-11/12 md:w-6/12 flex justify-center items-center flex-col">
                            <h1 className="mb-2 text-black font-bold text-xl">Payment Unsuccessful</h1>
                            <Image src={failIcon} className="w-44" height={100} width={100} alt="Payment Icon" />
                            <p className="text-red-500 text-center text-sm w-10/12">{msg}</p>
                            <Link href={'/'} className="mt-3 mb-2 bg-[#52CF50] text-white py-2 px-6 rounded-md flex justify-center items-center text-center">
                                <span>Go Back</span>
                            </Link>
                        </div>
                    )} 
                    </>
                    
                ):(
                    <div className="bg-white backdrop-blur-sm rounded-md h-3/6 w-11/12 md:w-6/12 flex justify-center items-center flex-col">
                        <div className="rounded-md absolute">
                            <div className="spinner">
                                {[...Array(10)].map((_, index) => (
                                    <div key={index}></div>
                                ))}
                            </div>
                        </div>
                        <h1 className="mb-2 text-black font-bold text-xl">Processing Payment...</h1>
                        <Image src={paymentIcon} className="w-44" height={100} width={100} alt="Payment Icon" />
                        <div className="w-full flex justify-center">
                            <p className="text-center text-sm w-10/12">Please wait while we are processing payment.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}