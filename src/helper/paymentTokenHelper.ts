import { Address, BigDecimal } from '@graphprotocol/graph-ts'
import { PaymentToken } from '../../generated/schema'
import GlobalConstants from '../utils'

export function getOrCreatePaymentToken(tokenAddress: Address): PaymentToken {
	let token = PaymentToken.load(tokenAddress.toHexString())
	if (!token) {
		token = new PaymentToken(tokenAddress.toHexString())
		token.symbol = GlobalConstants.symbols(tokenAddress.toHexString())
		token.address = tokenAddress.toHexString()
		token.numberOfSales = GlobalConstants.BI_ZERO
		token.totalSalesByToken = GlobalConstants.BD_ZERO
	}
	return token as PaymentToken
}

export function updatePaymentTokenAggregates(
	token: PaymentToken,
	price: BigDecimal
): void {
	token.numberOfSales = token.numberOfSales.plus(GlobalConstants.BI_ONE)
	token.totalSalesByToken = token.totalSalesByToken.plus(price)
}
