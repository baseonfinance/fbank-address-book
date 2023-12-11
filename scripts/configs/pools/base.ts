import {ChainId} from '../../generator/chains';
import {PoolConfig} from '../types';

export const baseProtoV3: PoolConfig = {
  name: 'Base',
  chainId: ChainId.base,
  POOL_ADDRESSES_PROVIDER: '0xe20fCBdBfFC4Dd138cE8b2E6FBb6CB49777ad64D',
  additionalAddresses: {
    CAPS_PLUS_RISK_STEWARD: '0x12DEB4025b79f2B43f6aeF079F9D77C3f9a67bb6',
    FREEZING_STEWARD: '0x4A4c73d563395ad827511F70097d4Ef82E653805',
    DEBT_SWAP_ADAPTER: '0x5f4d15d761528c57a5C30c43c1DAb26Fc5452731',
    WITHDRAW_SWAP_ADAPTER: '0x5598BbFA2f4fE8151f45bBA0a3edE1b54B51a0a9',
    SWAP_COLLATERAL_ADAPTER: '0x2E549104c516b8657A7D888494DfbAbD7C70b464',
    REPAY_WITH_COLLATERAL_ADAPTER: '0x78F8Bd884C3D738B74B420540659c82f392820e0',
    STATIC_A_TOKEN_FACTORY: '0x940F9a5d5F9ED264990D0eaee1F3DD60B4Cb9A22',
    CONFIG_ENGINE: '0xc7751400F809cdB0C167F87985083C558a0610F7',
    RATES_FACTORY: '0x0D1Fe8eAdb0a3e44C4Cc9D73De8dA50C1E475832',
    L2_ENCODER: '0x39e97c588B2907Fb67F44fea256Ae3BA064207C5',
    POOL_ADDRESSES_PROVIDER_REGISTRY: '0x2f6571d3Eb9a4e350C68C36bCD2afe39530078E2',
    UI_INCENTIVE_DATA_PROVIDER: '0xEdD3b4737C1a0011626631a977b91Cf3E944982d',
    UI_POOL_DATA_PROVIDER: '0x174446a6741300cD2E7C1b1A636Fee99c8F83502',
    WALLET_BALANCE_PROVIDER: '0x5779b29B0a34577d927E8D511B595ef9abbFAE82',
    WETH_GATEWAY: '0x398808Db36da6BA4e30d4Fb88d72c3473921bC6e',
  },
};
