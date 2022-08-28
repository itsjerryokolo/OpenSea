import { Address } from '@graphprotocol/graph-ts'
import { PaymentToken } from '../../generated/schema'
import GlobalConstants from '../utils'

export function getOrCreatePaymentToken(tokenAddress: Address): PaymentToken {
	let token = PaymentToken.load(tokenAddress.toHexString())
	if (!token) {
		token = new PaymentToken(tokenAddress.toHexString())
		//	token.symbol = PaymentTokens.get(tokenAddress.toHexString())
		token.address = tokenAddress.toHexString()
		token.numberOfSales = GlobalConstants.BI_ZERO
	}
	return token as PaymentToken
}
