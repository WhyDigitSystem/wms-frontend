import { Card, CardContent, CardMedia, Typography } from '@mui/material';

const NoDataFound = ({ message }) => {
  return (
    <Card
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        textAlign: 'center',
        // boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        maxWidth: 'auto',
        margin: 'auto'
      }}
    >
      <CardMedia
        component="img"
        alt="No Data Found"
        height="120"
        image="https://cdn-icons-gif.flaticon.com/17771/17771140.gif" // Replace this with your image path
        style={{ objectFit: 'contain' }}
      />
      <CardContent>
        <Typography variant="h6" color="textSecondary" gutterBottom>
          {message || 'No Data Available'}
        </Typography>
        {/* <Typography variant="body2" color="textSecondary">
          Please try selecting a different month or adjusting your filters.
        </Typography> */}
      </CardContent>
    </Card>
  );
};

export default NoDataFound;
