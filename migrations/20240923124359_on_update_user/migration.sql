-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Ride" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "originAddress" TEXT NOT NULL,
    "destinationAddress" TEXT NOT NULL,
    "originLatitude" DECIMAL NOT NULL,
    "originLongitude" DECIMAL NOT NULL,
    "destinationLatitude" DECIMAL NOT NULL,
    "destinationLongitude" DECIMAL NOT NULL,
    "rideTime" INTEGER NOT NULL,
    "farePrice" DECIMAL NOT NULL,
    "paymentStatus" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "driverId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Ride_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE NO ACTION,
    CONSTRAINT "Ride_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Driver" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Ride" ("createdAt", "destinationAddress", "destinationLatitude", "destinationLongitude", "driverId", "farePrice", "id", "originAddress", "originLatitude", "originLongitude", "paymentStatus", "rideTime", "updatedAt", "userId") SELECT "createdAt", "destinationAddress", "destinationLatitude", "destinationLongitude", "driverId", "farePrice", "id", "originAddress", "originLatitude", "originLongitude", "paymentStatus", "rideTime", "updatedAt", "userId" FROM "Ride";
DROP TABLE "Ride";
ALTER TABLE "new_Ride" RENAME TO "Ride";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
