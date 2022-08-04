import { ethereum } from '@graphprotocol/graph-ts'
import { Sale } from '../../generated/schema'
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
