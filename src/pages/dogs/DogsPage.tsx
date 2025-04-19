import { useEffect, useState } from 'react';
import dogService from '../../api/dogService';
import FetchNavbar from '../../components/common/Navbar';
import IconButton from '../../components/common/IconButton';
import { IoExitOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'src/routes/routes';

const DogCard = ({ breed }: { breed: string }) => (
    <div className="bg-white rounded-xl shadow-md px-4 py-3 w-full max-w-md mb-4">
        <p className="text-lg font-medium text-gray-800">{breed}</p>
    </div>
);

const DogsPage = () => {
    const [dogBreeds, setDogBreeds] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const loadDogBreeds = async () => {
            try {
                const dogs = await dogService.searchDogs({});
                setDogBreeds(dogs.data.resultIds as string[]);
            } catch (err) {
                setError('There was an error fetching the dog breeds');
            } finally {
                setLoading(false);
            }
        };
        loadDogBreeds();
    }, []);

    return (
        <div className='w-screen min-h-screen pb-8'>
            <FetchNavbar
                className='bg-slate-100'
                navbarTitle='Available Dogs'
                navbarIcon={
                    <IconButton onClick={() => navigate(ROUTES.LOGIN)} ariaLabel="Logout">
                        <IoExitOutline size={24} />
                    </IconButton>
                }
            />
            <div className="container mx-auto px-4 py-6 flex flex-col items-center">
                {loading && <p className="text-white">Loading...</p>}
                {error && <p className="text-red-300">{error}</p>}
                {!loading && !error && (
                    dogBreeds.map((breed, index) => <DogCard key={index} breed={breed} />)
                )}
            </div>
        </div>
    );
};

export default DogsPage;
