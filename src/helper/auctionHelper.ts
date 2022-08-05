import { ethereum } from '@graphprotocol/graph-ts'
import { Auction } from '../../generated/schema'

export function getOrCreateAuction(
	hash: string,
	event: ethereum.Event
): Auction {
	let auction = Auction.load(hash)
	if (!auction) {
		auction = new Auction(hash)
		auction.timestamp = event.block.timestamp
		auction.txHash = event.transaction.hash
		auction.blockHash = event.block.hash
		auction.logNumber = event.logIndex
		auction.blockNumber = event.block.number
		auction.eventType = 'AUCTION'
	}
	return auction as Auction
}
