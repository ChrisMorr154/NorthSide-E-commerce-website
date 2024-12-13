import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Paper, Typography, CircularProgress } from '@mui/material';

const SubmissionPage = () => {
  const { POnumber } = useParams();
  const [xmlContent, setXmlContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchXml = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/order/xml/${POnumber}`);
        setXmlContent(response.data);
      } catch (error) {
        console.error('Error fetching XML:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchXml();
  }, [POnumber]);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box sx={{ padding: 4, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Paper elevation={3} sx={{ padding: 4 }}>
        <Typography variant="h5" align="center" sx={{ marginBottom: 3 }}>
          Order XML for PO Number: {POnumber}
        </Typography>
        <Typography variant="body1" component="pre" sx={{ whiteSpace: 'pre-wrap' }}>
          {xmlContent}
        </Typography>
      </Paper>
    </Box>
  );
};

export default SubmissionPage;
