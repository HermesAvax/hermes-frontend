import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, CardActions, CardContent, Typography, Grid } from '@material-ui/core';
import Card from '../../components/Card';

import TokenSymbol from '../../components/TokenSymbol';
import useLpStats from '../../hooks/useLpStats';
import useLpStats2 from '../../hooks/useLpStats2';
import useLpStats3 from '../../hooks/useLpStats3';


const CemeteryCard = () => {
  const tombFtmLpStats = useLpStats('HERMES-AVAX-LP');
  const tShareFtmLpStats = useLpStats('HSHARE-AVAX-LP');
  const hermeshshareLpStats = useLpStats2('HERMES-HSHARE-LP');
  const hsharewineLpStats = useLpStats3('HSHARE-WINE-LP');
  const tombLPStats = useMemo(() => (tombFtmLpStats ? tombFtmLpStats : null), [tombFtmLpStats]);
  const tshareLPStats = useMemo(() => (tShareFtmLpStats ? tShareFtmLpStats : null), [tShareFtmLpStats]);
  const hermesshareLPStats = useMemo(() => (hermeshshareLpStats ? hermeshshareLpStats : null), [hermeshshareLpStats]); 
  const hsharewineLPStats = useMemo(() => (hsharewineLpStats ? hsharewineLpStats : null), [hsharewineLpStats]); 

  return (
    <Grid container spacing={3}>
    <Grid item xs={12} sm={6}>
    <Card>
      <CardContent align="center">
          <Typography variant="h5" component="h2">
              HERMES-AVAX-LP
            </Typography>
        <Box mt={2}>
            <TokenSymbol symbol="HERMES-AVAX-LP" />
        </Box>
        <Box mt={2}>
        </Box>
        <Box mt={2}>
          <span style={{ fontSize: '26px' }}>
            {tombLPStats?.tokenAmount ? tombLPStats?.tokenAmount : '-.--'} HERMES /{' '}
            {tombLPStats?.ftmAmount ? tombLPStats?.ftmAmount : '-.--'} AVAX
          </span>
        </Box>
        <Box>${tombLPStats?.priceOfOne ? tombLPStats.priceOfOne : '-.--'}</Box>
        <span style={{ fontSize: '12px' }}>
          Liquidity: ${tombLPStats?.totalLiquidity ? tombLPStats.totalLiquidity : '-.--'} <br />
          Total supply: {tombLPStats?.totalSupply ? tombLPStats.totalSupply : '-.--'}
        </span>
      </CardContent>
      <CardActions style={{ justifyContent: 'center' }}>
          <Button color="primary" size='small' style={{ width: '400px'}} variant="contained" component={Link} to={`/crete/HermesAvaxLPHShareRewardPool/`}>
            View
          </Button>
        </CardActions>
    </Card>
    </Grid>
    <Grid item xs={12} sm={6}>
      <Card>
        <CardContent align="center">
            <Typography variant="h5" component="h2">
            HSHARE-AVAX-LP
              </Typography>
          <Box mt={2}>
              <TokenSymbol symbol="HSHARE-AVAX-LP" />
          </Box>
          <Box mt={2}>
          </Box>
          <Box mt={2}>
          <span style={{ fontSize: '26px' }}>
                  {tshareLPStats?.tokenAmount ? tshareLPStats?.tokenAmount : '-.--'} HSHARE /{' '}
                  {tshareLPStats?.ftmAmount ? tshareLPStats?.ftmAmount : '-.--'} AVAX
                </span>
          </Box>
          <Box>${tshareLPStats?.priceOfOne ? tshareLPStats.priceOfOne : '-.--'}</Box>
              <span style={{ fontSize: '12px' }}>
                Liquidity: ${tshareLPStats?.totalLiquidity ? tshareLPStats.totalLiquidity : '-.--'}
                <br />
                Total supply: {tshareLPStats?.totalSupply ? tshareLPStats.totalSupply : '-.--'}
              </span>
        </CardContent>
        <CardActions style={{ justifyContent: 'center' }}>
            <Button color="primary" size='small' style={{ width: '400px'}} variant="contained" component={Link} to={`/crete/HshareAvaxLPHShareRewardPool/`}>
              View
            </Button>
          </CardActions>
      </Card>
      </Grid>
      <Grid item xs={12} sm={6}>
      <Card>
        <CardContent align="center">
            <Typography variant="h5" component="h2">
            HERMES-HSHARE-LP (NEW POOL)
              </Typography>
          <Box mt={2}>
              <TokenSymbol symbol="HERMES-HSHARE-LP" />
          </Box>
          <Box mt={2}>
          </Box>
          <Box mt={2}>
          <span style={{ fontSize: '26px' }}>
                  {hermesshareLPStats?.tokenAmount ? hermesshareLPStats?.tokenAmount : '-.--'} HERMES /{' '}
                  {hermesshareLPStats?.ftmAmount ? hermesshareLPStats?.ftmAmount : '-.--'} HSHARE
                </span>
          </Box>
          <Box>${hermesshareLPStats?.priceOfOne ? hermesshareLPStats.priceOfOne : '-.--'}</Box>
              <span style={{ fontSize: '12px' }}>
                Liquidity: ${hermesshareLPStats?.totalLiquidity ? hermesshareLPStats.totalLiquidity : '-.--'}
                <br />
                Total supply: {hermesshareLPStats?.totalSupply ? hermesshareLPStats.totalSupply : '-.--'}
              </span>
        </CardContent>
        <CardActions style={{ justifyContent: 'center' }}>
            <Button color="primary" size='small' style={{ width: '400px'}} variant="contained" component={Link} to={`/crete/HermesHshareLPHShareRewardPool/`}>
              View
            </Button>
          </CardActions>
      </Card>
      </Grid>
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
      <Grid item xs={12} sm={6}>
      <Card>
        <CardContent align="center">
            <Typography variant="h5" component="h2">
            HERMES-HSHARE-LP (OLD POOL FINISHED)
              </Typography>
          <Box mt={2}>
              <TokenSymbol symbol="HERMES-HSHARE-LP" />
          </Box>
          <Box mt={2}>
          </Box>
          <Box mt={2}>
          <span style={{ fontSize: '26px' }}>
                  {hermesshareLPStats?.tokenAmount ? hermesshareLPStats?.tokenAmount : '-.--'} HERMES /{' '}
                  {hermesshareLPStats?.ftmAmount ? hermesshareLPStats?.ftmAmount : '-.--'} HSHARE
                </span>
          </Box>
          <Box>${hermesshareLPStats?.priceOfOne ? hermesshareLPStats.priceOfOne : '-.--'}</Box>
              <span style={{ fontSize: '12px' }}>
                Liquidity: ${hermesshareLPStats?.totalLiquidity ? hermesshareLPStats.totalLiquidity : '-.--'}
                <br />
                Total supply: {hermesshareLPStats?.totalSupply ? hermesshareLPStats.totalSupply : '-.--'}
              </span>
        </CardContent>
        <CardActions style={{ justifyContent: 'center' }}>
            <Button color="primary" size='small' style={{ width: '400px'}} variant="contained" component={Link} to={`/crete/HermesHShareLPHShareRewardPool/`}>
              View
            </Button>
          </CardActions>
      </Card>
      </Grid>
      </Grid>
  );
};

export default CemeteryCard;
