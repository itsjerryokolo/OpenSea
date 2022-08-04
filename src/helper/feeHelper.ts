import { Address, ethereum } from '@graphprotocol/graph-ts'
import { Fee } from '../../generated/schema'
import GlobalConstants from '../utils'

export function getOrCreateFee(event: ethereum.Event): Fee {
	let fee = Fee.load(GlobalConstants.globalId(event))
	if (!fee) {
		fee = new Fee(GlobalConstants.globalId(event))
		fee.timestamp = event.block.timestamp
		fee.txHash = event.transaction.hash
		fee.blockHash = event.block.hash
		fee.logNumber = event.logIndex
		fee.blockNumber = event.block.number
		fee.eventType = 'FEE'
	}
	return fee as Fee
}
