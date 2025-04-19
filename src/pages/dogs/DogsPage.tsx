import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { fetchDogs, setFilter, setPage } from '../../store/slices/dogsSlice';
import FetchNavbar from '../../components/common/Navbar';
import IconButton from '../../components/common/IconButton';
import { IoExitOutline, IoGridOutline, IoListOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes/routes';
import PageIndicator from '../../components/common/PageIndicator';
import authService from 'src/api/authService';
import DogListCard from 'src/components/common/DogListCard';
import DogGridCard from 'src/components/common/DogGridCard';
import { useAppSelector } from 'src/hooks/useAppSelector';
import { Button } from 'src/components/ui/button';
import { clearFavorites } from 'src/store/slices/favoritesSlice';
import dogService from 'src/api/dogService';
import DogMatchDialog from 'src/components/common/DogMatchDialog';
import { Dog } from 'src/types/types';

const DogsPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { dogs, loading, error, page, pageSize, sort, filter } = useSelector((state: RootState) => state.dogs);
    const favorites = useAppSelector((state: RootState) => state.favorites.dogs);
    const [view, setView] = useState<'grid' | 'list'>('grid');
    const [isMatchDialogOpen, setIsMatchDialogOpen] = useState(false);
    const [matchedDog, setMatchedDog] = useState<Dog | undefined>();
    const [matchLoading, setMatchLoading] = useState(false);

    useEffect(() => {
        dispatch(fetchDogs({ page, pageSize, sort, filter }));
    }, [dispatch, page, pageSize, filter, sort]);

    const handleViewChange = () => {
        setView(view === 'grid' ? 'list' : 'grid');
    }

    const handleLogout = async () => {
        await authService.logout();
        dispatch(clearFavorites());
        navigate(ROUTES.LOGIN);
    }

    const matchDogs = async () => {
        try {
            setMatchLoading(true);
            const favIds = favorites.map((dog) => dog.id);
            const matchedDog = await dogService.getDogMatch(favIds);
            const dogResponse = await dogService.getDogsByIds([matchedDog.match]);
            setMatchedDog(dogResponse[0]);
            setIsMatchDialogOpen(true);
        } catch (error) {
            console.error('Error matching dogs:', error);
        } finally {
            setMatchLoading(false);
        }
    }

    return (
        <div className='w-auto min-w-screen min-h-screen pb-8 flex flex-col bg-amber-50 mx-0'>
            <FetchNavbar
                className='bg-amber-100'
                navbarTitle='We Love Dogs!'>
                <div className='flex space-x-2'>
                    {favorites.length > 0 && (
                        <Button
                            size={'lg'}
                            className='bg-gradient-to-r from-amber-500 to-amber-800 text-white hover:bg-amber-800 hover:scale-105 transition-all duration-300'
                            onClick={matchDogs}
                            disabled={matchLoading}
                        >
                            {matchLoading ? 'Matching...' : `Match (${favorites.length})`}
                        </Button>
                    )}

                    <IconButton onClick={handleViewChange} ariaLabel="Grid View">
                        {view === 'grid' ? <IoGridOutline size={24} /> : <IoListOutline size={24} />}
                    </IconButton>
                    <IconButton onClick={handleLogout} ariaLabel="Logout">
                        <IoExitOutline size={24} />
                    </IconButton>
                </div>
            </FetchNavbar>
            <div className="container px-4 py-6 flex flex-col items-center overflow-y-auto max-h-[calc(100vh-10rem)]">
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
                {view === 'list' ?
                    (dogs.length > 0 && !loading && !error && dogs.map((dog) => (
                        <DogListCard key={dog.id} dog={dog} />
                    )))
                    :
                    (<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                        {dogs.length > 0 && !loading && !error && dogs.map((dog) => (
                            <DogGridCard key={dog.id} dog={dog} />
                        ))}
                    </div>
                    )
                }
                {dogs.length === 0 && !loading && !error && (
                    <div className="flex flex-grow flex-col items-center justify-center w-full h-screen">
                        <p className="text-gray-300">No dogs found</p>
                    </div>
                )}
            </div>
            <PageIndicator />
            <DogMatchDialog
                isOpen={isMatchDialogOpen}
                onClose={() => setIsMatchDialogOpen(false)}
                matchedDog={matchedDog}
            />
        </div>
    );
};

export default DogsPage;
