import { Address } from '@graphprotocol/graph-ts'
import { Token } from '../../generated/schema'
import { BI_ONE } from '../constant'
import { PaymentTokens } from '../utils'

export function getOrCreateToken(tokenAddress: Address): Token {
	let token = Token.load(tokenAddress.toHexString())
	if (!token) {
		token = new Token(tokenAddress.toHexString())
		token.name = PaymentTokens.get(tokenAddress.toHexString())
		token.address = tokenAddress
		token.numberOfSales = BI_ONE
	}
	return token as Token
}
