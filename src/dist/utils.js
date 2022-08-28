"use strict";
exports.__esModule = true;
var graph_ts_1 = require("@graphprotocol/graph-ts");
var GlobalConstants = /** @class */ (function () {
    function GlobalConstants() {
    }
    Object.defineProperty(GlobalConstants, "ZERO_ADDRESS", {
        get: function () {
            return '0x0000000000000000000000000000000000000000';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GlobalConstants, "USDT_ADDRESS", {
        get: function () {
            return '0xdAC17F958D2ee523a2206206994597C13D831ec7';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GlobalConstants, "ZERO_USDC", {
        get: function () {
            return '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GlobalConstants, "WETH_ADDRESS", {
        get: function () {
            return '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GlobalConstants, "DAI_ADDRESS", {
        get: function () {
            return '0x6B175474E89094C44Da98b954EedeAC495271d0F';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GlobalConstants, "OPENSEA_ADDRESS", {
        get: function () {
            return '0x7Be8076f4EA4A4AD08075C2508e481d6C946D12b';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GlobalConstants, "BI_ZERO", {
        get: function () {
            return graph_ts_1.BigInt.fromI32(0);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GlobalConstants, "BI_ONE", {
        get: function () {
            return graph_ts_1.BigInt.fromI32(1);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GlobalConstants, "BD_ZERO", {
        get: function () {
            return new graph_ts_1.BigDecimal(graph_ts_1.BigInt.fromI32(0));
        },
        enumerable: false,
        configurable: true
    });
    GlobalConstants.globalId = function (event) {
        var id = event.transaction.hash
            .toHexString()
            .concat('-')
            .concat(event.logIndex.toString());
        return id;
    };
    Object.defineProperty(GlobalConstants, "TRANSFER_SIG", {
        get: function () {
            return graph_ts_1.Bytes.fromHexString('0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef' // This is identifier of the Transfer
            );
        },
        enumerable: false,
        configurable: true
    });
    GlobalConstants.convertPriceToBigDecimal = function (quantity, decimals) {
        if (decimals === void 0) { decimals = 18; }
        return quantity.divDecimal(graph_ts_1.BigInt.fromI32(10)
            .pow(decimals)
            .toBigDecimal());
    };
    return GlobalConstants;
}());
exports["default"] = GlobalConstants;
