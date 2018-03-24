var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var scenes;
(function (scenes) {
    var Level3Scene = /** @class */ (function (_super) {
        __extends(Level3Scene, _super);
        // Public Properties
        // Constructor
        function Level3Scene() {
            var _this = _super.call(this) || this;
            _this.Start();
            return _this;
        }
        // Private Methods
        // Public Methods
        // Initialize Game Variables and objects
        Level3Scene.prototype.Start = function () {
            this._ocean = new objects.Ocean();
            this._plane = new objects.Plane();
            managers.Game.plane = this._plane;
            this._coin = new objects.Coin();
            this._island = new objects.Island();
            // instantiate the cloud array
            this._clouds = new Array();
            this._cloudNum = 3; //number of clouds in scene is 3 for level 3
            // loop and add each cloud to the array
            for (var count = 0; count < this._cloudNum; count++) {
                this._clouds[count] = new objects.Cloud();
            }
            this._engineSound = createjs.Sound.play("engine");
            this._engineSound.loop = -1; // play forever
            this._engineSound.volume = 0.3;
            // create the scoreboard UI for the Scene
            this._scoreBoard = new managers.ScoreBoard();
            managers.Game.scoreBoard = this._scoreBoard;
            this.Main();
        };
        // triggered every frame
        Level3Scene.prototype.Update = function () {
            var _this = this;
            this._ocean.Update();
            this._plane.Update();
            this._coin.x = this._island.x;
            this._coin.y = this._island.y;
            this._coin.Update();
            this._island.Update();
            // check collision between plane and coin
            managers.Collision.Check(this._plane, this._coin);
            this._clouds.forEach(function (cloud) {
                cloud.Update();
                // check collision between plane and current cloud
                managers.Collision.Check(_this._plane, cloud);
            });
            // if lives fall below zero switch scenes to the game over scene
            if (this._scoreBoard.Lives <= 0) {
                this._engineSound.stop();
                managers.Game.currentScene = config.Scene.OVER;
            }
        };
        // This is where the fun happens
        Level3Scene.prototype.Main = function () {
            var _this = this;
            // add the ocean to the scene
            this.addChild(this._ocean);
            // add the island to the scene
            this.addChild(this._island);
            // add the coin to the scene
            this.addChild(this._coin);
            // add the plane to the scene
            this.addChild(this._plane);
            this.addChild(this._plane.planeFlash); // add the plane flashing effect
            // add clouds to the scene
            this._clouds.forEach(function (cloud) {
                _this.addChild(cloud);
            });
            // add scoreboard labels to the scene
            this.addChild(this._scoreBoard.LivesLabel);
            this.addChild(this._scoreBoard.ScoreLabel);
        };
        return Level3Scene;
    }(objects.Scene));
    scenes.Level3Scene = Level3Scene;
})(scenes || (scenes = {}));
//# sourceMappingURL=Level3.js.map