import { ethereum, TypedMap, Address } from '@graphprotocol/graph-ts'
import { Collection } from '../generated/schema'

export function getGlobalId(event: ethereum.Event): string {
	let globalId = event.transaction.hash
		.toHexString()
		.concat('-')
		.concat(event.logIndex.toString())
	return globalId
}
