const featNames = new Map();
featNames.set("shift-0", 0);
featNames.set("feeble", 1);
featNames.set("poor", 2);
featNames.set("typical", 3);
featNames.set("good", 4);
featNames.set("excellent", 5);
featNames.set("remarkable", 6);
featNames.set("incredible", 7);
featNames.set("amazing", 8);
featNames.set("monstrous", 9);
featNames.set("unearthly", 10);
featNames.set("shift-x", 11);
featNames.set("shift-y", 12);
featNames.set("shift-z", 13);
featNames.set("class-1000", 14);
featNames.set("class-3000", 15);
featNames.set("class-5000", 16);
featNames.set("beyond", 17);

const featNumbers = new Map();
featNumbers.set(0, 0);
featNumbers.set(2, 1);
featNumbers.set(4, 2);
featNumbers.set(6, 3);
featNumbers.set(10, 4);
featNumbers.set(20, 5);
featNumbers.set(30, 6);
featNumbers.set(40, 7);
featNumbers.set(50, 8);
featNumbers.set(75, 9);
featNumbers.set(100, 10);
featNumbers.set(150, 11);
featNumbers.set(250, 12);
featNumbers.set(500, 13);
featNumbers.set(1000, 14);
featNumbers.set(3000, 15);
featNumbers.set(5000, 16);

const featRolls = [
    {green: 66, yellow: 95, red: 100},
    {green: 61, yellow: 91, red: 100},
    {green: 56, yellow: 86, red: 100},
    {green: 51, yellow: 81, red: 98},
    {green: 46, yellow: 76, red: 98},
    {green: 41, yellow: 71, red: 95},
    {green: 36, yellow: 66, red: 95},
    {green: 31, yellow: 61, red: 91},
    {green: 26, yellow: 56, red: 91},
    {green: 21, yellow: 51, red: 86},
    {green: 16, yellow: 46, red: 86},
    {green: 11, yellow: 41, red: 81},
    {green: 07, yellow: 41, red: 81},
    {green: 04, yellow: 36, red: 76},
    {green: 02, yellow: 36, red: 76},
    {green: 02, yellow: 31, red: 71},
    {green: 02, yellow: 26, red: 66},
    {green: 02, yellow: 21, red: 61}
];

module.exports.featNames = featNames;
module.exports.featNumbers = featNumbers;
module.exports.featRolls = featRolls;