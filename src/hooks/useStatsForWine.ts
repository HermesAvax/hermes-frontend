import { useCallback, useState, useEffect } from 'react';
import useTombFinance from './useTombFinance';
import { Bank } from '../tomb-finance';
import { PoolStatsWine } from '../tomb-finance/types';
import config from '../config';

const useStatsForWine = (bank: Bank) => {
  const tombFinance = useTombFinance();

  const [poolAPRs, setPoolAPRs] = useState<PoolStatsWine>();

  const fetchAPRsForPool = useCallback(async () => {
    setPoolAPRs(await tombFinance.getPoolAPRsWine(bank));
  }, [tombFinance, bank]);

  useEffect(() => {
    fetchAPRsForPool().catch((err) => console.error(`Failed to fetch Partner price: ${err.stack}`));
    const refreshInterval = setInterval(fetchAPRsForPool, config.refreshInterval);
    return () => clearInterval(refreshInterval);
  }, [setPoolAPRs, tombFinance, fetchAPRsForPool]);

  return poolAPRs;
};

export default useStatsForWine;
