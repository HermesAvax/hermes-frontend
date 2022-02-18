import { useCallback, useState, useEffect } from 'react';
import useTombFinance from './useTombFinance';
import { PoolStats } from '../tomb-finance/types';
import config from '../config';

const useStatsForWine = () => {
  const tombFinance = useTombFinance();

  const [poolAPRs, setPoolAPRs] = useState<PoolStats>();

  const fetchAPRsForPool = useCallback(async () => {
    setPoolAPRs(await tombFinance.getPoolAPRsWine());
  }, [tombFinance]);

  useEffect(() => {
    fetchAPRsForPool().catch((err) => console.error(`Failed to fetch HBOND price: ${err.stack}`));
    const refreshInterval = setInterval(fetchAPRsForPool, config.refreshInterval);
    return () => clearInterval(refreshInterval);
  }, [setPoolAPRs, tombFinance, fetchAPRsForPool]);

  return poolAPRs;
};

export default useStatsForWine;
