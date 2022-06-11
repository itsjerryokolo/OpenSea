import { ethereum, TypedMap } from '@graphprotocol/graph-ts'

export function getGlobalId(event: ethereum.Event): string {
	let globalId = event.transaction.hash
		.toHexString()
		.concat('-')
		.concat(event.logIndex.toString())
	return globalId
}

export let PaymentTokens = new TypedMap<string, string>()
PaymentTokens.set('0x0000000000000000000000000000000000000000', 'ETH')
PaymentTokens.set('0x0000000000000000000000000000000000000001', 'WETH')
PaymentTokens.set('0x0000000000000000000000000000000000000002', 'DAI')
PaymentTokens.set('0x0000000000000000000000000000000000000003', 'USDC')
