import { Dog } from "src/types/types";

const DogGridCard = ({ dog }: { dog: Dog }) => (
    <div className='flex flex-col items-center justify-center bg-white rounded-md shadow-md px-4 py-3 min-w-xs max-w-xs mb-4'>
        <img src={dog.img} alt={dog.name} className='w-full h-full object-cover' />
        <div className='flex flex-col items-center justify-center'>
            <p className='text-lg font-bold'>{dog.name}</p>
            <p className='text-sm text-gray-500'>{dog.breed}</p>
            <p className='text-sm text-gray-500'>{dog.age} years</p>
        </div>
    </div>
)

export default DogGridCard;