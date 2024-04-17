import React, { useState } from "react";

const itemTypeRarityValues = [
  {
    TwoHand: {
      Junk: 15,
      Poor: 22,
      Common: 30,
      Uncommon: 45,
      Rare: 60,
      Epic: 90,
      Legendary: 120,
      Unique: 175,
    },
  },
  {
    OneHandMain: {
      Junk: 9,
      Poor: 13,
      Common: 18,
      Uncommon: 27,
      Rare: 36,
      Epic: 54,
      Legendary: 72,
      Unique: 125,
    },
  },
  {
    OneHandOff: {
      Junk: 7,
      Poor: 10,
      Common: 14,
      Uncommon: 21,
      Rare: 28,
      Epic: 42,
      Legendary: 56,
      Unique: 100,
    },
  },
  {
    HandHeadFeet: {
      Junk: 4,
      Poor: 6,
      Common: 8,
      Uncommon: 12,
      Rare: 16,
      Epic: 24,
      Legendary: 32,
      Unique: 40,
    },
  },
  {
    ChestLegBack: {
      Junk: 5,
      Poor: 7,
      Common: 10,
      Uncommon: 15,
      Rare: 20,
      Epic: 30,
      Legendary: 40,
      Unique: 50,
    },
  },
  {
    Accessories: {
      Uncommon: 9,
      Rare: 12,
      Epic: 18,
      Legendary: 24,
      Unique: 30,
    },
  },
  {
    Utilities: {
      Junk: 2,
      Poor: 3,
      Common: 4,
      Uncommon: 6,
      Rare: 8,
      Epic: 12,
      Legendary: 16,
      Unique: 20,
    },
  },
];

export default function Home() {
  const [rarityQuantities, setRarityQuantities] = useState({});
  const [totalScore, setTotalScore] = useState(0);

  const handleQuantityChange = (itemType: any, rarity: any, quantity: any) => {
    const updatedQuantities = {
      ...rarityQuantities,
      [itemType]: {
        ...rarityQuantities[itemType],
        [rarity]: quantity,
      },
    };
    setRarityQuantities(updatedQuantities);
  };

  type ItemTypeRarityValues = {
    [itemType: string]: { [rarity: string]: number };
  };
  type RarityQuantities = { [itemType: string]: { [rarity: string]: number } };

  const calculateTotalScore = () => {
    let totalScore: number = 0;

    itemTypeRarityValues.forEach((itemTypeObj: ItemTypeRarityValues) => {
      const itemType = Object.keys(itemTypeObj)[0];
      const rarities = itemTypeObj[itemType];

      let itemScore: number = 0;

      Object.entries(rarities).forEach(([rarity, value]: [string, number]) => {
        const quantity: number = rarityQuantities[itemType]?.[rarity] || 0;
        itemScore += quantity * value;
      });

      totalScore += itemScore;
    });

    setTotalScore(totalScore); // Assuming setTotalScore is properly defined elsewhere
  };

  const resetScore = () => {
    setTotalScore(0);
  };

  return (
    <main className="flex flex-col gap-2 items-center justify-center h-screen w-full">
      <p>Dark and Darker Gear Calculator</p>
      <div className="flex w-full items-center justify-center">
        {itemTypeRarityValues.map((itemTypeObj, index) => {
          const itemType = Object.keys(itemTypeObj)[0];
          const rarities = itemTypeObj[itemType];

          return (
            <div key={index}>
              <h2>{itemType}</h2>
              <table>
                <thead>
                  <tr>
                    <th>Rarity</th>
                    <th className="w-1/4">#</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(rarities).map(([rarity, value]) => (
                    <tr key={rarity}>
                      <td>{rarity}</td>
                      <td>
                        <input
                          className="w-1/2"
                          type="number"
                          min="0"
                          value={rarityQuantities[itemType]?.[rarity] || 0}
                          onChange={(e) =>
                            handleQuantityChange(
                              itemType,
                              rarity,
                              parseInt(e.target.value)
                            )
                          }
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        })}
      </div>
      <div className="flex flex-col gap-4">
        <button onClick={calculateTotalScore} className="text-4xl">
          Calculate Total Score
        </button>
        <button className="text-4xl" onClick={() => resetScore()}>
          Reset Score
        </button>
      </div>
      <div>
        <p className="text-8xl text-green-400">{totalScore}</p>
      </div>
    </main>
  );
}
