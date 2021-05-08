// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Address,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class Account extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save Account entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save Account entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("Account", id.toString(), this);
  }

  static load(id: string): Account | null {
    return store.get("Account", id) as Account | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get saleEvents(): Array<string> {
    let value = this.get("saleEvents");
    return value.toStringArray();
  }

  set saleEvents(value: Array<string>) {
    this.set("saleEvents", Value.fromStringArray(value));
  }

  get transferEvents(): Array<string> {
    let value = this.get("transferEvents");
    return value.toStringArray();
  }

  set transferEvents(value: Array<string>) {
    this.set("transferEvents", Value.fromStringArray(value));
  }

  get feeRecipients(): Array<string> {
    let value = this.get("feeRecipients");
    return value.toStringArray();
  }

  set feeRecipients(value: Array<string>) {
    this.set("feeRecipients", Value.fromStringArray(value));
  }

  get transaction(): Array<string> {
    let value = this.get("transaction");
    return value.toStringArray();
  }

  set transaction(value: Array<string>) {
    this.set("transaction", Value.fromStringArray(value));
  }
}

export class MarketPlace extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save MarketPlace entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save MarketPlace entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("MarketPlace", id.toString(), this);
  }

  static load(id: string): MarketPlace | null {
    return store.get("MarketPlace", id) as MarketPlace | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get exchangeAddress(): Bytes | null {
    let value = this.get("exchangeAddress");
    if (value === null || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set exchangeAddress(value: Bytes | null) {
    if (value === null) {
      this.unset("exchangeAddress");
    } else {
      this.set("exchangeAddress", Value.fromBytes(value as Bytes));
    }
  }

  get saleEvents(): Array<string> {
    let value = this.get("saleEvents");
    return value.toStringArray();
  }

  set saleEvents(value: Array<string>) {
    this.set("saleEvents", Value.fromStringArray(value));
  }

  get transferEvents(): Array<string> {
    let value = this.get("transferEvents");
    return value.toStringArray();
  }

  set transferEvents(value: Array<string>) {
    this.set("transferEvents", Value.fromStringArray(value));
  }

  get feeRecipients(): Array<string> {
    let value = this.get("feeRecipients");
    return value.toStringArray();
  }

  set feeRecipients(value: Array<string>) {
    this.set("feeRecipients", Value.fromStringArray(value));
  }

  get transaction(): Array<string> {
    let value = this.get("transaction");
    return value.toStringArray();
  }

  set transaction(value: Array<string>) {
    this.set("transaction", Value.fromStringArray(value));
  }
}

export class Contract extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save Contract entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save Contract entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("Contract", id.toString(), this);
  }

  static load(id: string): Contract | null {
    return store.get("Contract", id) as Contract | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get address(): Bytes | null {
    let value = this.get("address");
    if (value === null || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set address(value: Bytes | null) {
    if (value === null) {
      this.unset("address");
    } else {
      this.set("address", Value.fromBytes(value as Bytes));
    }
  }

  get name(): string | null {
    let value = this.get("name");
    if (value === null || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set name(value: string | null) {
    if (value === null) {
      this.unset("name");
    } else {
      this.set("name", Value.fromString(value as string));
    }
  }

  get version(): string | null {
    let value = this.get("version");
    if (value === null || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set version(value: string | null) {
    if (value === null) {
      this.unset("version");
    } else {
      this.set("version", Value.fromString(value as string));
    }
  }

  get codename(): string | null {
    let value = this.get("codename");
    if (value === null || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set codename(value: string | null) {
    if (value === null) {
      this.unset("codename");
    } else {
      this.set("codename", Value.fromString(value as string));
    }
  }
}

export class NFT extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save NFT entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save NFT entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("NFT", id.toString(), this);
  }

  static load(id: string): NFT | null {
    return store.get("NFT", id) as NFT | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get transaction(): string | null {
    let value = this.get("transaction");
    if (value === null || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set transaction(value: string | null) {
    if (value === null) {
      this.unset("transaction");
    } else {
      this.set("transaction", Value.fromString(value as string));
    }
  }
}

export class SaleEvent extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save SaleEvent entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save SaleEvent entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("SaleEvent", id.toString(), this);
  }

  static load(id: string): SaleEvent | null {
    return store.get("SaleEvent", id) as SaleEvent | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get sellHash(): Bytes | null {
    let value = this.get("sellHash");
    if (value === null || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set sellHash(value: Bytes | null) {
    if (value === null) {
      this.unset("sellHash");
    } else {
      this.set("sellHash", Value.fromBytes(value as Bytes));
    }
  }

  get buyHash(): Bytes | null {
    let value = this.get("buyHash");
    if (value === null || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set buyHash(value: Bytes | null) {
    if (value === null) {
      this.unset("buyHash");
    } else {
      this.set("buyHash", Value.fromBytes(value as Bytes));
    }
  }

  get maker(): Bytes | null {
    let value = this.get("maker");
    if (value === null || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set maker(value: Bytes | null) {
    if (value === null) {
      this.unset("maker");
    } else {
      this.set("maker", Value.fromBytes(value as Bytes));
    }
  }

  get taker(): Bytes | null {
    let value = this.get("taker");
    if (value === null || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set taker(value: Bytes | null) {
    if (value === null) {
      this.unset("taker");
    } else {
      this.set("taker", Value.fromBytes(value as Bytes));
    }
  }

  get price(): BigInt | null {
    let value = this.get("price");
    if (value === null || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set price(value: BigInt | null) {
    if (value === null) {
      this.unset("price");
    } else {
      this.set("price", Value.fromBigInt(value as BigInt));
    }
  }

  get account(): string | null {
    let value = this.get("account");
    if (value === null || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set account(value: string | null) {
    if (value === null) {
      this.unset("account");
    } else {
      this.set("account", Value.fromString(value as string));
    }
  }

  get marketplace(): string | null {
    let value = this.get("marketplace");
    if (value === null || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set marketplace(value: string | null) {
    if (value === null) {
      this.unset("marketplace");
    } else {
      this.set("marketplace", Value.fromString(value as string));
    }
  }

  get nft(): string | null {
    let value = this.get("nft");
    if (value === null || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set nft(value: string | null) {
    if (value === null) {
      this.unset("nft");
    } else {
      this.set("nft", Value.fromString(value as string));
    }
  }

  get transaction(): string | null {
    let value = this.get("transaction");
    if (value === null || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set transaction(value: string | null) {
    if (value === null) {
      this.unset("transaction");
    } else {
      this.set("transaction", Value.fromString(value as string));
    }
  }
}

export class FeeEvent extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save FeeEvent entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save FeeEvent entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("FeeEvent", id.toString(), this);
  }

  static load(id: string): FeeEvent | null {
    return store.get("FeeEvent", id) as FeeEvent | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get takerRelayerFee(): BigInt | null {
    let value = this.get("takerRelayerFee");
    if (value === null || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set takerRelayerFee(value: BigInt | null) {
    if (value === null) {
      this.unset("takerRelayerFee");
    } else {
      this.set("takerRelayerFee", Value.fromBigInt(value as BigInt));
    }
  }

  get makerRelayerFee(): BigInt | null {
    let value = this.get("makerRelayerFee");
    if (value === null || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set makerRelayerFee(value: BigInt | null) {
    if (value === null) {
      this.unset("makerRelayerFee");
    } else {
      this.set("makerRelayerFee", Value.fromBigInt(value as BigInt));
    }
  }

  get takerProtocolFee(): BigInt | null {
    let value = this.get("takerProtocolFee");
    if (value === null || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set takerProtocolFee(value: BigInt | null) {
    if (value === null) {
      this.unset("takerProtocolFee");
    } else {
      this.set("takerProtocolFee", Value.fromBigInt(value as BigInt));
    }
  }

  get makerProtocolFee(): BigInt | null {
    let value = this.get("makerProtocolFee");
    if (value === null || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set makerProtocolFee(value: BigInt | null) {
    if (value === null) {
      this.unset("makerProtocolFee");
    } else {
      this.set("makerProtocolFee", Value.fromBigInt(value as BigInt));
    }
  }

  get feeRecipient(): Bytes | null {
    let value = this.get("feeRecipient");
    if (value === null || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set feeRecipient(value: Bytes | null) {
    if (value === null) {
      this.unset("feeRecipient");
    } else {
      this.set("feeRecipient", Value.fromBytes(value as Bytes));
    }
  }

  get marketplace(): string | null {
    let value = this.get("marketplace");
    if (value === null || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set marketplace(value: string | null) {
    if (value === null) {
      this.unset("marketplace");
    } else {
      this.set("marketplace", Value.fromString(value as string));
    }
  }

  get account(): string | null {
    let value = this.get("account");
    if (value === null || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set account(value: string | null) {
    if (value === null) {
      this.unset("account");
    } else {
      this.set("account", Value.fromString(value as string));
    }
  }

  get contract(): string | null {
    let value = this.get("contract");
    if (value === null || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set contract(value: string | null) {
    if (value === null) {
      this.unset("contract");
    } else {
      this.set("contract", Value.fromString(value as string));
    }
  }

  get transaction(): string | null {
    let value = this.get("transaction");
    if (value === null || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set transaction(value: string | null) {
    if (value === null) {
      this.unset("transaction");
    } else {
      this.set("transaction", Value.fromString(value as string));
    }
  }
}

export class TransferEvent extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save TransferEvent entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save TransferEvent entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("TransferEvent", id.toString(), this);
  }

  static load(id: string): TransferEvent | null {
    return store.get("TransferEvent", id) as TransferEvent | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get sender(): Bytes {
    let value = this.get("sender");
    return value.toBytes();
  }

  set sender(value: Bytes) {
    this.set("sender", Value.fromBytes(value));
  }

  get receiver(): Bytes {
    let value = this.get("receiver");
    return value.toBytes();
  }

  set receiver(value: Bytes) {
    this.set("receiver", Value.fromBytes(value));
  }

  get account(): string | null {
    let value = this.get("account");
    if (value === null || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set account(value: string | null) {
    if (value === null) {
      this.unset("account");
    } else {
      this.set("account", Value.fromString(value as string));
    }
  }

  get marketplace(): string | null {
    let value = this.get("marketplace");
    if (value === null || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set marketplace(value: string | null) {
    if (value === null) {
      this.unset("marketplace");
    } else {
      this.set("marketplace", Value.fromString(value as string));
    }
  }

  get transaction(): string | null {
    let value = this.get("transaction");
    if (value === null || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set transaction(value: string | null) {
    if (value === null) {
      this.unset("transaction");
    } else {
      this.set("transaction", Value.fromString(value as string));
    }
  }
}

export class Auction extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save Auction entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save Auction entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("Auction", id.toString(), this);
  }

  static load(id: string): Auction | null {
    return store.get("Auction", id) as Auction | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get listingTime(): BigInt | null {
    let value = this.get("listingTime");
    if (value === null || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set listingTime(value: BigInt | null) {
    if (value === null) {
      this.unset("listingTime");
    } else {
      this.set("listingTime", Value.fromBigInt(value as BigInt));
    }
  }

  get expirationTime(): BigInt | null {
    let value = this.get("expirationTime");
    if (value === null || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set expirationTime(value: BigInt | null) {
    if (value === null) {
      this.unset("expirationTime");
    } else {
      this.set("expirationTime", Value.fromBigInt(value as BigInt));
    }
  }

  get basePrice(): BigInt | null {
    let value = this.get("basePrice");
    if (value === null || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set basePrice(value: BigInt | null) {
    if (value === null) {
      this.unset("basePrice");
    } else {
      this.set("basePrice", Value.fromBigInt(value as BigInt));
    }
  }

  get paymentToken(): Bytes | null {
    let value = this.get("paymentToken");
    if (value === null || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set paymentToken(value: Bytes | null) {
    if (value === null) {
      this.unset("paymentToken");
    } else {
      this.set("paymentToken", Value.fromBytes(value as Bytes));
    }
  }

  get staticTarget(): Bytes | null {
    let value = this.get("staticTarget");
    if (value === null || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set staticTarget(value: Bytes | null) {
    if (value === null) {
      this.unset("staticTarget");
    } else {
      this.set("staticTarget", Value.fromBytes(value as Bytes));
    }
  }

  get staticExtraData(): Bytes | null {
    let value = this.get("staticExtraData");
    if (value === null || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set staticExtraData(value: Bytes | null) {
    if (value === null) {
      this.unset("staticExtraData");
    } else {
      this.set("staticExtraData", Value.fromBytes(value as Bytes));
    }
  }

  get extra(): BigInt | null {
    let value = this.get("extra");
    if (value === null || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set extra(value: BigInt | null) {
    if (value === null) {
      this.unset("extra");
    } else {
      this.set("extra", Value.fromBigInt(value as BigInt));
    }
  }

  get hash(): Bytes | null {
    let value = this.get("hash");
    if (value === null || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set hash(value: Bytes | null) {
    if (value === null) {
      this.unset("hash");
    } else {
      this.set("hash", Value.fromBytes(value as Bytes));
    }
  }

  get orderbook(): boolean {
    let value = this.get("orderbook");
    return value.toBoolean();
  }

  set orderbook(value: boolean) {
    this.set("orderbook", Value.fromBoolean(value));
  }

  get transaction(): string | null {
    let value = this.get("transaction");
    if (value === null || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set transaction(value: string | null) {
    if (value === null) {
      this.unset("transaction");
    } else {
      this.set("transaction", Value.fromString(value as string));
    }
  }
}

export class Transaction extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save Transaction entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save Transaction entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("Transaction", id.toString(), this);
  }

  static load(id: string): Transaction | null {
    return store.get("Transaction", id) as Transaction | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get hash(): Bytes | null {
    let value = this.get("hash");
    if (value === null || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set hash(value: Bytes | null) {
    if (value === null) {
      this.unset("hash");
    } else {
      this.set("hash", Value.fromBytes(value as Bytes));
    }
  }

  get date(): BigInt | null {
    let value = this.get("date");
    if (value === null || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set date(value: BigInt | null) {
    if (value === null) {
      this.unset("date");
    } else {
      this.set("date", Value.fromBigInt(value as BigInt));
    }
  }

  get block(): BigInt | null {
    let value = this.get("block");
    if (value === null || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set block(value: BigInt | null) {
    if (value === null) {
      this.unset("block");
    } else {
      this.set("block", Value.fromBigInt(value as BigInt));
    }
  }

  get account(): string | null {
    let value = this.get("account");
    if (value === null || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set account(value: string | null) {
    if (value === null) {
      this.unset("account");
    } else {
      this.set("account", Value.fromString(value as string));
    }
  }

  get marketplace(): string | null {
    let value = this.get("marketplace");
    if (value === null || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set marketplace(value: string | null) {
    if (value === null) {
      this.unset("marketplace");
    } else {
      this.set("marketplace", Value.fromString(value as string));
    }
  }

  get saleEvent(): string | null {
    let value = this.get("saleEvent");
    if (value === null || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set saleEvent(value: string | null) {
    if (value === null) {
      this.unset("saleEvent");
    } else {
      this.set("saleEvent", Value.fromString(value as string));
    }
  }

  get feeEvent(): string | null {
    let value = this.get("feeEvent");
    if (value === null || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set feeEvent(value: string | null) {
    if (value === null) {
      this.unset("feeEvent");
    } else {
      this.set("feeEvent", Value.fromString(value as string));
    }
  }

  get auction(): string | null {
    let value = this.get("auction");
    if (value === null || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set auction(value: string | null) {
    if (value === null) {
      this.unset("auction");
    } else {
      this.set("auction", Value.fromString(value as string));
    }
  }

  get nft(): string | null {
    let value = this.get("nft");
    if (value === null || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set nft(value: string | null) {
    if (value === null) {
      this.unset("nft");
    } else {
      this.set("nft", Value.fromString(value as string));
    }
  }
}