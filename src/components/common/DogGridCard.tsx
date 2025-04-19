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
        <div className='w-72 bg-white rounded-lg shadow-md overflow-hidden'>
            <div className="relative w-full h-72">
                <img
                    src={dog.img}
                    alt={dog.name}
                    className='w-full h-full object-cover'
                    onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://placehold.co/300x300?text=No+Image';
                    }}
                />
                <button
                    onClick={handleFavorite}
                    className="absolute top-3 right-3 text-2xl text-red-500 hover:text-red-700 focus:outline-none bg-white/80 hover:bg-white rounded-full p-1.5 transition-colors duration-200"
                    aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                >
                    {isFavorite ? <IoHeart /> : <IoHeartOutline />}
                </button>
            </div>
            <div className='p-4 space-y-3'>
                <div className='flex items-center justify-between'>
                    <h3 className='text-lg font-semibold text-gray-800'>{dog.name}</h3>
                    <span className='text-sm text-gray-500'>#{dog.zip_code}</span>
                </div>
                <p className='text-sm text-gray-600'>{dog.breed}</p>
                <div className='flex items-baseline'>
                    <span className='text-2xl font-medium text-gray-700'>{dog.age}</span>
                    <span className='ml-1 text-sm text-gray-500'>years old</span>
                </div>
            </div>
        </div>
    );
};

export default DogGridCard;