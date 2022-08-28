"use strict";
exports.__esModule = true;
exports.handleOrderApprovedPartTwo = exports.handleOrderApprovedPartOne = exports.handleOrdersMatched = void 0;
var graph_ts_1 = require("@graphprotocol/graph-ts");
var accountHelper_1 = require("./helper/accountHelper");
var auctionHelper_1 = require("./helper/auctionHelper");
var collectionHelper_1 = require("./helper/collectionHelper");
var feeHelper_1 = require("./helper/feeHelper");
var nftHelper_1 = require("./helper/nftHelper");
var saleHelper_1 = require("./helper/saleHelper");
var paymentTokenHelper_1 = require("./helper/paymentTokenHelper");
var contractHelper_1 = require("./helper/contractHelper");
var utils_1 = require("./utils");
//set of 3: REGULAR TRANSFER: https://etherscan.io/tx/0x9660bd19edec4f443068094d3ee9cf2c9b78fbc4a7888bb1a98d154a98041d0a#eventlog
function handleOrdersMatched(event) {
    var buyHash = event.params.buyHash;
    var sellHash = event.params.sellHash;
    var price = utils_1["default"].convertPriceToBigDecimal(event.params.price);
    var maker = event.params.maker;
    var taker = event.params.taker;
    var receipt = event.receipt;
    if (receipt) {
        var eventLogs = receipt.logs;
        if (eventLogs.length > 1) {
            graph_ts_1.log.warning('Log length {}', [receipt.logs.length.toString()]);
            for (var index = 0; index < eventLogs.length; index++) {
                graph_ts_1.log.warning('Topics {}', [receipt.logs[index].topics.length.toString()]);
                var _topic0 = receipt.logs[index].topics[0];
                var _topicsLength = eventLogs[index].topics.length;
                var _address = receipt.logs[index].address;
                if (_topicsLength == 4 &&
                    _topic0.equals(utils_1["default"].TRANSFER_SIG)) {
                    var _tokenID = eventLogs[index].topics[3];
                    var tokenId = graph_ts_1.ethereum.decode('uin256', _tokenID).toBigInt();
                    var buyer = accountHelper_1.getOrCreateAccount(maker);
                    var seller = accountHelper_1.getOrCreateAccount(taker);
                    var collection = collectionHelper_1.getOrCreateCollection(_address.toHexString());
                    var nft = nftHelper_1.getOrCreateNft(tokenId, collection, maker);
                    var sale = saleHelper_1.getOrCreateSale(event);
                    var contract = contractHelper_1.getOrCreateContract(event);
                    collectionHelper_1.updateCollectionAggregates(collection, buyer, price, nft);
                    nftHelper_1.updateNftMetrics(buyer, sale, tokenId, collection, price, nft);
                    accountHelper_1.updateSellerAggregates(seller, price);
                    accountHelper_1.updateBuyerAggregates(buyer, price);
                    saleHelper_1.updateSale(sale, buyHash, sellHash, buyer, seller, price, collection);
                    buyer.save();
                    seller.save();
                    collection.save();
                    nft.save();
                    contract.save();
                    sale.save();
                }
            }
        }
    }
}
exports.handleOrdersMatched = handleOrdersMatched;
function handleOrderApprovedPartOne(event) {
    var fee = feeHelper_1.getOrCreateFee(event);
    var collection = collectionHelper_1.getOrCreateCollection(event.params.feeRecipient.toHexString());
    fee.feeRecipient = collection.id;
    fee.takerProtocolFee = event.params.takerProtocolFee;
    fee.makerProtocolFee = event.params.makerProtocolFee;
    fee.makerRelayerFee = event.params.makerRelayerFee;
    fee.takerProtocolFee = event.params.takerRelayerFee;
    fee.save();
}
exports.handleOrderApprovedPartOne = handleOrderApprovedPartOne;
function handleOrderApprovedPartTwo(event) {
    var auction = auctionHelper_1.getOrCreateAuction(event.params.hash.toHexString(), event);
    var paymentToken = paymentTokenHelper_1.getOrCreatePaymentToken(event.params.paymentToken);
    auction.listingTime = event.params.listingTime;
    auction.basePrice = event.params.basePrice;
    auction.expirationTime = event.params.expirationTime;
    auction.paymentToken = paymentToken.id;
    auction.staticExtraData = event.params.staticExtradata;
    auction.extra = event.params.extra;
    auction.hash = event.params.hash;
    auction.orderbook = event.params.orderbookInclusionDesired;
    auction.save();
    paymentToken.save();
}
exports.handleOrderApprovedPartTwo = handleOrderApprovedPartTwo;
