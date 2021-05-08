import { BigInt, BigDecimal } from "@graphprotocol/graph-ts"
import {
  OpenSea,
  OrderApprovedPartOne,
  OrderApprovedPartTwo,
  OrderCancelled,
  OrdersMatched,
  OwnershipRenounced,
  OwnershipTransferred
} from "../generated/OpenSea/OpenSea"
import {
  Account,
  Contract,
  Transaction,
  MarketPlace,
  FeeEvent,
  NFT,
  SaleEvent,
  TransferEvent,
  Auction
  } from "../generated/schema"

export function handleOrderApprovedPartOne(event: OrderApprovedPartOne): void {
  let opensea = OpenSea.bind(event.address)
  let contract = new Contract(opensea._address.toHexString())
  let transaction = Transaction.load(event.transaction.hash.toHexString())
  let account = Account.load(event.params.maker.toHexString())
  let marketplace = MarketPlace.load(event.params.exchange.toHexString())
  let feeEvent = FeeEvent.load(event.transaction.hash.toHexString())
  let saleEvent = SaleEvent.load(event.transaction.hash.toHexString())
  

  if (transaction == null){
    transaction = new Transaction(event.transaction.hash.toHexString())
  }
  if (account == null){
    account = new Account(event.params.maker.toHexString())
  }
  if (marketplace == null){
    marketplace = new MarketPlace(event.params.exchange.toHexString())
  }
  if (feeEvent == null){
    feeEvent = new FeeEvent(event.transaction.hash.toHexString())
  }
  if (saleEvent == null){
    saleEvent = new SaleEvent(event.transaction.hash.toHexString())
  }

  marketplace.exchangeAddress = event.params.exchange

  saleEvent.marketplace = marketplace.id
  saleEvent.transaction = transaction.id

  //feeEvent.feeMethod = event.params.feeMethod(BigInt.fromI32(0))
  feeEvent.feeRecipient = event.params.feeRecipient
  feeEvent.takerProtocolFee = event.params.takerProtocolFee
  feeEvent.makerProtocolFee = event.params.makerProtocolFee
  feeEvent.makerRelayerFee = event.params.makerRelayerFee
  feeEvent.takerProtocolFee = event.params.takerRelayerFee
  feeEvent.transaction = transaction.id
  feeEvent.account = account.id
  feeEvent.contract = contract.id


  transaction.hash = event.transaction.hash
  transaction.block = event.block.number
  transaction.date = event.block.timestamp
  transaction.account = account.id
  transaction.marketplace = marketplace.id
  transaction.saleEvent = saleEvent.id
  transaction.feeEvent = feeEvent.id


  contract.address = opensea._address
  contract.name = opensea._name
  contract.version = opensea.version()
  contract.codename = opensea.codename()


  contract.save()
  marketplace.save()
  account.save()
  feeEvent.save()
  transaction.save()
}

export function handleOrderApprovedPartTwo(event: OrderApprovedPartTwo): void {
  let auction = Auction.load(event.params.hash.toHexString())
  let transaction = Transaction.load(event.transaction.hash.toHexString())

  if (transaction == null){
    transaction = new Transaction(event.transaction.hash.toHexString())
  }
  if (auction == null){
    auction = new Auction(event.params.hash.toHexString())
  }


  auction.listingTime = event.params.listingTime
  auction.basePrice = event.params.basePrice
  auction.expirationTime = event.params.expirationTime
  auction.paymentToken = event.params.paymentToken
  auction.staticExtraData = event.params.staticExtradata
  auction.extra = event.params.extra
  auction.hash = event.params.hash
  auction.orderbook = event.params.orderbookInclusionDesired
  auction.transaction = transaction.id


  transaction.hash = event.transaction.hash
  transaction.block = event.block.number
  transaction.date = event.block.timestamp


  auction.save()
  transaction.save()



}

export function handleOrderCancelled(event: OrderCancelled): void {}

export function handleOrdersMatched(event: OrdersMatched): void {
  let saleEvent = SaleEvent.load(event.transaction.hash.toHexString())
  let nft = NFT.load(event.params.metadata.toHexString())
  let transaction = Transaction.load(event.transaction.hash.toHexString())
  let account = Account.load(event.params.taker.toHexString())

  if (transaction == null){
    transaction = new Transaction(event.transaction.hash.toHexString())
  }
  if (nft == null){
    nft = new  NFT(event.params.metadata.toHexString())
  }
  if (saleEvent == null){
    saleEvent = new SaleEvent(event.transaction.hash.toHexString())
  }
  if (account == null){
    account = new Account(event.params.taker.toHexString())
  }
  
  
  saleEvent.sellHash = event.params.sellHash
  saleEvent.buyHash = event.params.buyHash
  saleEvent.maker = event.params.maker
  saleEvent.taker = event.params.taker
  saleEvent.account = account.id
  saleEvent.price = event.params.price
  saleEvent.nft = nft.id
  saleEvent.transaction = transaction.id


  transaction.hash = event.transaction.hash
  transaction.block = event.block.number
  transaction.date = event.block.timestamp
  transaction.nft = nft.id
  transaction.saleEvent = saleEvent.id



  saleEvent.save()
  transaction.save()
  account.save()
  nft.save()

}

export function handleOwnershipRenounced(event: OwnershipRenounced): void {}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {
  let transferevent = TransferEvent.load(event.params.previousOwner.toHexString())
  let account = Account.load(event.params.newOwner.toHexString())
  let transaction = Transaction.load(event.transaction.hash.toHexString())

  if (transferevent == null){
    transferevent = new TransferEvent(event.params.previousOwner.toHexString())
  }
  if (account == null){
    account = new  Account(event.params.newOwner.toHexString())
  }
  if (transaction == null){
    transaction = new Transaction(event.transaction.hash.toHexString())
  }

  transferevent.sender = event.params.previousOwner
  transferevent.receiver = event.params.newOwner
  transferevent.account = account.id
  transferevent.transaction = transaction.id

  transferevent.save()
  transaction.save()
  account.save()




}
