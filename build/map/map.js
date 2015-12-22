var tile = require('./tile');
var grid = require('./grid');
var Map = (function () {
    function Map() {
        this._hexagonWidth = 256;
        this._hexagonHeight = 225;
        this._gridSizeX = 11;
        this._gridSizeY = 21;
        this._mapHeight = 0;
        this._mapWidth = 0;
        this._tileCount = this._gridSizeX * (this._gridSizeY / 2);
        this._mapTiles = [];
        this._grid = new grid.Grid(this);
        this.setupTileInfo();
        this.setTileLocations();
    }
    Object.defineProperty(Map.prototype, "hexagonWidth", {
        get: function () {
            return this._hexagonWidth;
        },
        set: function (value) {
            this._hexagonWidth = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Map.prototype, "hexagonHeight", {
        get: function () {
            return this._hexagonHeight;
        },
        set: function (value) {
            this._hexagonHeight = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Map.prototype, "grid", {
        get: function () {
            return this._grid;
        },
        set: function (value) {
            this._grid = value;
        },
        enumerable: true,
        configurable: true
    });
    Map.prototype.getMapInfo = function () {
        var tileInfo = [];
        this._mapTiles.forEach(function (tile) {
            tileInfo.push({
                x: tile.x,
                y: tile.y,
                type: tile.type,
                number: tile.number,
                conversion: tile.conversion,
                angle: tile.angle,
                anchorX: tile.anchorX,
                anchorY: tile.anchorY
            });
        });
        return {
            mapHeight: this._mapHeight,
            mapWidth: this._mapWidth,
            hexagonWidth: this._hexagonWidth,
            hexagonHeight: this._hexagonHeight,
            tileCount: this._tileCount,
            mapTiles: tileInfo,
            grid: this._grid.getGridData()
        };
    };
    Map.prototype.setTileLocations = function () {
        var tileCount = 0;
        for (var i = 0; i < this._gridSizeX / 2; i++) {
            for (var j = 0; j < this._gridSizeY; j++) {
                if (this._gridSizeX % 2 == 0 || i + 1 < this._gridSizeX / 2 || j % 2 == 0) {
                    var tileObject = this._mapTiles[tileCount];
                    tileObject.x = this._hexagonWidth * i * 1.5 + (this._hexagonWidth / 4 * 3) * (j % 2);
                    tileObject.y = this._hexagonHeight * j / 2;
                    this._mapWidth = tileObject.x;
                    this._mapHeight = tileObject.y;
                    if (tileObject.conversion != null) {
                        tileObject.anchorX = 0.5;
                        tileObject.anchorY = 0.5;
                    }
                    this._mapTiles[tileCount] = tileObject;
                    if (tileObject.type != 'sea') {
                        this._grid.addTileGridElements(tileObject);
                    }
                    tileCount++;
                }
            }
        }
        this._grid.buildGridLinks();
    };
    Map.prototype.setupTileInfo = function () {
        for (var i = 0; i < this._tileCount; i++) {
            var tileObject = new tile.Tile();
            switch (i) {
                //Column one
                case 28:
                    tileObject.conversion = "conversionStone";
                    tileObject.angle = 300.55;
                    break;
                case 30:
                    tileObject.type = "plain";
                    tileObject.number = "nine";
                    tileObject.column = 1;
                    tileObject.topOfRow = true;
                    break;
                case 31:
                    tileObject.conversion = "conversionAny";
                    tileObject.angle = 299.39;
                    break;
                case 32:
                    tileObject.type = "wood";
                    tileObject.number = "twelve";
                    tileObject.column = 1;
                    break;
                case 34:
                    tileObject.type = "stoneMountain";
                    tileObject.number = "eleven";
                    tileObject.bottomOfRow = true;
                    tileObject.column = 1;
                    break;
                case 35:
                    tileObject.conversion = "conversionSheep";
                    tileObject.angle = 240.03;
                    break;
                //Column two
                case 50:
                    tileObject.type = "wheat";
                    tileObject.number = "ten";
                    tileObject.column = 2;
                    tileObject.topOfRow = true;
                    break;
                case 52:
                    tileObject.type = "plain";
                    tileObject.number = "five";
                    tileObject.column = 2;
                    break;
                case 54:
                    tileObject.type = "plain";
                    tileObject.number = "six";
                    tileObject.column = 2;
                    break;
                case 56:
                    tileObject.type = "wheat";
                    tileObject.number = "four";
                    tileObject.bottomOfRow = true;
                    tileObject.column = 2;
                    break;
                case 58:
                    tileObject.conversion = "conversionAny";
                    tileObject.angle = 180.06;
                    break;
                //Column three
                case 47:
                    tileObject.conversion = "conversionWood";
                    tileObject.angle = 0;
                    break;
                case 49:
                    tileObject.type = "wheat";
                    tileObject.number = "eight";
                    tileObject.column = 3;
                    tileObject.topOfRow = true;
                    break;
                case 51:
                    tileObject.type = "stoneMountain";
                    tileObject.number = "four";
                    tileObject.column = 3;
                    break;
                case 53:
                    tileObject.type = "wheat";
                    tileObject.number = "eleven";
                    tileObject.column = 3;
                    break;
                case 55:
                    tileObject.type = "oreMountain";
                    tileObject.number = "three";
                    tileObject.column = 3;
                    break;
                case 57:
                    tileObject.type = "dessert";
                    tileObject.bottomOfRow = true;
                    tileObject.column = 3;
                    break;
                //Column four
                case 71:
                    tileObject.type = "wood";
                    tileObject.number = "three";
                    tileObject.column = 4;
                    tileObject.topOfRow = true;
                    break;
                case 73:
                    tileObject.type = "plain";
                    tileObject.number = "nine";
                    tileObject.column = 4;
                    break;
                case 75:
                    tileObject.type = "wood";
                    tileObject.number = "ten";
                    tileObject.column = 4;
                    break;
                case 77:
                    tileObject.type = "wood";
                    tileObject.number = "eight";
                    tileObject.bottomOfRow = true;
                    tileObject.column = 4;
                    break;
                case 79:
                    tileObject.conversion = "conversionWheat";
                    tileObject.angle = 180.03;
                    break;
                //Column five
                case 70:
                    tileObject.conversion = "conversionOre";
                    tileObject.angle = 59.98;
                    break;
                case 72:
                    tileObject.type = "stoneMountain";
                    tileObject.number = "six";
                    tileObject.column = 5;
                    tileObject.topOfRow = true;
                    break;
                case 74:
                    tileObject.type = "oreMountain";
                    tileObject.number = "two";
                    tileObject.column = 5;
                    break;
                case 76:
                    tileObject.type = "oreMountain";
                    tileObject.number = "five";
                    tileObject.column = 5;
                    tileObject.bottomOfRow = true;
                    break;
                case 94:
                    tileObject.conversion = "conversionAny";
                    tileObject.angle = 59.96;
                    break;
                case 98:
                    tileObject.conversion = "conversionAny";
                    tileObject.angle = 119.29;
                    break;
                default:
                    tileObject.type = "sea";
                    break;
            }
            this._mapTiles[i] = tileObject;
        }
    };
    return Map;
})();
exports.Map = Map;
