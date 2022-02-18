import { useEffect, useState } from 'react';
import useTombFinance from './useTombFinance';
import { LPStat } from '../tomb-finance/types';
import useRefresh from './useRefresh';

const useLpStats3 = (lpTicker: string) => {
  const [stat, setStat] = useState<LPStat>();
  const { slowRefresh } = useRefresh();
  const tombFinance = useTombFinance();

  useEffect(() => {
    async function fetchLpPrice() {
      try{
        setStat(await tombFinance.getLPStat3(lpTicker));
      }
      catch(err){
        console.error(err);
      }
    }
    fetchLpPrice();
  }, [setStat, tombFinance, slowRefresh, lpTicker]);

  return stat;
};

export default useLpStats3;
