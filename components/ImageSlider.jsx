"use client";
import {useEffect, useState} from "react";
import Images from "@/assets/index"
import {BsChevronCompactLeft, BsChevronCompactRight} from "react-icons/bs";
import {RxDotFilled} from "react-icons/rx";

export default () => {
    const slides = [
        {
            path: Images.welcome
        },
        {
            path:Images.guide1
        },
        {
            path:Images.guide2
        },
    ]
    const [index,setIndex] = useState(0);
    
    const prevSlide = () => {
        const isFirstSlide = index === 0;
        const newIndex = isFirstSlide ? slides.length - 1 : index - 1;
        setIndex(newIndex);
    }
    
    const nextSlide = () => {
        const isLastSlide = index === slides.length - 1;
        const newIndex = isLastSlide ? 0 : index + 1;
        setIndex(newIndex);
    }
    
    const goToSlide = (index) => {
        setIndex(index);
    }
    const intervalTime = 3000;
    
    useEffect(() => {
        const autoScroll = setInterval(() => {
            goToSlide((prevSlide) =>
                prevSlide === slides.length - 1 ? 0 : prevSlide + 1
            );
        }, intervalTime);
        
        // Clean up interval on component unmount
        return () => clearInterval(autoScroll);
    }, [slides.length]);
    
    return (
        <div className={"max-w-screen-xl h-[450px] m-auto mt-5 px-4 relative group"}>
            <div style={{backgroundImage: `url(${slides[index].path.src})`}}
                 className={"w-full h-full rounded-2xl bg-center bg-cover duration-500"}>
            </div>
            <div className={"hidden group-hover:block absolute top-[50%] -translate-x-0 -translate-y-[-50%] left-5 text-2xl rounded-full p-2 " +
                "bg-black/10 text-white cursor-pointer hover:bg-black/20"}>
                <BsChevronCompactLeft onClick={() => prevSlide()} size={30}/>
            </div>
            <div className={"hidden group-hover:block absolute top-[50%] -translate-x-0 -translate-y-[-50%] right-5 text-2xl rounded-full p-2 " +
                "bg-black/10 text-white cursor-pointer hover:bg-black/20"}>
                <BsChevronCompactRight onClick={() => nextSlide()} size={30}/>
            </div>
            <div className={"flex top-4 justify-center py-2"}>
                {slides.map((slide, idx) => (
                    <div
                        key={idx}
                        className={"text-xl hover:text-2xl cursor-pointer"}
                        onClick={() => goToSlide(idx)}>
                        <RxDotFilled/>
                    </div>
                ))}
            </div>
        </div>
    
    )
}