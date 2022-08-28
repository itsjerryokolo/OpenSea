import { ethereum, log } from '@graphprotocol/graph-ts'
import {
	OpenSea,
	OrdersMatched,
	OrderApprovedPartOne,
	OrderApprovedPartTwo,
} from '../generated/OpenSea/OpenSea'
import {
	getOrCreateAccount,
	updateBuyerAggregates,
	updateSellerAggregates,
} from './helper/accountHelper'
import { getOrCreateAuction } from './helper/auctionHelper'
import {
	getOrCreateCollection,
	updateCollectionAggregates,
} from './helper/collectionHelper'
import { getOrCreateFee } from './helper/feeHelper'

import { getOrCreateNft, updateNftMetrics } from './helper/nftHelper'
import { getOrCreateSale, updateSale } from './helper/saleHelper'
import { getOrCreatePaymentToken } from './helper/paymentTokenHelper'
import GlobalConstants from './utils'
import { getOrCreateContract } from './helper/contractHelper'

//set of 3: REGULAR TRANSFER: https://etherscan.io/tx/0x9660bd19edec4f443068094d3ee9cf2c9b78fbc4a7888bb1a98d154a98041d0a#eventlog

export function handleOrdersMatched(event: OrdersMatched): void {
	let buyHash = event.params.buyHash
	let sellHash = event.params.sellHash
	let price = GlobalConstants.convertPriceToBigDecimal(event.params.price)
	let maker = event.params.maker
	let taker = event.params.taker

	let receipt = event.receipt

	if (receipt) {
		const eventLogs = receipt.logs
		if (eventLogs.length > 1) {
			log.warning('Log length {}', [receipt.logs.length.toString()])

			for (let index = 0; index < eventLogs.length; index++) {
				log.warning('Topics {}', [receipt.logs[index].topics.length.toString()])

				const _topic0 = receipt.logs[index].topics[0]
				const _topicsLength = eventLogs[index].topics.length
				const _address = receipt.logs[index].address

				if (
					_topicsLength == 4 &&
					_topic0.equals(GlobalConstants.TRANSFER_SIG)
				) {
					const _tokenID = eventLogs[index].topics[3]
					const tokenId = ethereum.decode('uin256', _tokenID)!.toBigInt()

					let buyer = getOrCreateAccount(maker)
					let seller = getOrCreateAccount(taker)
					let collection = getOrCreateCollection(_address.toHexString())
					let nft = getOrCreateNft(tokenId, collection, maker)
					let sale = getOrCreateSale(event)
					let contract = getOrCreateContract(event)

					updateCollectionAggregates(collection, buyer, price, nft)
					updateNftMetrics(buyer, sale, tokenId, collection, price, nft)
					updateSellerAggregates(seller, price)
					updateBuyerAggregates(buyer, price)
					updateSale(sale, buyHash, sellHash, buyer, seller, price, collection)

					buyer.save()
					seller.save()
					collection.save()
					nft.save()
					contract.save()
					sale.save()
				}
			}
		}
	}
}

export function handleOrderApprovedPartOne(event: OrderApprovedPartOne): void {
	let fee = getOrCreateFee(event)
	let collection = getOrCreateCollection(
		event.params.feeRecipient.toHexString()
	)

	fee.feeRecipient = collection.id
	fee.takerProtocolFee = event.params.takerProtocolFee
	fee.makerProtocolFee = event.params.makerProtocolFee
	fee.makerRelayerFee = event.params.makerRelayerFee
	fee.takerProtocolFee = event.params.takerRelayerFee

	fee.save()
}

export function handleOrderApprovedPartTwo(event: OrderApprovedPartTwo): void {
	let auction = getOrCreateAuction(event.params.hash.toHexString(), event)
	let paymentToken = getOrCreatePaymentToken(event.params.paymentToken)

	auction.listingTime = event.params.listingTime
	auction.basePrice = event.params.basePrice
	auction.expirationTime = event.params.expirationTime
	auction.paymentToken = paymentToken.id
	auction.staticExtraData = event.params.staticExtradata
	auction.extra = event.params.extra
	auction.hash = event.params.hash
	auction.orderbook = event.params.orderbookInclusionDesired

	auction.save()
	paymentToken.save()
}
