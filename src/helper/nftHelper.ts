import { Address, BigInt } from '@graphprotocol/graph-ts'
import { Account, Collection, Nft, Sale } from '../../generated/schema'
import GlobalConstants from '../utils'

export function getOrCreateNft(
	tokenId: BigInt,
	collection: Collection,
	owner: Address
): Nft {
	let nft = Nft.load(collection.id.concat('-').concat(tokenId.toString()))
	if (!nft) {
		nft = new Nft(collection.id.concat('-').concat(tokenId.toString()))
		nft.tokenID = tokenId
		nft.owner = owner.toHexString()
		nft.numberOfSales = GlobalConstants.BI_ZERO
	}
	return nft
}

export function updateNftMetrics(
	buyer: Account,
	sale: Sale,
	tokenId: BigInt,
	collection: Collection,
	nft: Nft
): void {
	nft.owner = buyer.id
	nft.sale = sale.id
	nft.tokenID = tokenId
	nft.collection = collection.id
	nft.numberOfSales = nft.numberOfSales.plus(GlobalConstants.BI_ONE)
}
