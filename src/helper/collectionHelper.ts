import { Address, TypedMap, BigInt, ethereum } from '@graphprotocol/graph-ts'
import { OpenSea } from '../../generated/OpenSea/OpenSea'
import { Account, Collection } from '../../generated/schema'
import { BI_ONE, BI_ZERO } from '../../src/constant'

// let MatchTokenToCollection = new TypedMap<string, string[]>()

export function getOrCreateCollection(id: string): Collection {
	let collection = Collection.load(id)

	if (!collection) {
		collection = new Collection(id)
		collection.totalSupply = BI_ZERO
		collection.totalSales = BI_ZERO
		collection.numberOfSales = BI_ZERO

		/**
		 * @Todo
		 *    - Figure out contract calls.
		 *    - One Mega ABI, or multiple contract ABIs
		 * 		let opensea = OpenSea.bind(id)
		 */
	}

	return collection
}
// export function createTypedMapCollection(
// 	collection: string,
// 	tokenId: BigInt,
// 	account: string
// ): void {
// 	MatchTokenToCollection.set(account, [collection, tokenId.toString()])
// }

// export function getTypedMapCollection(account: string): string[] {
// 	let x = MatchTokenToCollection.get(account)
// 	return x as string[]
// }
// // export function removeAccountSaleFromCollection(
// 	collection: Address,
// 	tokenId: BigInt,
// 	account: Address
// ): string[] {
// 	let MatchTokenToCollection = new TypedMap<string, string[]>()
// 	MatchTokenToCollection.set(account.toHexString(), [
// 		collection.toHexString(),
// 		tokenId.toString(),
// 	])

// 	let array = MatchTokenToCollection.get(account.toHexString())
// 	if (array !== null) {
// 		array.push(tokenId.toString())
// 	} else {
// 		array.push(collection.toHexString())
// 		array.push(tokenId.toString())
// 	}
// 	return array as string[]
// }
