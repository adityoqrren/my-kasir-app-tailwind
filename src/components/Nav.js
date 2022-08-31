import { useState } from "react";
import { Link } from "react-router-dom";

function Nav() {

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMenuDownOpen, setIsMenuDownOpen] = useState(false);

    return (
        <nav className="bg-cyan-700 text-white sticky top-0 left-0 right-0 z-10 ">
            <div className="flex flex-col md:flex-row md:gap-3 md:px-20 md:h-14 md:items-center">
                <div className="bg-cyan-700 z-20 h-14 md:h-auto p-2 md:p-0 w-full md:w-auto flex justify-between items-center">
                    <Link to={"/"} className="font-bold text-lg">Kasir App</Link>
                    <button onClick={()=>(setIsMenuDownOpen(!isMenuDownOpen))}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:hidden cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" className={isMenuDownOpen ? "hidden" : ""} strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />             
                            <path strokeLinecap="round" className={isMenuDownOpen ? "" : "hidden"} strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className={`bg-cyan-700 absolute top-14 left-0 right-0 z-10 md:static md:translate-y-0 md:opacity-100 ${isMenuDownOpen? "translate-y-0" : "-translate-y-52"} flex gap-3 flex-col md:flex-row p-2 text-sm transition-all duration-1000`}>
                    <Link to={"/"} className="cursor-pointer hover:font-semibold">Home</Link>
                    <Link to={"/history"} className="cursor-pointer hover:font-semibold">History</Link>
                    <div className="">
                        <a onClick={()=>(setIsDropdownOpen(!isDropdownOpen))} className="hover:font-semibold flex gap-1 cursor-pointer"><span>Dropdown</span> <span className="text-tiny">▼</span> </a>
                        <div className={`bg-white text-slate-900 ${isDropdownOpen? 'flex' : 'hidden'} flex-col md:absolute md:w-28 gap-1 rounded-lg text-sm border border-1 overflow-x-hidden my-1`}>
                            <a href="#" className="px-2 py-1 hover:bg-slate-200">Dropdown 1</a>
                            <a href="#" className="px-2 py-1 hover:bg-slate-200">Dropdown 2</a>
                            <a href="#" className="px-2 py-1 hover:bg-slate-200">Dropdown 3</a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Nav;


