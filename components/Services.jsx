import images from "@/assets/index"
import Image from "next/image";

export default ({
    setOpenProfile,
    setCompleteModal,
    setGetModel,
    setStartModal,
    setHelpModal,
}) => {
    const team = [
        {
            avatar:  images.completeshipment
        },
        {
            avatar: images.getshipment
        },
        {
            avatar:images.startshipment
        },
        {
            avatar: images.userprofile
        },
        {
            avatar: images.shipcount
        },
        {
            avatar: images.sendship
        },
    ]
    const openModelBox = (text) => {
        if(text === 1){
            setCompleteModal(true);
        }else if (text === 2){
            setGetModel(true);
        }else if (text === 3){
            setStartModal(true);
        }else if (text === 4){
            setOpenProfile(true);
        }
    };
    
    return (
        <section className={"py-0 pb-14 select-none"}>
            <div className={"max-w-screen-xl mx-auto px-4 md:px-8"}>
                <div className={"mt-12"}>
                    <div className={"text-right px-5 py-5 cursor-pointer underline text-sm font-bold"}>
                        <span><p onClick={() => setHelpModal(true)}> Click here to show help </p></span>
                    </div>
                    <ul className={"grid gap-8 sm:grid-cols-2 md:grid-cols-3"}>
                        {team.map((item, idx) => (
                            <li key={idx}>
                                <div className={"w-full h-60 sm:h-52 md:h-56 hover:scale-110 hover:delay-150 duration-500"}
                                    onClick={() => openModelBox(idx+1)}>
                                    <Image className={"w-full h-full object-cover object-center shadow-md rounded-xl"}
                                        src={item.avatar} alt={""}/>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    )
}