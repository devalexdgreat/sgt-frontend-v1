'use client'
import copyToClipboard from "@/utils/copyToClipboard";
import { TbCopy } from "react-icons/tb";

export default function ShareBtn({ id }) {

    const copyButtonHandler = () => {
        const textToCopy = `https://www.streetgottalent.com/contestant/${id}`;
        copyToClipboard(textToCopy);
    };

    return (
        <button onClick={copyButtonHandler} className=" bg-[#52CF50] text-white py-1 px-2 rounded-md hover:bg-[#52CF50]/90 duration-500 flex gap-2 items-center">Copy Link<TbCopy /></button>
    );
}