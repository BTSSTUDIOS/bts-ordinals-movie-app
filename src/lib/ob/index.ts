import { Ordinalsbot } from 'ordinalsbot';

const apiKey = process.env.NEXT_PUBLIC_ORDINALSBOT_API_KEY;
const network = (process.env.NEXT_PUBLIC_NETWORK || 'mainnet') as 'mainnet' | 'testnet';

if (!apiKey) {
  console.error('NEXT_PUBLIC_ORDINALSBOT_API_KEY is not set');
  throw new Error('NEXT_PUBLIC_ORDINALSBOT_API_KEY environment variable is not set');
}

console.log('Initializing Ordinalsbot with network:', network);

const ordinalsbotObj = new Ordinalsbot(apiKey, network);

export default ordinalsbotObj;