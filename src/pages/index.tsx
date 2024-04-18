import React, { useState } from "react";

// Define types for rarity object
type Rarity = {
  value: number;
  color: string;
};

// Define type for item type rarity values
type ItemTypeRarityValues = {
  [itemType: string]: {
    [rarity: string]: Rarity;
  };
}[];

const itemTypeRarityValues = [
  {
    TwoHand: {
      Junk: { value: 15, color: "text-gray-400" },
      Poor: { value: 22, color: "text-gray-600" },
      Common: { value: 30, color: "text-gray-900" },
      Uncommon: { value: 45, color: "text-green-400" },
      Rare: { value: 60, color: "text-blue-300" },
      Epic: { value: 90, color: "text-purple-400" },
      Legendary: { value: 120, color: "text-yellow-400" },
      Unique: { value: 175, color: "text-amber-400" },
    },
  },
  {
    OneHandMain: {
      Junk: { value: 9, color: "text-gray-400" },
      Poor: { value: 13, color: "text-gray-600" },
      Common: { value: 18, color: "text-gray-900" },
      Uncommon: { value: 27, color: "text-green-400" },
      Rare: { value: 36, color: "text-blue-300" },
      Epic: { value: 54, color: "text-purple-400" },
      Legendary: { value: 72, color: "text-yellow-400" },
      Unique: { value: 125, color: "text-amber-400" },
    },
  },
  {
    OneHandOff: {
      Junk: { value: 7, color: "text-gray-400" },
      Poor: { value: 10, color: "text-gray-600" },
      Common: { value: 14, color: "text-gray-900" },
      Uncommon: { value: 21, color: "text-green-400" },
      Rare: { value: 28, color: "text-blue-300" },
      Epic: { value: 42, color: "text-purple-400" },
      Legendary: { value: 56, color: "text-yellow-400" },
      Unique: { value: 100, color: "text-amber-400" },
    },
  },
  {
    HandHeadFeet: {
      Junk: { value: 4, color: "text-gray-400" },
      Poor: { value: 6, color: "text-gray-600" },
      Common: { value: 8, color: "text-gray-900" },
      Uncommon: { value: 12, color: "text-green-400" },
      Rare: { value: 16, color: "text-blue-300" },
      Epic: { value: 24, color: "text-purple-400" },
      Legendary: { value: 32, color: "text-yellow-400" },
      Unique: { value: 40, color: "text-amber-400" },
    },
  },
  {
    ChestLegBack: {
      Junk: { value: 5, color: "text-gray-400" },
      Poor: { value: 7, color: "text-gray-600" },
      Common: { value: 10, color: "text-gray-900" },
      Uncommon: { value: 15, color: "text-green-400" },
      Rare: { value: 20, color: "text-blue-300" },
      Epic: { value: 30, color: "text-purple-400" },
      Legendary: { value: 40, color: "text-yellow-400" },
      Unique: { value: 50, color: "text-amber-400" },
    },
  },
  {
    Accessories: {
      Uncommon: { value: 9, color: "text-green-400" },
      Rare: { value: 12, color: "text-blue-300" },
      Epic: { value: 18, color: "text-purple-400" },
      Legendary: { value: 24, color: "text-yellow-400" },
      Unique: { value: 30, color: "text-amber-400" },
    },
  },
  {
    Utilities: {
      Junk: { value: 2, color: "text-gray-400" },
      Poor: { value: 3, color: "text-gray-600" },
      Common: { value: 4, color: "text-gray-900" },
      Uncommon: { value: 6, color: "text-green-400" },
      Rare: { value: 8, color: "text-blue-300" },
      Epic: { value: 12, color: "text-purple-400" },
      Legendary: { value: 16, color: "text-yellow-400" },
      Unique: { value: 20, color: "text-amber-400" },
    },
  },
];

export default function Home() {
  const [rarityQuantities, setRarityQuantities] = useState<{
    [key: string]: any;
  }>({});
  const [totalScore, setTotalScore] = useState(0);

  const handleQuantityChange = (
    itemType: string,
    rarity: string,
    quantity: number
  ) => {
    const updatedQuantities = {
      ...rarityQuantities,
      [itemType]: {
        ...rarityQuantities[itemType],
        [rarity]: quantity,
      },
    };
    setRarityQuantities(updatedQuantities);
  };

  const calculateTotalScore = () => {
    let totalScore = 0;

    itemTypeRarityValues.forEach((itemTypeObj) => {
      const itemType = Object.keys(itemTypeObj)[0];
      const rarities = itemTypeObj[itemType];

      let itemScore = 0;

      Object.entries(rarities).forEach(
        ([rarity, { value }]: [string, { value: number }]) => {
          const quantity = rarityQuantities[itemType]?.[rarity] || 0;
          itemScore += quantity * value;
        }
      );

      totalScore += itemScore;
    });

    setTotalScore(totalScore);
  };

  const resetScore = () => {
    setTotalScore(0);
    setRarityQuantities({});
  };

  const handleDecrement = (itemType: string, rarity: string) => {
    const currentQuantity = rarityQuantities[itemType]?.[rarity] || 0;
    const newQuantity = Math.max(0, currentQuantity - 1);
    handleQuantityChange(itemType, rarity, newQuantity);
  };

  const handleIncrement = (itemType: string, rarity: string) => {
    const currentQuantity = rarityQuantities[itemType]?.[rarity] || 0;
    const newQuantity = currentQuantity + 1;
    handleQuantityChange(itemType, rarity, newQuantity);
  };

  return (
    <main className="flex flex-col gap-2 items-center justify-center h-screen w-full">
      <p className="text-4xl">Dark and Darker Gear Calculator</p>
      <div className="flex items-center justify-center border-black border-2 p-10 shadow-xl rounded-md w-3/4">
        {itemTypeRarityValues.map((itemTypeObj, index) => {
          const itemType = Object.keys(itemTypeObj)[0];
          const rarities = itemTypeObj[itemType];

          return (
            <div key={index} className="w-full">
              <h2>{itemType}</h2>
              <table className="w-full">
                <thead>
                  <tr>
                    <th>Rarity</th>
                    <th className="w-1/4">#</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(rarities).map(
                    ([rarity, { value, color }]: [string, Rarity]) => (
                      <tr key={rarity} className="flex justify-between">
                        <td>
                          <p className={`${color}`}>{rarity}</p>
                        </td>
                        <td className="flex gap-2 items-center">
                          <button
                            className="w-10 h-10 bg-gray-400 rounded-md shadow-xl hover:bg-gray-200 transition-all duration-200"
                            onClick={() => handleDecrement(itemType, rarity)}
                          >
                            -
                          </button>
                          <span className="text-2xl">
                            {rarityQuantities[itemType]?.[rarity] || 0}
                          </span>
                          <button
                            className="w-10 h-10 bg-gray-400 rounded-md shadow-xl hover:bg-gray-200 transition-all duration-200"
                            onClick={() => handleIncrement(itemType, rarity)}
                          >
                            +
                          </button>
                        </td>
                      </tr>
                    )
                  )}
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
