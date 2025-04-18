import { Box, Typography } from '@mui/material';

const DogsPage = () => {
    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Available Dogs
            </Typography>
            {/* Dog list will be implemented here */}
        </Box>
    );
};

export default DogsPage; 