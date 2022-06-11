import { Address, ethereum } from '@graphprotocol/graph-ts'
import { Sale, Token } from '../../generated/schema'
import { getGlobalId, PaymentTokens } from '../utils'

export function getOrCreateSale(token: Token, event: ethereum.Event): Sale {
	let sale = Sale.load(getGlobalId(event))
	if (!sale) {
		sale = new Sale(getGlobalId(event))
		sale.paymentToken = token.id
		sale.timestamp = event.block.timestamp
		sale.txHash = event.transaction.hash
		sale.blockHash = event.block.hash
		sale.logNumber = event.logIndex
		sale.blockNumber = event.block.number
		sale.eventType = 'SALE'
	}
	return sale as Sale
}
