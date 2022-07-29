import { Address } from '@graphprotocol/graph-ts'
import { PaymentToken } from '../../generated/schema'
import { BI_ONE, BI_ZERO } from '../constant'

export function getOrCreatePaymentToken(tokenAddress: Address): PaymentToken {
	let token = PaymentToken.load(tokenAddress.toHexString())
	if (!token) {
		token = new PaymentToken(tokenAddress.toHexString())
		//	token.symbol = PaymentTokens.get(tokenAddress.toHexString())
		token.address = tokenAddress.toHexString()
		token.numberOfSales = BI_ZERO
	}
	return token as PaymentToken
}
