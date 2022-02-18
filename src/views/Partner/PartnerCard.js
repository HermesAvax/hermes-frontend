import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, CardActions, CardContent, Typography, Grid } from '@material-ui/core';
import Card from '../../components/Card';

import TokenSymbol from '../../components/TokenSymbol';
import useLpStats3 from '../../hooks/useLpStats3';


const PartnerCard = () => {
  const hsharewineLpStats = useLpStats3('HSHARE-WINE-LP');
  const hsharewineLPStats = useMemo(() => (hsharewineLpStats ? hsharewineLpStats : null), [hsharewineLpStats]); 

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
      <Card>
        <CardContent align="center">
            <Typography variant="h5" component="h2">
            HSHARE-WINE-LP
              </Typography>
          <Box mt={2}>
              <TokenSymbol symbol="HSHARE-WINE-LP" />
          </Box>
          <Box mt={2}>
          </Box>
          <Box mt={2}>
          <span style={{ fontSize: '26px' }}>
                  {hsharewineLPStats?.tokenAmount ? hsharewineLPStats?.tokenAmount : '-.--'} HSHARE /{' '}
                  {hsharewineLPStats?.ftmAmount ? hsharewineLPStats?.ftmAmount : '-.--'} WINE
                </span>
          </Box>
          <Box>${hsharewineLPStats?.priceOfOne ? hsharewineLPStats.priceOfOne : '-.--'}</Box>
              <span style={{ fontSize: '12px' }}>
                Liquidity: ${hsharewineLPStats?.totalLiquidity ? hsharewineLPStats.totalLiquidity : '-.--'}
                <br />
                Total supply: {hsharewineLPStats?.totalSupply ? hsharewineLPStats.totalSupply : '-.--'}
              </span>
        </CardContent>
        <CardActions style={{ justifyContent: 'center' }}>
            <Button color="primary" size='small' style={{ width: '400px'}} variant="contained" component={Link} to={`/partner/PartnerRewardPool/`}>
              View
            </Button>
          </CardActions>
      </Card>
      </Grid>
      </Grid>
  );
};

export default PartnerCard;
