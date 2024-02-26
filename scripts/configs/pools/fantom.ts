import {ChainId} from '@bgd-labs/js-utils';
import {PoolConfig} from '../types';

export const fantomTestnetProtoV3: PoolConfig = {
  name: 'FantomTestnet',
  chainId: ChainId.fantom_testnet,
  POOL_ADDRESSES_PROVIDER: '0xBe8d95E9e8F6B852371b21dc3Ce36CF9440a64C0',
  additionalAddresses: {
    FAUCET: '0xb78F1d73EDF017f236b7617EE3b0159873962447',
    UI_INCENTIVE_DATA_PROVIDER: '0xBE3aC3487AA875d16FDE1204337175e7e85dD0A6',
    UI_POOL_DATA_PROVIDER: '0x8F505faa8cbF0a8D1a65c21534C96bCbE8521B97',
    WALLET_BALANCE_PROVIDER: '0xD746946f53cDcCDEE8e993E29EA257BE366649d1',
    WETH_GATEWAY: '0x201891DF02d3098C9dD051CC01ae3a8Ce48fe016',
  },
};

export const fantomProtoV3: PoolConfig = {
  name: 'Fantom',
  chainId: ChainId.fantom,
  POOL_ADDRESSES_PROVIDER: '0xa97684ead0e402dC232d5A977953DF7ECBaB3CDb',
  additionalAddresses: {
    POOL_ADDRESSES_PROVIDER_REGISTRY: '0x770ef9f4fe897e59daCc474EF11238303F9552b6',
    REPAY_WITH_COLLATERAL_ADAPTER: '0x1408401B2A7E28cB747b3e258D0831Fc926bAC51',
    SWAP_COLLATERAL_ADAPTER: '0xE387c6053CE8EC9f8C3fa5cE085Af73114a695d3',
    UI_INCENTIVE_DATA_PROVIDER: '0x67Da261c14fd94cE7fDd77a0A8476E5b244089A9',
    UI_POOL_DATA_PROVIDER: '0xddf65434502E459C22263BE2ed7cF0f1FaFD44c0',
    WALLET_BALANCE_PROVIDER: '0xBc790382B3686abffE4be14A030A96aC6154023a',
    WETH_GATEWAY: '0x1DcDA4de2Bf6c7AD9a34788D22aE6b7d55016e1f',
  },
};
