import { ethereum, Bytes, Address } from '@graphprotocol/graph-ts'

export default class GlobalConstants {
	constructor() {}

	static get id(): string {
		return '0x06b306c85e5f33b1b2d971822ce0ed42fb7ab9a1'
	}

	static globalId(event: ethereum.Event): string {
		let id = event.transaction.hash
			.toHexString()
			.concat('-')
			.concat(event.logIndex.toString())
		return id
	}

	static get COSMIC_LAB(): string {
		return '0x96316355c44Be69414756D6706c61E61aECbD5f3'
	}

	static get AZUKI(): string {
		return '0x2eb6be120eF111553F768FcD509B6368e82D1661'
	}

	static get GALAKTIC_GANG(): string {
		return '0xf4cd7e65348deb24e30dedee639c4936ae38b763'
	}

	static add<BigInt>(a, b): BigInt {
		return a + b
	}

	static changetype<T>(a): T {
		return a
	}

	static decode(tupleArray: ethereum.Value[]): string {
		let tuple = GlobalConstants.changetype<ethereum.Tuple>(tupleArray)
		let encoded = ethereum.encode(ethereum.Value.fromTuple(tuple))!
		return encoded.toHexString()
	}
}
