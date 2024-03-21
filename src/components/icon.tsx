import icon from '../assets/icon.png';
import Image from 'next/image';
export const Icon = () => (
    <div className="flex  items-end mb-10 poll-icon">
        <Image src={icon} alt="EzkPoll" height={50} width={50} />
        <div className="text-blue-600 text-2xl font-bold ml-2">
            EzkPoll
        </div>
    </div>
);