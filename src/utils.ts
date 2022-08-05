import { ethereum, BigInt } from '@graphprotocol/graph-ts'

export default class GlobalConstants {
	constructor() {}

	static get ZERO_ADDRESS(): string {
		return '0x0000000000000000000000000000000000000000'
	}

	static get BI_ZERO(): BigInt {
		return BigInt.fromI32(0)
	}

	static get BI_ONE(): BigInt {
		return BigInt.fromI32(1)
	}

	static globalId(event: ethereum.Event): string {
		let id = event.transaction.hash
			.toHexString()
			.concat('-')
			.concat(event.logIndex.toString())
		return id
	}
}
