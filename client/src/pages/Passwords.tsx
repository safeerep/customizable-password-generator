import { BiCopy } from "react-icons/bi"
import toast, { Toaster } from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../context/store";
import { useEffect } from "react";
import { getPasswords } from "../context/actions/actions";

export default () => {
    const dispatch: AppDispatch = useDispatch()
    useEffect(() => {
        dispatch( getPasswords())
    }, [dispatch])
    const passwords: string[] = useSelector((state: RootState) => state.user?.data?.passwords)
    const handleCopy = (index: number) => {
        navigator.clipboard.writeText(passwords[index])
            .then(() => {
                toast.success("Password copied successfully")
            })
            .catch((err: any) => {
                console.log(`something went wrong during copying the text to clipboard ${err}`);
                toast.error(`something went wrong during copying the text to clipboard ${err}`)
            })
    }
    return (
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 w-full gap-4 mb-2 px-12 min-h-screen">
            {passwords?.length &&
                passwords?.map((password, index) => {
                    return (
                        <div
                            key={password}
                            className={`m-5 
                                    ${(index + 8) % 7 === 0 ? 'bg-violet-600' :
                                    (index + 8) % 7 === 6 ? 'bg-indigo-600' :
                                        (index + 8) % 7 === 5 ? 'bg-blue-600' :
                                            (index + 8) % 7 === 4 ? 'bg-green-600' :
                                                (index + 8) % 7 === 3 ? 'bg-yellow-600' :
                                                    (index + 8) % 7 === 2 ? 'bg-orange-600' :
                                                        (index + 8) % 7 === 1 ? 'bg-red-600' :
                                                            'bg-white'} 
                                    h-60 inline-block cursor-pointer border p-2`}
                        >
                            <div className="flex flex-col justify-center items-center w-full h-full">
                                <div className="relative flex items-center">
                                    <input type="text" className="p-3 rounded-lg bg-white text-black text-lg" value={password} readOnly />
                                    <BiCopy className="absolute right-4 text-black cursor-pointer"
                                        onClick={() => {
                                            handleCopy(index)
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    );
                })}
            <Toaster />
        </div>
    )
};