import { Address, BigDecimal } from '@graphprotocol/graph-ts'
import { Account } from '../../generated/schema'
import GlobalConstants from '../utils'

export function getOrCreateAccount(address: Address): Account {
	let id = address.toHexString()
	let account = Account.load(id)
	if (!account) {
		account = new Account(id)
		account.numberOfSales = GlobalConstants.BI_ZERO
		account.numberOfPurchases = GlobalConstants.BI_ZERO
		account.totalSpent = GlobalConstants.BD_ZERO
		account.totalEarned = GlobalConstants.BD_ZERO

		//account.nftOwnedAndCollection = new Array<string>()

		account.save()
	}

	return account as Account
}

export function updateSellerAggregates(
	seller: Account,
	price: BigDecimal
): void {
	seller.numberOfSales = seller.numberOfPurchases.plus(GlobalConstants.BI_ONE)
	seller.totalEarned = seller.totalEarned.plus(price)
}

export function updateBuyerAggregates(buyer: Account, price: BigDecimal): void {
	buyer.totalSpent = buyer.totalSpent.plus(price)
	buyer.numberOfPurchases = buyer.numberOfPurchases.plus(GlobalConstants.BI_ONE)
}
