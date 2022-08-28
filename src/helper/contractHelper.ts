import { ethereum } from '@graphprotocol/graph-ts'
import { OpenSea } from '../../generated/OpenSea/OpenSea'
import { Contract } from '../../generated/schema'
import GlobalConstants from '../utils'

export function getOrCreateContract(event: ethereum.Event): Contract {
	let contract = Contract.load(GlobalConstants.OPENSEA_ADDRESS)
	if (!contract) {
		contract = new Contract(GlobalConstants.OPENSEA_ADDRESS)
		let openSeaContract = OpenSea.bind(event.address)
		let versionCall = openSeaContract.try_version()
		let codenameCall = openSeaContract.try_codename()
		let nameCall = openSeaContract.try_name()

		contract.version = versionCall.reverted ? '' : versionCall.value
		contract.codename = codenameCall.reverted ? '' : codenameCall.value
		contract.name = nameCall.reverted ? '' : nameCall.value
	}
	return contract
}
