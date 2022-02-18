// import { ChainId } from '@pancakeswap-libs/sdk';
import { ChainId } from '@traderjoe-xyz/sdk';
import { Configuration } from './tomb-finance/config';
import { BankInfo } from './tomb-finance';

const configurations: { [env: string]: Configuration } = {
  development: {
    chainId: ChainId.AVALANCHE,
    networkName: 'Avalanche C Chain',
    ftmscanUrl: 'https://snowtrace.io/',
    defaultProvider: 'https://api.avax.network/ext/bc/C/rpc',
    deployments: require('./tomb-finance/deployments/deployments.mainnet.json'),
    externalTokens: {
      WFTM: ['0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7', 18],
      FUSDT: ['0xa7d7079b0fead91f3e65f86e8915cb59c1a4c664', 6], // This is actually usdc on mainnet not fusdt
      WINE: ['0xC55036B5348CfB45a932481744645985010d3A44', 18],
      BOO: ['0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7', 18],
      ZOO: ['0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7', 0],
      SHIBA: ['0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7', 9],
      'USDT-FTM-LP': ['0xbd918ed441767fe7924e99f6a0e0b568ac1970d9', 18],
      'HERMES-AVAX-LP': ['0xC58cC1a0f29f1993D089681e4fA03c7f65dF1325', 18],
      'HSHARE-AVAX-LP': ['0xC132ff3813De33356C859979501fB212673e395e', 18],
      'HERMES-HSHARE-LP': ['0x1F13e2889cD0C356abb968A2641DebCEad08cA8E', 18],
      'HSHARE-WINE-LP': ['0x1F13e2889cD0C356abb968A2641DebCEad08cA8E', 18],
    },
    baseLaunchDate: new Date('2021-06-02 13:00:00Z'),
    bondLaunchesAt: new Date('2020-12-03T15:00:00Z'),
    masonryLaunchesAt: new Date('2020-12-11T00:00:00Z'),
    refreshInterval: 10000,
  },
  
  production: {
    chainId: ChainId.AVALANCHE,
    networkName: 'Avalanche C Chain',
    ftmscanUrl: 'https://snowtrace.io/',
    defaultProvider: 'https://api.avax.network/ext/bc/C/rpc',
    deployments: require('./tomb-finance/deployments/deployments.mainnet.json'),
    externalTokens: {
      WFTM: ['0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7', 18],
      FUSDT: ['0xa7d7079b0fead91f3e65f86e8915cb59c1a4c664', 6], // This is actually usdc on mainnet not fusdt
      WINE: ['0xC55036B5348CfB45a932481744645985010d3A44', 18],
      BOO: ['0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7', 18],
      ZOO: ['0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7', 0],
      SHIBA: ['0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7', 9],
      'USDT-FTM-LP': ['0xbd918ed441767fe7924e99f6a0e0b568ac1970d9', 18],
      'HERMES-AVAX-LP': ['0xC58cC1a0f29f1993D089681e4fA03c7f65dF1325', 18],
      'HSHARE-AVAX-LP': ['0xC132ff3813De33356C859979501fB212673e395e', 18],
      'HERMES-HSHARE-LP': ['0x1F13e2889cD0C356abb968A2641DebCEad08cA8E', 18],
      'HSHARE-WINE-LP': ['0x1F13e2889cD0C356abb968A2641DebCEad08cA8E', 18],
    },
    baseLaunchDate: new Date('2021-06-02 13:00:00Z'),
    bondLaunchesAt: new Date('2020-12-03T15:00:00Z'),
    masonryLaunchesAt: new Date('2020-12-11T00:00:00Z'),
    refreshInterval: 10000,
  },
};

export const bankDefinitions: { [contractName: string]: BankInfo } = {
  /*
  Explanation:
  name: description of the card
  poolId: the poolId assigned in the contract
  sectionInUI: way to distinguish in which of the 3 pool groups it should be listed
        - 0 = Single asset stake pools
        - 1 = LP asset staking rewarding TOMB
        - 2 = LP asset staking rewarding TSHARE
  contract: the contract name which will be loaded from the deployment.environmnet.json
  depositTokenName : the name of the token to be deposited
  earnTokenName: the rewarded token
  finished: will disable the pool on the UI if set to true
  sort: the order of the pool
  */
  HermesAvaxLPHShareRewardPool: {
    name: 'Earn HSHARE by HERMES-AVAX LP',
    poolId: 0,
    sectionInUI: 2,
    contract: 'HermesAvaxLPHShareRewardPool',
    depositTokenName: 'HERMES-AVAX-LP',
    earnTokenName: 'HSHARE',
    finished: false,
    sort: 6,
    closedForStaking: false,
  },
  HshareAvaxLPHShareRewardPool: {
    name: 'Earn HSHARE by HSHARE-AVAX LP',
    poolId: 1,
    sectionInUI: 2,
    contract: 'HshareAvaxLPHShareRewardPool',
    depositTokenName: 'HSHARE-AVAX-LP',
    earnTokenName: 'HSHARE',
    finished: false,
    sort: 7,
    closedForStaking: false,
  },
  HermesHshareLPHShareRewardPool: {
    name: 'Earn HSHARE by HERMES-HSHARE LP',
    poolId: 2,
    sectionInUI: 2,
    contract: 'HermesHshareLPHShareRewardPool',
    depositTokenName: 'HERMES-HSHARE-LP',
    earnTokenName: 'HSHARE',
    finished: false,
    sort: 8,
    closedForStaking: false,
  },
  HermesHShareLPHShareRewardPool: {
    name: 'Earn HSHARE by HERMES-HSHARE LP',
    poolId: 0,
    sectionInUI: 1,
    contract: 'HermesHShareLPHShareRewardPool',
    depositTokenName: 'HERMES-HSHARE-LP',
    earnTokenName: 'HSHARE',
    finished: false,
    sort: 8,
    closedForStaking: true,
  },
  PartnerRewardPool: {
    name: 'Earn HSHARE & WINE by HSHARE-WINE LP',
    poolId: 0,
    sectionInUI: 2,
    contract: 'PartnerRewardPool',
    depositTokenName: 'HSHARE-WINE-LP',
    earnTokenName: 'HSHARE',
    finished: false,
    sort: 8,
    closedForStaking: true,
  },
};

export default configurations[process.env.NODE_ENV || 'development'];
