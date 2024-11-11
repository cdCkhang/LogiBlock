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
        <section id ={"services"} className={"py-8 pb-8 select-none"}>
            <div className={"max-w-screen-xl mx-auto px-4 md:px-8"}>
                <div className={"mt-5"}>
                    <div className={"flex justify-between items-center"}>
                        <h5 className={"text-gray-800 text-xl font-bold sm:text-2xl mb-3"}>
                            Operations
                        </h5>
                        <div className={"text-right px-5 text-sm font-bold"}>
                        <span className={"inline-flex items-center justify-end cursor-pointer"}>
                            <p onClick={() => setHelpModal(true)} className={"flex items-center"}>
                                Show help
                                <Image src={images.helpicon} alt={""} width={32} className={"hover:scale-110 ml-2"}/>
                            </p>
                        </span>
                        </div>
                    </div>
                    <ul className={"grid gap-8 sm:grid-cols-2 md:grid-cols-3"}>
                        {team.map((item, idx) => (
                            <li key={idx}>
                                <div
                                    className={"w-full h-60 sm:h-52 md:h-56 hover:scale-110 hover:delay-150 duration-500"}
                                    onClick={() => openModelBox(idx + 1)}>
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