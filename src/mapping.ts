import {
	Address,
	crypto,
	log,
	ethereum,
	ByteArray,
	BigInt,
	Bytes,
} from '@graphprotocol/graph-ts'
import {
	OpenSea,
	OrdersMatched,
	OrderApprovedPartOne,
	OrderApprovedPartTwo,
} from '../generated/OpenSea/OpenSea'
import { getOrCreateAccount } from './helper/accountHelper'
import { getOrCreateAuction } from './helper/auctionHelper'
import { getOrCreateCollection } from './helper/collectionHelper'
import { getOrCreateFee } from './helper/feeHelper'
import { getOrCreateNft } from './helper/nftHelper'
import { getOrCreateSale } from './helper/saleHelper'
import { getOrCreatePaymentToken } from './helper/paymentTokenHelper'
import GlobalConstants from './utils'

const WETH = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'
const USDC = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'
const USDT = '0xdAC17F958D2ee523a2206206994597C13D831ec7'
const DAI = '0x6B175474E89094C44Da98b954EedeAC495271d0F'

//set of 3: REGULAR TRANSFER: https://etherscan.io/tx/0x9660bd19edec4f443068094d3ee9cf2c9b78fbc4a7888bb1a98d154a98041d0a#eventlog

export function handleOrdersMatched(event: OrdersMatched): void {
	let buyHash = event.params.buyHash
	let sellHash = event.params.sellHash
	let price = event.params.price
	let maker = event.params.maker
	let taker = event.params.taker

	let receipt = event.receipt

	if (receipt) {
		for (let index = 0; index < receipt.logs.length; index++) {
			const _topic0_identifier = Bytes.fromHexString(
				'0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef' // This is identifier of the Transfer
			)
			const _topic0 = receipt.logs[index].topics[0]
			const _address = receipt.logs[index].address

			if (_topic0.equals(_topic0_identifier)) {
				const _tokenID = receipt.logs[index].topics[3]
				const tokenId = ethereum.decode('uin256', _tokenID)!.toBigInt()

				let buyer = getOrCreateAccount(maker)
				let seller = getOrCreateAccount(taker)
				let collection = getOrCreateCollection(_address.toHexString())
				let nft = getOrCreateNft(tokenId, collection, maker)
				let sale = getOrCreateSale(event)

				collection.owner = buyer.id
				collection.numberOfSales = collection.numberOfSales.plus(
					GlobalConstants.BI_ONE
				)
				collection.totalSales = collection.totalSales.plus(price)
				collection.tokenId = tokenId
				collection.nft = nft.id
				collection.gasUsed = receipt.cumulativeGasUsed

				nft.owner = buyer.id
				nft.sale = sale.id
				nft.tokenID = tokenId
				nft.collection = collection.id
				nft.numberOfSales = nft.numberOfSales.plus(GlobalConstants.BI_ONE)

				seller.numberOfSales = seller.numberOfPurchases.plus(
					GlobalConstants.BI_ONE
				)
				seller.totalEarned = seller.totalEarned.plus(price)

				buyer.totalSpent = buyer.totalSpent.plus(price)
				buyer.numberOfPurchases = buyer.numberOfPurchases.plus(
					GlobalConstants.BI_ONE
				)

				sale.buyHash = buyHash
				sale.sellHash = sellHash
				sale.seller = seller.id
				sale.buyer = buyer.id
				sale.price = price
				sale.collection = collection.id

				buyer.save()
				seller.save()
				collection.save()
				nft.save()
				sale.save()
			}
		}
	}
}
//}

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
