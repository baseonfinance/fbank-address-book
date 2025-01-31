import {schema, TokenInfo, TokenList} from '@uniswap/token-lists';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import {ReserveData} from '../configs/types';
import {readFileSync, existsSync, writeFileSync} from 'fs';
import {cwd} from 'process';
import {join} from 'path';
import prettier from 'prettier';
import {Address, getContract, Hex, zeroAddress} from 'viem';
import {IERC20Detailed_ABI} from '../../src/ts/abis/IERC20Detailed';
import {CHAIN_ID_CLIENT_MAP} from '@bgd-labs/js-utils';
import {fixSymbol} from './assetsLibraryGenerator';

const TAGS = {
  underlying: 'underlying',
  aaveV2: 'aaveV2',
  aTokenV2: 'aTokenV2',
  aaveV3: 'aaveV3',
  aTokenV3: 'aTokenV3',
  stataToken: 'stataToken',
} as const;

type TokenListParams = {
  name: string;
  pool: Hex;
  chainId: number;
  reservesData: ReserveData[];
}[];

function findInList(tokens: TokenInfo[], address: Address, chainId: number) {
  return tokens.find((x) => x.address === address && x.chainId === chainId);
}

export async function generateTokenList(pools: TokenListParams) {
  const path = join(cwd(), 'tokenlist.json');
  const cachedList: TokenList = existsSync(path)
    ? JSON.parse(readFileSync(path, 'utf-8'))
    : {tokens: []};

  const tokens: TokenInfo[] = [];
  for (const {reservesData, chainId, name: poolName, pool} of pools) {
    for (const reserve of reservesData) {
      async function addToken(token: Address, tags: string[], extensions?: Record<string, string>) {
        const alreadyInList = findInList(tokens, token, chainId);
        if (alreadyInList) return;
        const cache = findInList(cachedList.tokens, token, chainId);
        if (cache) return tokens.push(cache);
        else {
          const erc20contract = getContract({
            abi: IERC20Detailed_ABI,
            address: token,
            client: CHAIN_ID_CLIENT_MAP[chainId],
          });
          const [name, symbol] =
            token == '0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2'
              ? ['Maker', 'MKR']
              : await Promise.all([erc20contract.read.name(), erc20contract.read.symbol()]);
          return tokens.push({
            chainId: chainId,
            address: token,
            name: name.length > 40 ? `${name.substring(0, 37)}...` : name, // schema limits to 40 characters
            decimals: reserve.decimals,
            symbol: fixSymbol(symbol, token),
            tags,
            ...(extensions ? {extensions} : {}),
          });
        }
      }
      await addToken(reserve.UNDERLYING, [TAGS.underlying]);
      await addToken(
        reserve.A_TOKEN,
        /V2/.test(poolName) ? [TAGS.aTokenV2, TAGS.aaveV2] : [TAGS.aTokenV3, TAGS.aaveV3],
        {pool: pool, underlying: reserve.UNDERLYING},
      );
      if (reserve.STATA_TOKEN && reserve.STATA_TOKEN != zeroAddress)
        await addToken(
          reserve.STATA_TOKEN,
          [/V2/.test(poolName) ? TAGS.aaveV3 : TAGS.aaveV3, TAGS.stataToken],
          {
            pool: pool,
            underlying: reserve.UNDERLYING,
            underlyingAToken: reserve.A_TOKEN,
          },
        );
    }
  }

  if (cachedList.tokens.length === tokens.length) return;
  const tokenList: TokenList = {
    name: 'Aave token list',
    logoURI: 'ipfs://QmWzL3TSmkMhbqGBEwyeFyWVvLmEo3F44HBMFnmTUiTfp1',
    keywords: ['audited', 'verified', 'aave'],

    tags: {
      [TAGS.underlying]: {
        name: 'underlyingAsset',
        description: 'Tokens that are used as underlying assets in the Aave protocol',
      },
      [TAGS.aaveV2]: {
        name: 'Aave V2',
        description: 'Tokens related to aave v2',
      },
      [TAGS.aaveV3]: {
        name: 'Aave V3',
        description: 'Tokens related to aave v3',
      },
      [TAGS.aTokenV2]: {
        name: 'aToken V2',
        description: 'Tokens that earn interest on the Aave Protocol V2',
      },
      [TAGS.aTokenV3]: {
        name: 'aToken V3',
        description: 'Tokens that earn interest on the Aave Protocol V3',
      },
      [TAGS.stataToken]: {
        name: 'static a token',
        description: 'Tokens that are wrapped into a 4626 Vault',
      },
    },
    timestamp: new Date().toISOString(),
    version: {
      major: 3,
      minor: 0,
      patch: cachedList.version?.patch != undefined ? cachedList.version.patch + 1 : 0,
    },
    tokens,
  };

  const ajv = new Ajv({allErrors: true, verbose: true});
  addFormats(ajv);
  const validator = ajv.compile(schema);
  const valid = validator(tokenList);
  if (valid) {
    writeFileSync(
      path,
      await prettier.format(JSON.stringify(tokenList), {
        filepath: path,
      }),
    );
  }
  if (validator.errors) {
    console.log(validator.errors);
    throw new Error('error creating tokenlist');
  }
}
