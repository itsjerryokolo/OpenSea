import { Address, BigInt } from '@graphprotocol/graph-ts'
import { Collection, Nft } from '../../generated/schema'
import { BI_ZERO } from '../constant'

export function getOrCreateNft(
	tokenId: BigInt,
	collection: Collection,
	owner: Address
): Nft {
	let nft = new Nft(collection.id.concat('-').concat(tokenId.toString()))
	nft.tokenID = tokenId
	nft.owner = owner.toHexString()
	nft.numberOfSales = BI_ZERO
	//nft.numberOfAuctions = BI_ZERO

	return nft as Nft
}
