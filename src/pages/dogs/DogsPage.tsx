import { useEffect, useState } from 'react';
import dogService from '../../api/dogService';
import FetchNavbar from '../../components/common/Navbar';
import IconButton from '../../components/common/IconButton';
import { IoExitOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'src/routes/routes';
const DogsPage = () => {
    const [dogBreeds, setDogBreeds] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    useEffect(() => {
        const loadDogBreeds = async () => {
            try {
                const breeds = await dogService.fetchBreeds();
                setDogBreeds(breeds);
            } catch (err) {
                setError('There was an error fetching the dog breeds');
            } finally {
                setLoading(false);
            }
        };
        loadDogBreeds();
    }, []);

    return (
        <div className='w-screen h-screen'>
            <FetchNavbar
                className='bg-slate-100'
                navbarTitle='Available Dogs'
                navbarIcon={
                    <IconButton onClick={() => {
                        navigate(ROUTES.LOGIN);
                    }} ariaLabel="Logout">
                        <IoExitOutline size={24} />
                    </IconButton>
                }
            />
            < div className="flex flex-col items-center justify-center h-full" >
                {
                    loading ? (
                        <p> Loading...</p >
                    ) : error ? (
                        <p>{error}</p>
                    ) : (
                        <ul>
                            {dogBreeds.map((breed, index) => (
                                <li key={index} className="py-2 px-4 border-b">
                                    {breed}
                                </li>
                            ))}
                        </ul>
                    )}
            </div >
        </div >
    );
};

export default DogsPage;
