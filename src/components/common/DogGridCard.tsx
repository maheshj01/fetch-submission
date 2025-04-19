import { Dog } from "src/types/types";

const DogGridCard = ({ dog }: { dog: Dog }) => (
    <div className='flex flex-col bg-white rounded-md shadow-md px-4 py-3 min-w-xs max-w-xs mb-4'>
        <img src={dog.img} alt={dog.name} className='w-full h-full object-cover' />
        <div className='flex items-center justify-between py-2'>
            {/* span with year in large and years in small text */}
            <div className='flex flex-col items-center justify-center'>
                <p className='text-2xl text-gray-500'>{dog.age}</p>
                <p className='text-sm text-gray-500 '>&nbsp;years</p>
            </div>
            <div className='flex flex-col items-center justify-center'>
                <p className='text-lg font-bold'>{dog.name}</p>
                <p className='text-sm text-gray-500'>({dog.breed})</p>
            </div>
            <p className='text-sm text-gray-500'>{dog.zip_code}</p>
        </div>

    </div>
)

export default DogGridCard;