import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { fetchDogs, setPage } from '../../store/slices/dogsSlice';
import FetchNavbar from '../../components/common/Navbar';
import IconButton from '../../components/common/IconButton';
import { IoChevronBackOutline, IoChevronForwardOutline, IoExitOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes/routes';

const DogCard = ({ breed }: { breed: string }) => (
    <div className="bg-white rounded-md shadow-md px-4 py-3 w-full max-w-md mb-4">
        <p className="text-lg font-medium text-gray-800">{breed}</p>
    </div>
);

const DogsPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { breeds, loading, error, page, pageSize, totalResults } = useSelector((state: RootState) => state.dogs);

    useEffect(() => {
        dispatch(fetchDogs({ page, pageSize }));
    }, [dispatch, page, pageSize]);

    return (
        <div className='w-screen min-h-screen pb-8 flex flex-col bg-amber-50'>
            <FetchNavbar
                className='bg-amber-100 '
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
                {!loading && !error && breeds.map((breed, index) => (
                    <DogCard key={index} breed={breed} />
                ))}
            </div>
            <div className="container mx-auto px-4 py-6 flex flex-row justify-between max-w-md items-center">
                <IconButton
                    ariaLabel="Previous Page"
                    onClick={() => {
                        if (page > 0) {
                            dispatch(setPage(page - 1));
                        }
                    }}>
                    <IoChevronBackOutline size={24} />
                </IconButton>
                <p className="text-sm text-gray-500">
                    {page * pageSize} - {page * pageSize + pageSize} of

                    {totalResults}
                </p>
                <IconButton
                    ariaLabel="Next Page"
                    onClick={() => {
                        if (page * pageSize < totalResults) {
                            dispatch(setPage(page + 1));
                        }
                    }}>
                    <IoChevronForwardOutline size={24} />
                </IconButton>
            </div>
        </div>
    );
};

export default DogsPage;
