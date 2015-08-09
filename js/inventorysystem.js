"use strict";
/**
* Create Inventory System for CraftyJS
* 
* @class inventorySystem
* @author John Doughty (jrdoughty13@gmail.com)
* @see CraftyJS (https://github.com/jrdoughty/Crafty)
*/
var inventorySystem = {
    background: null,
    items: [],
    backgroundXOffset: null,
    backgroundYOffsent: null,
    backgroundWidth: null,
    backgroundHeight: null,
    tilesize: null,
    selectedItemIndex: null,
    columns: null,
    rows: null,
    description: null,
    descriptionHeight: null,



    /**
	 * Constructor for inventory
	 * 	
	 * @param {Object} background - background for the inventory system
	 * @param {Array} items - inventory items list, containing entities with the item component
	 * @param {Integer} backgroundXOffset - Margin from the left of the screen in pixels
	 * @param {Integer} backgroundYOffsent - Margin from the top of the screen in pixels
	 * @param {Integer} backgroundWidth - background width in pixels
	 * @param {Integer} backgroundHeight - background height in pixels
	 * @param {Integer} tilesize - height/width of inventory tiles
	 * @param {Integer} selectedItemIndex - index of the currently selected item in the items array
	 * @param {Integer} columns - tiles per the width of the background
	 * @param {Integer} rows - tiles per the height of the background
	 * @param {Object} description - object that contains the text of each item's description
	 * @param {Integer} descriptionHeight - Height of description text area in pixels
	 * @return {Object} this 
	 */
    Init: function (offsetX, offsetY, width, height, tilesizepx, descriptHeight) {
        Crafty.sprite(384, 304, "sharedimages/menu.jpg", {
            InventoryBackground: [0, 0]
        });
        this.background = Crafty.e("2D, DOM, InventoryBackground")
            .attr({ x: offsetX, y: offsetY, w: width, h: height, z: 5000 });
        this.description = Crafty.e("2D, DOM, Text")
            .attr({ x: offsetX, y: offsetY + height - descriptHeight, w: width, h: descriptHeight, z: 5000 })
            .css({
                "text-align": "left",
                "font-family": "Arial, Helvetica, sans-serif",
                "font-size": "300%",
                "padding-left": "5px",
                "padding-right": "5px",
                "color": "#FFFFFF"
            });
        this.backgroundWidth = width;
        this.backgroundHeight = height;
        this.tilesize = tilesizepx;
        this.backgroundXOffset = offsetX;
        this.backgroundYOffsent = offsetY;
        this.columns = Math.floor(width / this.tilesize);
        this.rows = Math.floor(height / this.tilesize);
        this.descriptionHeight = descriptHeight;
        this.Close();
        return this;
    },

    /**
	 * IsActive
	 *  
	 * @return {boolean} background.visible - other conditions may apply in the future	
	 */

    IsActive: function () {
        return this.background.visible;
    },

    /**
	 * Open
	 *  
	 * Sets all elements (background, description, and items) to visible (also making IsActive Return true in the process)
     * Sets first Item as Selected Item
	 */
    Open: function (x, y) {
        var i = 0,
            max = 0;
        this.background.x = -x;
        this.background.y = -y;
        this.description.x = this.background.x;
        this.description.y = this.background.y + this.background.h - this.description.h;
        this.description.visible = true;
        this.background.visible = true;

        for (i = 0, max = this.items.length; i < max; i = i + 1) {
            if (i === 0) {
                this.items[0].visible = true;
                this.items[0].selected = true;
                this.description.text(this.items[0].description);
                this.selectedItemIndex = 0;
            } else {
                this.items[i].visible = true;
                this.items[i].selected = false;
            }
            this.items[i].z = this.background.z + i;
            this.items[i].x = this.background.x + i % this.columns * this.tilesize;
            this.items[i].y = this.background.y + (Math.floor(i / this.columns) * this.tilesize);
            this.items[i].w = this.tilesize;
            this.items[i].h = this.tilesize;
        }

    },

    /**
	 * Close
	 *  
	 * Sets all elements (background, description, and items) to invisible (also making IsActive Return true in the process)
	 */
    Close: function () {
        var i = 0,
            max = 0;

        this.background.visible = false;
        this.description.visible = false;
        for (i = 0, max = this.items.length; i < max; i = i + 1) {
            this.items[i].visible = false;
        }
    },



    /**
	 * UseItemFromMenu
	 *  
     * if inventory is active, use the selected item
	 */
    UseItemFromMenu: function () {
        if (this.IsActive()) {
            this.items[this.selectedItemIndex].Use();
        }
    },

    /**
	 * UseItemFromMenuWithElectricity
	 *  
     * if inventory is active, use the selected item's Electricity Function
	 */
    UseItemFromMenuWithElectricity: function () {
        if (this.IsActive()) {
            this.items[this.selectedItemIndex].UseWithElectricity();
        }
    },


    /**
	 * MoveSelectedItem
	 *  
     * @param {string} direction - what direction is the selected item to move
	 */
    MoveSelectedItem: function (direction) {
        var itemLength = this.items.length;

        if (this.IsActive() && itemLength > 1) {
            this.items[this.selectedItemIndex].selected = false;
            switch (direction) {
                case "right":
                    if (this.selectedItemIndex + 1 < itemLength && this.items[this.selectedItemIndex].x < this.items[this.selectedItemIndex + 1].x) {
                        this.items[this.selectedItemIndex + 1].visible = true;
                        this.items[this.selectedItemIndex + 1].selected = true;
                        this.description.text(this.items[this.selectedItemIndex + 1].description);
                        this.selectedItemIndex = this.selectedItemIndex + 1;
                    } else {
                        this.items[this.selectedItemIndex - this.selectedItemIndex % this.columns].visible = true;
                        this.items[this.selectedItemIndex - this.selectedItemIndex % this.columns].selected = true;
                        this.description.text(this.items[this.selectedItemIndex - this.selectedItemIndex % this.columns].description);
                        this.selectedItemIndex = this.selectedItemIndex - this.selectedItemIndex % this.columns;
                    }
                    break;
                case "left":
                    if (this.selectedItemIndex - 1 >= 0 && this.items[this.selectedItemIndex].x > this.items[this.selectedItemIndex - 1].x) {
                        this.items[this.selectedItemIndex - 1].visible = true;
                        this.items[this.selectedItemIndex - 1].selected = true;
                        this.description.text(this.items[this.selectedItemIndex - 1].description);
                        this.selectedItemIndex = this.selectedItemIndex - 1;
                    } else if (itemLength > this.columns && itemLength > this.selectedItemIndex - 1 + this.columns) {
                        this.items[this.selectedItemIndex - 1 + this.columns].visible = true;
                        this.items[this.selectedItemIndex - 1 + this.columns].selected = true;
                        this.description.text(this.items[this.selectedItemIndex - 1 + this.columns].description);
                        this.selectedItemIndex = this.selectedItemIndex - 1 + this.columns;
                    } else {
                        this.items[itemLength - 1].visible = true;
                        this.items[itemLength - 1].selected = true;
                        this.description.text(this.items[itemLength - 1].description);
                        this.selectedItemIndex = itemLength - 1;
                    }
                    break;
                case "up":
                    if (this.selectedItemIndex - this.columns >= 0) {
                        this.items[this.selectedItemIndex - this.columns].visible = true;
                        this.items[this.selectedItemIndex - this.columns].selected = true;
                        this.description.text(this.items[this.selectedItemIndex - this.columns].description);
                        this.selectedItemIndex = this.selectedItemIndex - this.columns;
                    } else if (itemLength % this.columns >= this.selectedItemIndex % this.columns) {
                        this.items[itemLength - itemLength % this.columns + this.selectedItemIndex % this.columns].visible = true;
                        this.items[itemLength - itemLength % this.columns + this.selectedItemIndex % this.columns].selected = true;
                        this.description.text(this.items[itemLength - itemLength % this.columns + this.selectedItemIndex % this.columns].description);
                        this.selectedItemIndex = itemLength - itemLength % this.columns + this.selectedItemIndex % this.columns;
                    } else {
                        this.items[itemLength - itemLength % this.columns - this.columns + this.selectedItemIndex % this.columns].visible = true;
                        this.items[itemLength - itemLength % this.columns - this.columns + this.selectedItemIndex % this.columns].selected = true;
                        this.description.text(this.items[itemLength - itemLength % this.columns - this.columns + this.selectedItemIndex % this.columns].description);
                        this.selectedItemIndex = itemLength - itemLength % this.columns - this.columns + this.selectedItemIndex % this.columns;
                    }
                    break;
                case "down":
                    if (this.selectedItemIndex + this.columns < itemLength) {
                        this.items[this.selectedItemIndex + this.columns].visible = true;
                        this.items[this.selectedItemIndex + this.columns].selected = true;
                        this.description.text(this.items[this.selectedItemIndex + this.columns].description);
                        this.selectedItemIndex = this.selectedItemIndex + this.columns;
                    } else {
                        this.items[this.selectedItemIndex % this.columns].visible = true;
                        this.items[this.selectedItemIndex % this.columns].selected = true;
                        this.description.text(this.items[this.selectedItemIndex % this.columns].description);
                        this.selectedItemIndex = this.selectedItemIndex % this.columns;
                    }
                    break;
            }
        }
    },


    /**
	 * AddItem
	 * 	
	 * @param {Object} item - item to be added to the inventory array
     *
     * Also adds the item to the end of the visual list if the inventory is active
	 */
    AddItem: function (item) {
        item.visible = this.IsActive();

        if (this.IsActive()) {
            item.z = this.background.z + this.items.length;
            item.x = this.background.x + ((this.items.length % ((this.backgroundWidth - this.backgroundWidth % this.tilesize) / this.tilesize)) * this.tilesize);
            item.y = this.background.y + (Math.floor(this.items.length / ((this.backgroundWidth - this.backgroundWidth % this.tilesize) / this.tilesize)) * this.tilesize);
            item.w = this.tilesize;
            item.h = this.tilesize;
        }
        this.items.push(item);
    },


    /**
	 * RemoveItem
	 * 	
	 * @param {string} component - component name that the item should have that you are removing
     *
     * Also takes the item from the visual list if the inventory is active
	 */
    RemoveItem: function (component) {
        var i = 0,
            max = this.items.length;
        for (i = 0; i < max; i = i + 1) {
            if (this.items[i].has(component)) {
                this.items[i].destroy();
                this.items.splice(i, 1);
                break;
            }
        }

        for (i = 0; i < max; i = i + 1) {
            this.items[i].x = this.background.x + ((i % ((this.backgroundWidth - this.backgroundWidth % this.tilesize) / this.tilesize)) * this.tilesize);
            this.items[i].y = this.background.y + (Math.floor(i / ((this.backgroundWidth - this.backgroundWidth % this.tilesize) / this.tilesize)) * this.tilesize);
        }
    }



}

