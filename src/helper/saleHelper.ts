import { BigDecimal, Bytes, ethereum } from '@graphprotocol/graph-ts'
import { Account, Collection, Sale } from '../../generated/schema'
import GlobalConstants from '../utils'

export function getOrCreateSale(event: ethereum.Event): Sale {
	let sale = Sale.load(GlobalConstants.globalId(event))
	if (!sale) {
		sale = new Sale(GlobalConstants.globalId(event))
		sale.timestamp = event.block.timestamp
		sale.txHash = event.transaction.hash
		sale.blockHash = event.block.hash
		sale.logNumber = event.logIndex
		sale.blockNumber = event.block.number
		sale.eventType = 'SALE'
	}
	return sale as Sale
}

export function updateSale(
	sale: Sale,
	buyHash: Bytes,
	sellHash: Bytes,
	buyer: Account,
	seller: Account,
	price: BigDecimal,
	collection: Collection
): void {
	sale.buyHash = buyHash
	sale.sellHash = sellHash
	sale.seller = seller.id
	sale.buyer = buyer.id
	sale.price = price
	sale.collection = collection.id
}
