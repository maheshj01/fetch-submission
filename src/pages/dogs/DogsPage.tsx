import { useEffect, useState } from 'react';
import dogService from '../../api/dogService';
import FetchNavbar from '../../components/common/Navbar';
import IconButton from '../../components/common/IconButton';
import { IoChevronBackOutline, IoChevronForwardOutline, IoExitOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'src/routes/routes';

const DogCard = ({ breed }: { breed: string }) => (
    <div className="bg-white rounded-md shadow-md px-4 py-3 w-full max-w-md mb-4">
        <p className="text-lg font-medium text-gray-800">{breed}</p>
    </div>
);

const DogsPage = () => {
    const [dogBreeds, setDogBreeds] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const [page, setPage] = useState<number>(0);
    const [pageSize, setPageSize] = useState<number>(25);
    // the total number of results for the query (not just the current page)
    const [totalResults, setTotalResults] = useState<number>(0);
    useEffect(() => {
        const loadDogBreeds = async () => {
            try {
                const dogs = await dogService.searchDogs({
                    from: page * pageSize,
                    size: pageSize,
                });
                setDogBreeds(dogs.data.resultIds as string[]);
                console.log(dogs.data.total);
                setTotalResults(dogs.data.total);
            } catch (err) {
                setError('There was an error fetching the dog breeds');
            } finally {
                setLoading(false);
            }
        };
        loadDogBreeds();
    }, [page, pageSize]);

    return (
        <div className='w-screen min-h-screen pb-8 flex flex-col'>
            <FetchNavbar
                className='bg-amber-50 '
                navbarTitle='We Love Dogs!'
                navbarIcon={
                    <IconButton onClick={() => navigate(ROUTES.LOGIN)} ariaLabel="Logout">
                        <IoExitOutline size={24} />
                    </IconButton>
                }
            />
            <div className="container mx-auto px-4 py-6 flex flex-col items-center overflow-y-auto max-h-[calc(100vh-10rem)]">
                {loading &&
                    <div className="flex flex-grow flex-col items-center justify-center w-full h-screen">
                        <p className="text-white">Loading...</p>
                    </div>
                }

                {error &&
                    <div className="flex flex-grow flex-col items-center justify-center w-full h-screen">
                        <p className="text-red-300">{error}</p>
                    </div>
                }
                {!loading && !error && (
                    dogBreeds.map((breed, index) => <DogCard key={index} breed={breed} />)
                )}
            </div>
            <div className="container mx-auto px-4 py-6 flex flex-row justify-between max-w-md items-center">
                <IconButton
                    ariaLabel="Previous Page"
                    onClick={() => {
                        if (page > 0) {
                            setPage(page - 1);
                        }
                    }}>
                    <IoChevronBackOutline size={24} />
                </IconButton>
                <p className="text-sm text-gray-500">
                    {page * pageSize} of {totalResults}
                </p>
                <IconButton ariaLabel="Next Page" onClick={() => {
                    if (page * pageSize < totalResults) {
                        setPage(page + 1);
                    }
                }}>
                    <IoChevronForwardOutline size={24} />
                </IconButton>
            </div>
        </div>
    );
};

export default DogsPage;
