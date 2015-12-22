var gridElement = require('./gridElement');
var Grid = (function () {
    function Grid(map) {
        this._map = map;
        this._gridObjects = [];
    }
    Grid.prototype.addTileGridElements = function (tile) {
        this.addGridElement(tile, tile.x + 63, tile.y, "building");
        this.addGridElement(tile, tile.x, tile.y + 111, "building");
        this.addGridElement(tile, tile.x + 63, tile.y, "road", 119.84);
        this.addGridElement(tile, tile.x + 63, tile.y, "road");
        this.addGridElement(tile, tile.x, tile.y + 111, "road", 60.22);
        if (tile.bottomOfRow) {
            this.addGridElement(tile, tile.x + 63, tile.y + this._map.hexagonHeight, "building");
            this.addGridElement(tile, tile.x + 63, tile.y + this._map.hexagonHeight, "road");
        }
        switch (tile.column) {
            case 3:
            case 4:
                if (tile.topOfRow) {
                    this.addGridElement(tile, tile.x + 191, tile.y, "building");
                    this.addGridElement(tile, tile.x + 191, tile.y, "road", 60.22);
                }
                if (tile.bottomOfRow) {
                    this.addGridElement(tile, tile.x + 191, tile.y + this._map.hexagonHeight, "building");
                    this.addGridElement(tile, tile.x + 191, tile.y + this._map.hexagonHeight, "road", 119.84, 1);
                }
                break;
            case 5:
                this.addGridElement(tile, tile.x + 191, tile.y, "building");
                this.addGridElement(tile, tile.x + this._map.hexagonWidth, tile.y + 111, "building");
                this.addGridElement(tile, tile.x + 191, tile.y + this._map.hexagonHeight, "building");
                this.addGridElement(tile, tile.x + 191, tile.y, "road", 60.22);
                this.addGridElement(tile, tile.x + 191, tile.y + this._map.hexagonHeight, "road", 119.84, 1);
                break;
            default:
                //do nothing
                break;
        }
    };
    Grid.prototype.buildGridLinks = function () {
        var gridObjects = this._gridObjects;
        gridObjects.forEach(function (element, index) {
            if (element.type == "road") {
                gridObjects.forEach(function (elementToLink, indexToLink) {
                    if (elementToLink.type == "building") {
                        if (element.x == elementToLink.x &&
                            element.y == elementToLink.y) {
                            element.links.push(indexToLink);
                            elementToLink.links.push(index);
                        }
                        var linkToX;
                        var linkToY;
                        switch (element.angle) {
                            case 119.84:
                                if (element.anchorX == 1) {
                                    if (index == 69 || index == 127) {
                                        linkToX = element.x + 64;
                                        linkToY = element.y - 112.5;
                                    }
                                    else {
                                        linkToX = element.x + 65;
                                        linkToY = element.y - 114;
                                    }
                                }
                                else {
                                    linkToX = element.x - 63;
                                    linkToY = element.y + 111;
                                }
                                if (elementToLink.x == linkToX && elementToLink.y == linkToY) {
                                    element.links.push(indexToLink);
                                    elementToLink.links.push(index);
                                }
                                break;
                            case 60.22:
                                if (index == 23 || index == 76) {
                                    linkToX = element.x + 64;
                                    linkToY = element.y + 112.5;
                                }
                                else if (index == 49 || index == 57 || index == 66) {
                                    linkToX = element.x + 65;
                                    linkToY = element.y + 111;
                                }
                                else {
                                    linkToX = element.x + 63;
                                    linkToY = element.y + 114;
                                }
                                if (elementToLink.x == linkToX && elementToLink.y == linkToY) {
                                    element.links.push(indexToLink);
                                    elementToLink.links.push(index);
                                }
                                break;
                            default:
                                linkToX = element.x + 128;
                                linkToY = element.y;
                                if (elementToLink.x == linkToX && elementToLink.y == linkToY) {
                                    element.links.push(indexToLink);
                                    elementToLink.links.push(index);
                                }
                                linkToX = element.x + 129;
                                linkToY = element.y - 1.5;
                                if (elementToLink.x == linkToX && elementToLink.y == linkToY) {
                                    element.links.push(indexToLink);
                                    elementToLink.links.push(index);
                                }
                                break;
                        }
                    }
                });
            }
        });
        this.addGridResources();
        this.addGridResources();
    };
    Grid.prototype.getGridData = function () {
        var gridData = [];
        this._gridObjects.forEach(function (gridObject, index) {
            gridData.push({
                x: gridObject.x,
                y: gridObject.y,
                type: gridObject.type,
                angle: gridObject.angle,
                anchorX: gridObject.anchorX,
                anchorY: gridObject.anchorY,
                owningPlayer: gridObject.owningPlayer,
                playerPieceType: gridObject.playerPieceType,
                links: gridObject.links,
                resources: gridObject.resources,
                serverIndex: index
            });
        });
        return gridData;
    };
    Grid.prototype.isPlacementValid = function (gridIndex, playerNumber, type) {
        var gridElement = this._gridObjects[gridIndex];
        var placementValid = false;
        if (gridElement.owningPlayer == playerNumber || gridElement.owningPlayer == null) {
            gridElement.links.forEach(function (link) {
                var linkedObject = this._gridObjects[link];
                if (type == 'road') {
                    placementValid = true;
                }
                else if (type == 'city') {
                    placementValid = true;
                }
                else {
                    linkedObject.links.forEach(function (link2) {
                        var linkedGridElement = this._gridObjects[link2];
                        placementValid = !!(linkedGridElement.owningPlayer == playerNumber || gridElement.owningPlayer == null);
                    }, this);
                }
            }, this);
        }
        else {
            placementValid = false;
        }
        return placementValid;
    };
    Grid.prototype.updateGrid = function (gridIndex, playerNumber, type) {
        this._gridObjects[gridIndex].owningPlayer = playerNumber;
        this._gridObjects[gridIndex].playerPieceType = type;
    };
    Grid.prototype.resourcesOnRoll = function (diceRoll, playerObject) {
        this._gridObjects.forEach(function (gridObject) {
            if (gridObject.owningPlayer == playerObject.number) {
                gridObject.resources.forEach(function (resource) {
                    if (resource.number == diceRoll) {
                        var numberToAdd = 1;
                        if (gridObject.playerPieceType == 'city') {
                            numberToAdd = 2;
                        }
                        switch (resource.type) {
                            case 'wood':
                                playerObject.resources.wood = playerObject.resources.wood + numberToAdd;
                                break;
                            case 'stone':
                                playerObject.resources.stone = playerObject.resources.stone + numberToAdd;
                                break;
                            case 'ore':
                                playerObject.resources.ore = playerObject.resources.ore + numberToAdd;
                                break;
                            case 'sheep':
                                playerObject.resources.sheep = playerObject.resources.sheep + numberToAdd;
                                break;
                            case 'wheat':
                                playerObject.resources.wheat = playerObject.resources.wheat + numberToAdd;
                                break;
                        }
                    }
                }, this);
            }
        }, this);
        return playerObject;
    };
    Grid.prototype.addGridResources = function () {
        var gridObjects = this;
        this._gridObjects.forEach(function (gridObject, index) {
            if (gridObject.type == 'building') {
                if (gridObject.links.length > 2) {
                    gridObject.links.forEach(function (link1) {
                        var roadLinkObject = gridObjects._gridObjects[link1];
                        roadLinkObject.links.forEach(function (link2) {
                            if (link2 != index) {
                                var buildingLinkObject = gridObjects._gridObjects[link2];
                                switch (roadLinkObject.angle) {
                                    case 119.84:
                                        if (gridObject.x < buildingLinkObject.x) {
                                            if (gridObject.resources[0].type != 'none' || gridObject.links.length > 2) {
                                                if (this.tileResourceNotPresent(gridObject.resources, buildingLinkObject.resources[0].number)) {
                                                    gridObject.resources.push(buildingLinkObject.resources[0]);
                                                }
                                            }
                                        }
                                        break;
                                    case 60.22:
                                        if (gridObject.x > buildingLinkObject.x) {
                                            if (this.tileResourceNotPresent(gridObject.resources, buildingLinkObject.resources[0].number)) {
                                                gridObject.resources.push(buildingLinkObject.resources[0]);
                                            }
                                            if (typeof buildingLinkObject.resources[1] != 'undefined') {
                                                if (this.tileResourceNotPresent(gridObject.resources, buildingLinkObject.resources[1].number)) {
                                                    gridObject.resources.push(buildingLinkObject.resources[1]);
                                                }
                                            }
                                        }
                                        break;
                                    default:
                                        if (gridObject.x > buildingLinkObject.x) {
                                            if (this.tileResourceNotPresent(gridObject.resources, buildingLinkObject.resources[0].number)) {
                                                gridObject.resources.push(buildingLinkObject.resources[0]);
                                            }
                                            if (typeof buildingLinkObject.resources[1] != 'undefined') {
                                                if (this.tileResourceNotPresent(gridObject.resources, buildingLinkObject.resources[1].number)) {
                                                    gridObject.resources.push(buildingLinkObject.resources[1]);
                                                }
                                            }
                                        }
                                        break;
                                }
                            }
                        }, this);
                    }, this);
                }
            }
        }, this);
    };
    Grid.prototype.tileResourceNotPresent = function (resources, resourceNumber) {
        var resourceFound = false;
        resources.forEach(function (resource) {
            if (resource.number == resourceNumber) {
                resourceFound = true;
            }
        });
        return (!resourceFound);
    };
    Grid.prototype.addGridElement = function (tile, x, y, type, angle, anchorX) {
        if (angle === void 0) { angle = 0; }
        if (anchorX === void 0) { anchorX = 0; }
        var gridElementObject = new gridElement.GridElement();
        gridElementObject.x = x;
        gridElementObject.y = y;
        gridElementObject.type = type;
        gridElementObject.anchorY = 0.5;
        if (type == "building") {
            gridElementObject.anchorX = 0.5;
            gridElementObject.setResource(tile.type, tile.number);
        }
        else {
            gridElementObject.anchorX = anchorX;
            gridElementObject.angle = angle;
        }
        this._gridObjects.push(gridElementObject);
    };
    return Grid;
})();
exports.Grid = Grid;
