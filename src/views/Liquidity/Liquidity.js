import React, { useMemo, useState } from 'react';
import Page from '../../components/Page';
import { createGlobalStyle } from 'styled-components';
import HomeImage from '../../assets/img/none.png';
import useLpStats from '../../hooks/useLpStats';
import { Box, Button, Grid, Paper, Typography } from '@material-ui/core';
import useTombStats from '../../hooks/useTombStats';
import TokenInput from '../../components/TokenInput';
import useTombFinance from '../../hooks/useTombFinance';
import { useWallet } from 'use-wallet';
import useTokenBalance from '../../hooks/useTokenBalance';
import { getDisplayBalance } from '../../utils/formatBalance';
import useApproveTaxOffice from '../../hooks/useApproveTaxOffice';
import { ApprovalState } from '../../hooks/useApprove';
import useProvideTombFtmLP from '../../hooks/useProvideTombFtmLP';
import { Alert } from '@material-ui/lab';

const BackgroundImage = createGlobalStyle`
  body {
    background: url(${HomeImage}) no-repeat !important;
    background-size: cover !important;
  }
`;
function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

const ProvideLiquidity = () => {
  const [tombAmount, setTombAmount] = useState(0);
  const [ftmAmount, setFtmAmount] = useState(0);
  const [lpTokensAmount, setLpTokensAmount] = useState(0);
  const { balance } = useWallet();
  const tombStats = useTombStats();
  const tombFinance = useTombFinance();
  const [approveTaxOfficeStatus, approveTaxOffice] = useApproveTaxOffice();
  const tombBalance = useTokenBalance(tombFinance.TOMB);
  const ftmBalance = (balance / 1e18).toFixed(4);
  const { onProvideTombFtmLP } = useProvideTombFtmLP();
  const tombFtmLpStats = useLpStats('HERMES-AVAX-LP');

  const tombLPStats = useMemo(() => (tombFtmLpStats ? tombFtmLpStats : null), [tombFtmLpStats]);
  const tombPriceInFTM = useMemo(() => (tombStats ? Number(tombStats.tokenInFtm).toFixed(2) : null), [tombStats]);
  const ftmPriceInTOMB = useMemo(() => (tombStats ? Number(1 / tombStats.tokenInFtm).toFixed(2) : null), [tombStats]);
  // const classes = useStyles();

  const handleTombChange = async (e) => {
    if (e.currentTarget.value === '' || e.currentTarget.value === 0) {
      setTombAmount(e.currentTarget.value);
    }
    if (!isNumeric(e.currentTarget.value)) return;
    setTombAmount(e.currentTarget.value);
    const quoteFromSpooky = await tombFinance.quoteFromSpooky(e.currentTarget.value, 'HERMES');
    setFtmAmount(quoteFromSpooky);
    setLpTokensAmount(quoteFromSpooky / tombLPStats.ftmAmount);
  };

  const handleFtmChange = async (e) => {
    if (e.currentTarget.value === '' || e.currentTarget.value === 0) {
      setFtmAmount(e.currentTarget.value);
    }
    if (!isNumeric(e.currentTarget.value)) return;
    setFtmAmount(e.currentTarget.value);
  const quoteFromSpooky = await tombFinance.quoteFromSpooky(e.currentTarget.value, 'AVAX');
    setTombAmount(quoteFromSpooky);

    setLpTokensAmount(quoteFromSpooky / tombLPStats.tokenAmount);
  };
  const handleTombSelectMax = async () => {
    const quoteFromSpooky = await tombFinance.quoteFromSpooky(getDisplayBalance(tombBalance), 'HERMES');
    setTombAmount(getDisplayBalance(tombBalance));
    setFtmAmount(quoteFromSpooky);
    setLpTokensAmount(quoteFromSpooky / tombLPStats.ftmAmount);
  };
  const handleFtmSelectMax = async () => {
    const quoteFromSpooky = await tombFinance.quoteFromSpooky(ftmBalance, 'AVAX');
    setFtmAmount(ftmBalance);
    setTombAmount(quoteFromSpooky);
    setLpTokensAmount(ftmBalance / tombLPStats.ftmAmount);
  };
  return (
    <Page>
      <BackgroundImage />
      <Typography color="primary" align="center" variant="h3" gutterBottom>
        Provide Liquidity
      </Typography>

      <Grid container justify="center">
        <Box style={{ width: '600px' }}>
          <Alert variant="filled" severity="warning" style={{ marginBottom: '10px' }}>
            <b>This and <a href="https://app.pangolin.exchange/#/swap"  rel="noopener noreferrer" target="_blank">Pangolin Exchange</a> are the only ways to provide Liquidity on HERMES-AVAX pair without paying tax.</b>
          </Alert>
          <Grid item xs={12} sm={12}>
            <Paper>
              <Box mt={4}>
                <Grid item xs={12} sm={12} style={{ borderRadius: 15 }}>
                  <Box p={4}>
                    <Grid container>
                      <Grid item xs={12}>
                        <TokenInput
                          onSelectMax={handleTombSelectMax}
                          onChange={handleTombChange}
                          value={tombAmount}
                          max={getDisplayBalance(tombBalance)}
                          symbol={'HERMES'}
                        ></TokenInput>
                      </Grid>
                      <Grid item xs={12}>
                        <TokenInput
                          onSelectMax={handleFtmSelectMax}
                          onChange={handleFtmChange}
                          value={ftmAmount}
                          max={ftmBalance}
                          symbol={'AVAX'}
                        ></TokenInput>
                      </Grid>
                      <Grid item xs={12}>
                        <p>1 HERMES = {tombPriceInFTM} AVAX</p>
                        <p>1 AVAX = {ftmPriceInTOMB} HERMES</p>
                        <p>LP tokens ≈ {lpTokensAmount.toFixed(2)}</p>
                      </Grid>
                      <Grid xs={12} justifyContent="center" style={{ textAlign: 'center' }}>
                        {approveTaxOfficeStatus === ApprovalState.APPROVED ? (
                          <Button
                            variant="contained"
                            onClick={() => onProvideTombFtmLP(ftmAmount.toString(), tombAmount.toString())}
                            color="primary"
                            style={{ margin: '0 10px', color: '#fff', borderRadius:'10px' }}
                          >
                            Supply
                          </Button>
                        ) : (
                          <Button
                            variant="contained"
                            onClick={() => approveTaxOffice()}
                            color="primary"
                            style={{ margin: '0 10px', borderRadius:'10px' }}
                          >
                            Approve
                          </Button>
                        )}
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              </Box>
            </Paper>
          </Grid>
        </Box>
      </Grid>
    </Page>
  );
};

export default ProvideLiquidity;
