'use client'
import { useState } from "react";
import RegForm from "./RegForm";
import PayForm from "./PayForm";

export default function FormComponent() {

    const [openModal, setOpenmodal] = useState(false);

    const PageDisplay = () => {
        if(page === 0) {
            return <RegForm />
        } else if(page === 1) {
            return <PayForm />
        }
    }

    return (
        <div className="w-full">
            {openModal ? (
                <div className="w-full">
                    {PageDisplay()}
                </div>
            ):(
                <div className="hidden"></div>
            )}
        </div>
    );
}