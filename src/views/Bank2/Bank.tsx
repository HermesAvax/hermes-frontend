import React, { useEffect } from 'react';
import styled from 'styled-components';

import { useParams } from 'react-router-dom';
import { useWallet } from 'use-wallet';
import { makeStyles } from '@material-ui/core/styles';

import { Box, /*Button,*/ Card, CardContent,/*Typography,*/ Grid } from '@material-ui/core';

import PageHeader from '../../components/PageHeader';
import Spacer from '../../components/Spacer';
import UnlockWallet from '../../components/UnlockWallet';
import Harvest from './components/Harvest';
import HarvestWine from './components/HarvestWine';
import Stake from './components/Stake';
import useBank from '../../hooks/useBank';
// import useStatsForPool from '../../hooks/useStatsForPool';
import useStatsForWine from '../../hooks/useStatsForWine';
// import useRedeem from '../../hooks/useRedeem';
 import { Bank as BankEntity } from '../../tomb-finance';
 import useTombFinance from '../../hooks/useTombFinance';

const useStyles = makeStyles((theme) => ({
  gridItem: {
    height: '100%',
    [theme.breakpoints.up('md')]: {
      height: '90px',
    },
  },
}));



const Bank: React.FC = () => {
  useEffect(() => window.scrollTo(0, 0));
  const classes = useStyles();
  const { bankId } = useParams();
  const bank = useBank(bankId);

  const { account } = useWallet();
 // const { onRedeem } = useRedeem(bank);
  const statsOnPool = useStatsForWine(bank);  
  return account && bank ? (
    <>
      <PageHeader
        icon="🏦"
        subtitle={`Deposit ${bank?.depositTokenName} and earn ${bank?.earnTokenName}`}
        title={bank?.name}
      />
      <Box>
        <Grid container justify="center" spacing={3} style={{ marginBottom: '50px' }}>
          <Grid item xs={12} md={2} lg={3} className={classes.gridItem}>
            <Card style={{background: '#161414', borderRadius: '15px', height: '120px'}} className={classes.gridItem}>
              <CardContent style={{ textAlign: 'center' }}>
                <h3 style={{ color: '#FFAE00'}}>APR</h3>
                <h2 style={{ fontWeight: 'lighter'}}>{bank.closedForStaking ? '0.00' : statsOnPool?.yearlyAPR}%</h2>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={2} lg={3} className={classes.gridItem}>
            <Card style={{background: '#161414', borderRadius: '15px', height: '120px'}} className={classes.gridItem}>
              <CardContent style={{ textAlign: 'center' }}>
                <h3 style={{ color: '#FFAE00'}}>Daily APR</h3>
                <h2 style={{ fontWeight: 'lighter'}}>{bank.closedForStaking ? '0.00' : statsOnPool?.dailyAPR}%</h2>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={2} lg={3} className={classes.gridItem}>
            <Card style={{background: '#161414', borderRadius: '15px', height: '120px'}} className={classes.gridItem}>
              <CardContent style={{ textAlign: 'center' }}>
                <h3 style={{ color: '#FFAE00'}}>Total Value Locked</h3>
                <h2 style={{ fontWeight: 'lighter'}}>${statsOnPool?.TVL}</h2>
              </CardContent>
            </Card> 
  </Grid> 
        </Grid>
      </Box>
      <Box mt={12}>
        <StyledBank>
          <StyledCardsWrapper>
            <StyledCardWrapper>
              <Harvest bank={bank} /> 
            </StyledCardWrapper>
            <Spacer />
            <StyledCardWrapper>
            <HarvestWine bank={bank} />
            </StyledCardWrapper>
            <Spacer />
            <StyledCardWrapper>{<Stake bank={bank} />}</StyledCardWrapper>
          </StyledCardsWrapper>
          <Spacer size="lg" />
          {bank.depositTokenName.includes('LP') && <LPTokenHelpText bank={bank} />}
          <Spacer size="lg" />
        </StyledBank>
      </Box>
    </>
  ) : !bank ? (
    <BankNotFound />
  ) : (
    <UnlockWallet />
  );
};

  const LPTokenHelpText: React.FC<{ bank: BankEntity }> = ({ bank }) => {
  const tombFinance = useTombFinance();
  const tombAddr = tombFinance.TOMB.address;
  const tshareAddr = tombFinance.TSHARE.address;
  const wineAddr = tombFinance.WINE.address;

  let pairName: string;
  let uniswapUrl: string;
  if (bank.depositTokenName.includes('HERMES-AVAX')) {
    pairName = 'HERMES-AVAX pair';
    uniswapUrl = 'https://app.pangolin.exchange/#/add/AVAX/' + tombAddr;
  } else if (bank.depositTokenName.includes('HERMES-HSHARE')) {
    pairName = 'HERMES-HSHARE pair';
    uniswapUrl = 'https://app.pangolin.exchange/#/add/' + tombAddr + '/' + tshareAddr;
  } else {
    pairName = 'HSHARE-WINE pair';
    uniswapUrl = 'https://app.pangolin.exchange/#/add/' + tshareAddr + '/' + wineAddr;;
  }
  return (
    <Card style={{ background: '#161414', borderRadius: '10px'}}>
      <CardContent>
        <StyledCardWrapper>
        <StyledLink href={uniswapUrl} target="_blank">
          {`Provide liquidity for ${pairName} now on Pangolin Exchange`}
        </StyledLink>
        <StyledLink style={{color: '#FFFFFF'}} href="https://app.pangolin.exchange/#/swap?outputCurrency=0x153478b3dD08b7E889ca062abc08059F894bEDb2" target="_blank">
          {`Buy HSHARE now on Pangolin Exchange`}
        </StyledLink>
        <StyledLink style={{color: '#C133FF'}} href="https://traderjoexyz.com/trade?inputCurrency=0x130966628846bfd36ff31a822705796e8cb8c18d&outputCurrency=0xc55036b5348cfb45a932481744645985010d3a44#/" target="_blank">
          {`Buy WINE now on Trader Joe`}
        </StyledLink>
        </StyledCardWrapper>
      </CardContent>
    </Card>
  );
}; 
const BankNotFound = () => {
  return (
    <Center>
      <PageHeader icon="🏚" title="Not Found" subtitle="You've hit a bank just robbed by unicorns." />
    </Center>
  );
};

const StyledBank = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const StyledLink = styled.a`
  font-weight: 500;
  text-decoration: none;
  color: #FFAE00;
`; 

const StyledCardsWrapper = styled.div`
  display: flex;
  width: 1000px;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`;

const StyledCardWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Center = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export default Bank;
