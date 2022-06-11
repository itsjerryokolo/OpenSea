import { Address, BigInt, ethereum } from '@graphprotocol/graph-ts'
import { OpenSea } from '../../generated/OpenSea/OpenSea'
import { Collection } from '../../generated/schema'
import { BI_ONE, BI_ZERO } from '../../src/constant'
export function getOrCreateCollection(id: Address): Collection {
	let collection = Collection.load(id.toHexString())
	if (!collection) {
		collection = new Collection(id.toHexString())
		collection.totalSupply = BI_ZERO
		collection.totalVolume = BI_ZERO

		/**
		 * @Todo
		 *    - Figure out contract calls.
		 *    - One Mega ABI, or multiple contract ABIs
		 * 		let opensea = OpenSea.bind(id)
		 */
	}

	collection.tokenId = ''
	collection.account = ''

	return collection
}
