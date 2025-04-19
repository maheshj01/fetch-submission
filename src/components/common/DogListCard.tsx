import { Dog } from "src/types/types";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { addFavorite, removeFavorite } from 'src/store/slices/favoritesSlice';
import { IoHeart, IoHeartOutline } from "react-icons/io5";

const DogListCard = ({ dog }: { dog: Dog }) => {
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
        <div className="bg-white rounded-md shadow-md px-4 py-3 w-full max-w-md mb-4">
            <div className="flex items-center space-x-4 justify-between">
                <img src={dog.img} alt={dog.name} className="w-16 h-16 rounded-full object-cover" />
                <div className="flex flex-col grow">
                    <p className="text-lg font-medium text-gray-800">{dog.name}</p>
                    <p className="text-sm text-gray-600">Breed: {dog.breed}</p>
                    <p className="text-sm text-gray-600">Age: {dog.age} years</p>
                </div>
                <div className="flex flex-col items-end">
                    <p className="text-sm text-gray-600">Zip {dog.zip_code}</p>
                    <button
                        onClick={handleFavorite}
                        className="mt-2 text-2xl text-red-500 hover:text-red-700 focus:outline-none"
                        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                    >
                        {isFavorite ? <IoHeart /> : <IoHeartOutline />}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DogListCard;
