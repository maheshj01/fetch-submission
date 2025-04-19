import { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, List, ListItem, ListItemText } from '@mui/material';
import dogService from '../../api/dogService';
const DogsPage = () => {
    const [dogBreeds, setDogBreeds] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

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
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Available Dogs
            </Typography>

            {loading ? (
                <CircularProgress />
            ) : error ? (
                <Typography color="error">{error}</Typography>
            ) : (
                <List>
                    {dogBreeds.map((breed, index) => (
                        <ListItem key={index}>
                            <ListItemText primary={breed} />
                        </ListItem>
                    ))}
                </List>
            )}
        </Box>
    );
};

export default DogsPage;
