import { Address, BigInt, ethereum } from '@graphprotocol/graph-ts'
import { Nft } from '../../generated/schema'
import { BI_ZERO } from '../constant'

export function getOrCreateNft(
	tokenId: BigInt,
	event: ethereum.Event,
	owner: Address
): Nft {
	let nft = new Nft(event.address.toString().concat(tokenId.toString()))
	nft.tokenID = tokenId
	nft.owner = owner.toHexString()
	nft.numberOfTransfers = BI_ZERO
	nft.numberOfSales = BI_ZERO
	//nft.numberOfAuctions = BI_ZERO

	return nft as Nft
}

// export function updatePunkSaleAggregates(punk: Punk, price: BigInt): void {
// 	//Update punk aggregates
// 	punk.totalAmountSpentOnPunk = punk.totalAmountSpentOnPunk.plus(price)
// 	punk.numberOfSales = punk.numberOfSales.plus(BIGINT_ONE)

// 	//We only calculate average sale price if there are more than 0 sales so we don't divide by 0
// 	if (punk.numberOfSales != BIGINT_ZERO) {
// 		punk.averageSalePrice = calculateAverage(
// 			punk.totalAmountSpentOnPunk,
// 			punk.numberOfSales
// 		)
// 	}
// }

// export function updatePunkOwner(punk: Punk, toAccount: Address): void {
// 	//Update Punk entity
// 	punk.purchasedBy = toAccount.toHexString()
// 	punk.owner = toAccount.toHexString()
// }
