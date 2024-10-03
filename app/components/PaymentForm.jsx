'use client';

import { setCookies } from "@/actions";
import { useRouter } from "next/navigation";
import { useState } from "react";

const addCommasToNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export default function PaymentForm({ session, userData }) {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    
    const handlePayment = async (callback_url) => {
        const userDataString = JSON.stringify(userData);
        localStorage.setItem('userData', userDataString);
        setIsLoading(true);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/payments/generate_link
`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email: userData.email, amount: session.currentSeason.registrationFee, name: userData.name, callback_url, payment_for: 'registration' }),
            });

            if(response.ok) {
                setIsLoading(false);
                const data = await response.json();
                const authUrl = data.authorization_url;
                // const successMsg = data.message;
                router.push(authUrl);
            }

        } catch (error) {
            console.log('error during payment', error);
        }
    }

    return (
        <div className="w-full bg-white text-black rounded-md flex text-center mb-12">
            <div className="w-11/12 md:w-7/12 mx-auto flex flex-col gap-3 text-sm py-12">
                {session !== null && (
                    <h1 className="font-normal text-xl mb-4">Registration Fee: <span className="font-bold">{addCommasToNumber(session.currentSeason.registrationFee)} NGN</span></h1>
                )}
                
                <button onClick={(e) => handlePayment(`${process.env.NEXT_PUBLIC_REDIR_URL}`)} className="w-full bg-green-500 py-3 px-4 text-white rounded-md">
                    {isLoading ? (
                        <span>Processing...</span>
                    ):(
                        <span>Pay {addCommasToNumber(session.currentSeason.registrationFee)} NGN</span>
                    )}
                </button>
            </div>
        </div>
    );
}