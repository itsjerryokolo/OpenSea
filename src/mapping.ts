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
import { BI_ONE, Tokens } from './constant'

const WETH = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'
const USDC = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'
const USDT = '0xdAC17F958D2ee523a2206206994597C13D831ec7'
const DAI = '0x6B175474E89094C44Da98b954EedeAC495271d0F'

//set of 3: REGULAR TRANSFER: https://etherscan.io/tx/0x9660bd19edec4f443068094d3ee9cf2c9b78fbc4a7888bb1a98d154a98041d0a#eventlog

export function handleOrdersMatched(event: OrdersMatched): void {
	//Transfer
	// let transferFrom = event.receipt.logs[1].topics[2].toHexString()
	// let transferTo = event.receipt.logs[1].topics[2].toHexString()

	let buyHash = event.params.buyHash
	let sellHash = event.params.sellHash
	let price = event.params.price
	let maker = event.params.maker
	let taker = event.params.taker
	let contractAddress = Tokens.GALAKTIC_GANG
	let receipt = event.receipt

	if (receipt !== null) {
		let logs = event.receipt!.logs
		for (let i = 0; i < logs.length; i++) {
			//OrderMatched

			let curr = logs[i]
			let topic = ethereum.decode('(address)', curr.topics[0])!

			if (
				topic.toAddress().toHexString() ==
				'0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'
			) {
				let tokenID = ethereum.decode('(uint256)', curr.topics[3])!
				let from = ethereum.decode('(address)', curr.topics[1])!
				let to = ethereum.decode('(address)', curr.topics[2])!

				if (
					tokenID.toBigInt().toString() &&
					from.toAddress().toHexString() &&
					to.toAddress().toHexString()
				) {
					// let paymentToken = getOrCreatePaymentToken(
					// 	Address.fromHexString(ZERO_ADDRESS)
					// )
					let buyer = getOrCreateAccount(maker)
					let seller = getOrCreateAccount(taker)

					let collection = getOrCreateCollection(contractAddress.toString())

					let nft = getOrCreateNft(tokenID.toBigInt(), collection, maker)
					let sale = getOrCreateSale(event)
					log.debug('{}, {}, {}', [
						tokenID.toBigInt().toString(),
						from.toAddress().toHexString(),
						to.toAddress().toHexString(),
					])

					collection.owner = buyer.id
					collection.numberOfSales = collection.numberOfSales.plus(BI_ONE)
					collection.totalSales = collection.totalSales.plus(price)
					collection.tokenId = BigInt.fromString(tokenID.toBigInt().toString())
					collection.nft = nft.id
					collection.gasUsed = receipt.cumulativeGasUsed

					// paymentToken.numberOfSales = paymentToken.numberOfSales.plus(BI_ONE)
					// paymentToken.address = ZERO_ADDRESS

					nft.owner = buyer.id
					nft.sale = sale.id
					nft.tokenID = BigInt.fromString(tokenID.toBigInt().toString())
					nft.collection = collection.id
					nft.numberOfSales = nft.numberOfSales.plus(BI_ONE)

					seller.numberOfSales = seller.numberOfPurchases.plus(BI_ONE)
					seller.totalEarned = seller.totalEarned.plus(price)

					buyer.totalSpent = buyer.totalSpent.plus(price)
					buyer.numberOfPurchases = buyer.numberOfPurchases.plus(BI_ONE)

					sale.buyHash = buyHash
					sale.sellHash = sellHash
					// sale.paymentToken = paymentToken.id
					sale.seller = seller.id
					sale.buyer = buyer.id
					sale.price = price
					sale.collection = collection.id

					sale.save()
					buyer.save()
					seller.save()
					collection.save()
					// paymentToken.save()
					nft.save()
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
