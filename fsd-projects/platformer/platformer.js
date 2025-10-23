$(function () {
  // initialize canvas and context when able to
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  window.addEventListener("load", loadJson);

  function setup() {
    if (firstTimeSetup) {
      halleImage = document.getElementById("player");
      projectileImage = document.getElementById("projectile");
      cannonImage = document.getElementById("cannon");
      $(document).on("keydown", handleKeyDown);
      $(document).on("keyup", handleKeyUp);
      firstTimeSetup = false;
      //start game
      setInterval(main, 1000 / frameRate);
    }

    // Create walls - do not delete or modify this code
    createPlatform(-50, -50, canvas.width + 100, 50); // top wall
    createPlatform(-50, canvas.height - 10, canvas.width + 100, 200, "navy"); // bottom wall
    createPlatform(-50, -50, 50, canvas.height + 500); // left wall
    createPlatform(canvas.width, -50, 50, canvas.height + 100); // right wall

    //////////////////////////////////
    // ONLY CHANGE BELOW THIS POINT //
    //////////////////////////////////

    // TODO 1 - Enable the Grid
    // toggleGrid();

    // Procedural level generation
    const platformCount = 12;
    const minPlatformWidth = 100;
    const maxPlatformWidth = 300;
    let lastY = canvas.height - 120;
    // start platform
    createPlatform(30, canvas.height - 120, 320, 18, "#444");
    for (let i = 0; i < platformCount; i++) {
      const w =
        Math.floor(Math.random() * (maxPlatformWidth - minPlatformWidth)) +
        minPlatformWidth;
      const x = Math.floor(Math.random() * (canvas.width - w - 100)) + 50;
      lastY = Math.max(90, lastY - Math.floor(Math.random() * 140));
      createPlatform(x, lastY, w, 18, "#666");
      // 20% moving platforms
      if (Math.random() < 0.2) {
        platforms[platforms.length - 1].minX = Math.max(50, x - 120);
        platforms[platforms.length - 1].maxX = Math.min(
          canvas.width - w - 50,
          x + 120
        );
        platforms[platforms.length - 1].speed = Math.random() * 1.2 + 0.4;
      }
    }

    // Collectables
    for (let i = 0; i < 6; i++) {
      const p = platforms[Math.floor(Math.random() * platforms.length)];
      createCollectable(
        "diamond",
        p.x + 20 + Math.random() * Math.max(1, p.width - 60),
        p.y - 60,
        0.8,
        0.6
      );
    }

    // Spikes
    for (let i = 0; i < 10; i++) {
      const p = platforms[Math.floor(Math.random() * platforms.length)];
      createSpike(
        p.x + Math.random() * Math.max(1, p.width - 20),
        p.y - 10,
        24,
        16
      );
    }

    // Enemies
    for (let i = 0; i < 6; i++) {
      const p = platforms[Math.floor(Math.random() * platforms.length)];
      createEnemy(
        p.x + 20 + Math.random() * Math.max(1, p.width - 60),
        p.y - 50
      );
    }

    // Cannons (optional)
    if (Math.random() < 0.5) {
      createCannon("left", 200, 2000);
      createCannon("right", 600, 2400);
    }

    // Gravity flip: press 's' to flip player-only gravity
    document.addEventListener("keydown", function (e) {
      if (e.key.toLowerCase() === "s") {
        // flip only the player's gravity
        if (typeof playerGravity !== "undefined") {
          playerGravity = -playerGravity;
        }
      }
    });
    //////////////////////////////////
    // ONLY CHANGE ABOVE THIS POINT //
    //////////////////////////////////
  }

  registerSetup(setup);
});
