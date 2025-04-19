import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { fetchDogs, setFilter, setPage } from '../../store/slices/dogsSlice';
import FetchNavbar from '../../components/common/Navbar';
import IconButton from '../../components/common/IconButton';
import { IoExitOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes/routes';
import PageIndicator from '../../components/common/PageIndicator';
import { Dog } from '@/src/types/types';


const DogCard = ({ dog }: { dog: Dog }) => (
    <div className="bg-white rounded-md shadow-md px-4 py-3 w-full max-w-md mb-4">
        <div className="flex items-center space-x-4">
            <img src={dog.img} alt={dog.name} className="w-16 h-16 rounded-full object-cover" />
            <div>
                <p className="text-lg font-medium text-gray-800">{dog.name}</p>
                <p className="text-sm text-gray-600">Breed: {dog.breed}</p>
                <p className="text-sm text-gray-600">Age: {dog.age} years</p>
            </div>
        </div>
    </div>
);

const DogsPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { dogs, loading, error, page, pageSize, sort, filter } = useSelector((state: RootState) => state.dogs);

    useEffect(() => {
        dispatch(fetchDogs({ page, pageSize, sort, filter }));
    }, [dispatch, page, pageSize, filter, sort]);

    return (
        <div className='w-screen min-h-screen pb-8 flex flex-col bg-amber-50'>
            <FetchNavbar
                className='bg-amber-100'
                navbarTitle='We Love Dogs!'
                navbarIcon={
                    <IconButton onClick={() => navigate(ROUTES.LOGIN)} ariaLabel="Logout">
                        <IoExitOutline size={24} />
                    </IconButton>
                }
            />
            <div className="container mx-auto px-4 py-6 flex flex-col items-center overflow-y-auto max-h-[calc(100vh-10rem)]">
                {loading && (
                    <div className="flex flex-grow flex-col items-center justify-center w-full h-screen">
                        <p className="text-white">Loading...</p>
                    </div>
                )}

                {error && (
                    <div className="flex flex-grow flex-col items-center justify-center w-full h-screen">
                        <p className="text-red-300">{error}</p>
                    </div>
                )}
                {!loading && !error && dogs.map((dog) => (
                    <DogCard key={dog.id} dog={dog} />
                ))}
            </div>
            <PageIndicator />
        </div>
    );
};

export default DogsPage;
