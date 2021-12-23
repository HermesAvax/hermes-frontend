// import { ChainId } from '@pancakeswap-libs/sdk';
import { ChainId } from '@traderjoe-xyz/sdk';
import { Configuration } from './tomb-finance/config';
import { BankInfo } from './tomb-finance';

const configurations: { [env: string]: Configuration } = {
  development: {
    chainId: ChainId.FUJI,
    networkName: 'Avalanche Fuji Testnet',
    ftmscanUrl: 'https://testnet.snowtrace.io/',
    defaultProvider: 'https://api.avax-test.network/ext/bc/C/rpc',
    deployments: require('./tomb-finance/deployments/deployments.testing.json'),
    externalTokens: {
      WFTM: ['0xd00ae08403b9bbb9124bb305c09058e32c39a48c', 18],
      FUSDT: ['0x8e58A291d094824f68C8fbbf038370CBDe9015d1', 6],
      BOO: ['0xd00ae08403b9bbb9124bb305c09058e32c39a48c', 18],
      ZOO: ['0xd00ae08403b9bbb9124bb305c09058e32c39a48c', 0],
      SHIBA: ['0xd00ae08403b9bbb9124bb305c09058e32c39a48c', 9],
      'USDT-FTM-LP': ['0x974ff949F233D52e8617C2F4C0d2D8dF386df7F0', 18],
      'HERMES-AVAX-LP': ['0x3336300120b693c9d807d1C8E8Cb8059594cfB8f', 18],
      'HSHARE-AVAX-LP': ['0x431865a482A49B3f3b82226b39A4dEEcc7F2f201', 18],
    },
    baseLaunchDate: new Date('2021-06-02 13:00:00Z'),
    bondLaunchesAt: new Date('2020-12-03T15:00:00Z'),
    masonryLaunchesAt: new Date('2020-12-11T00:00:00Z'),
    refreshInterval: 10000,
  },
  production: {
    chainId: ChainId.AVALANCHE,
    networkName: 'Avalanche Mainnet',
    ftmscanUrl: 'https://snowtrace.io/',
    defaultProvider: 'https://api.avax.network/ext/bc/C/rpc',
    deployments: require('./tomb-finance/deployments/deployments.mainnet.json'),
    externalTokens: {
      WFTM: ['0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7', 18],
      FUSDT: ['0xc7198437980c041c805a1edcba50c1ce5db95118', 6], // This is actually usdc on mainnet not fusdt
      BOO: ['0x841FAD6EAe12c286d1Fd18d1d525DFfA75C7EFFE', 18],
      ZOO: ['0x09e145a1d53c0045f41aeef25d8ff982ae74dd56', 0],
      SHIBA: ['0x9ba3e4f84a34df4e08c112e1a0ff148b81655615', 9],
      'USDT-FTM-LP': ['0x2b4C76d0dc16BE1C31D4C1DC53bF9B45987Fc75c', 18],
      'HERMES-AVAX-LP': ['0x2A651563C9d3Af67aE0388a5c8F89b867038089e', 18],
      'HSHARE-AVAX-LP': ['0x4733bc45eF91cF7CcEcaeeDb794727075fB209F2', 18],
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
};

export default configurations[process.env.NODE_ENV || 'development'];
