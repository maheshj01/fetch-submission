import { Dog } from "src/types/types";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { addFavorite, removeFavorite } from 'src/store/slices/favoritesSlice';
import { IoHeart, IoHeartOutline } from "react-icons/io5";

const DogGridCard = ({ dog }: { dog: Dog }) => {
    const dispatch = useDispatch();
    const favorites = useSelector((state: RootState) => state.favorites.dogs);
    const isFavorite = favorites.some(favDog => favDog.id === dog.id);

    const handleFavorite = () => {
        if (isFavorite) {
            dispatch(removeFavorite(dog.id));
        } else {
            dispatch(addFavorite(dog));
        }
    };

    return (
        <div className='flex flex-col bg-white rounded-md shadow-md px-4 py-3 min-w-xs max-w-xs mb-4'>
            <div className="relative">
                <img src={dog.img} alt={dog.name} className='w-full h-full object-cover' />
                <button
                    onClick={handleFavorite}
                    className="absolute top-2 right-2 text-2xl text-red-500 hover:text-red-700 focus:outline-none bg-white rounded-full p-1"
                    aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                >
                    {isFavorite ? <IoHeart /> : <IoHeartOutline />}
                </button>
            </div>
            <div className='flex items-center justify-between py-2'>
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
    );
};

export default DogGridCard;