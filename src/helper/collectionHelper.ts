import { BigInt, ethereum } from '@graphprotocol/graph-ts'
import { OpenSea } from '../../generated/OpenSea/OpenSea'
import { ERC721 } from '../../generated/OpenSea/ERC721'
import { Account, Collection, Nft } from '../../generated/schema'
import GlobalConstants from '../utils'

export function getOrCreateCollection(id: string): Collection {
	let collection = Collection.load(id)

	if (!collection) {
		collection = new Collection(id)
		collection.totalSupply = GlobalConstants.BI_ZERO
		collection.totalSales = GlobalConstants.BI_ZERO
		collection.numberOfSales = GlobalConstants.BI_ZERO

		// let collectionCall = ERC721.bind(Address.fromString(id))
		// collection.name = collectionCall._name
	}

	return collection
}

export function updateCollection(
	collection: Collection,
	buyer: Account,
	price: BigInt,
	nft: Nft,
	receipt: ethereum.TransactionReceipt
): void {
	collection.owner = buyer.id
	collection.numberOfSales = collection.numberOfSales.plus(
		GlobalConstants.BI_ONE
	)
	collection.totalSales = collection.totalSales.plus(price)
	collection.tokenId = BigInt.fromString(nft.id)
	collection.nft = nft.id
	collection.gasUsed = receipt.cumulativeGasUsed
}
