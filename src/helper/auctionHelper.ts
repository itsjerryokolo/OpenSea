import { Address, ethereum } from '@graphprotocol/graph-ts'
import { Auction } from '../../generated/schema'

export function getOrCreateAuction(
	hash: Address,
	event: ethereum.Event
): Auction {
	let auction = Auction.load(hash.toHexString())
	if (!auction) {
		auction = new Auction(hash.toHexString())
		auction.timestamp = event.block.timestamp
		auction.txHash = event.transaction.hash
		auction.blockHash = event.block.hash
		auction.logNumber = event.logIndex
		auction.blockNumber = event.block.number
		auction.eventType = 'AUCTION'
	}
	return auction as Auction
}
