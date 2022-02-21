import { useEffect, useState } from 'react';
import useTombFinance from './useTombFinance';
import { TokenStat } from '../tomb-finance/types';
import useRefresh from './useRefresh';

const useWineStats = () => {
  const [stat, setStat] = useState<TokenStat>();
  const { slowRefresh } = useRefresh();
  const tombFinance = useTombFinance();

  useEffect(() => {
    async function fetchWinePrice() {
      try {
        setStat(await tombFinance.getWineStat());
      } catch(err){
        console.error(err)
      }
    }
    fetchWinePrice();
  }, [setStat, tombFinance, slowRefresh]);

  return stat;
};

export default useWineStats;
