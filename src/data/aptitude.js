export const aptitude = [
  {
    id: "apt-1",
    category: "Aptitude",
    question: "A train running at the speed of 60 km/hr crosses a pole in 9 seconds. What is the length of the train?",
    difficulty: "Easy",
    answer: "Step 1: Convert speed from km/hr to m/s. \nSpeed = 60 * (5/18) = 50/3 m/s. \nStep 2: Use the formula: Distance = Speed * Time. \nLength (Distance) = (50/3) * 9 = 150 meters. \nTherefore, the length of the train is 150 meters.",
    tips: "Always convert speed to matching units (e.g. km/hr to m/s by multiplying by 5/18)."
  },
  {
    id: "apt-2",
    category: "Aptitude",
    question: "A and B together can complete a piece of work in 4 days. If A alone can complete it in 12 days, in how many days can B alone complete the work?",
    difficulty: "Easy",
    answer: "Step 1: Calculate the work done by A and B together in 1 day = 1/4. \nStep 2: Calculate the work done by A alone in 1 day = 1/12. \nStep 3: Work done by B alone in 1 day = (1/4) - (1/12) = (3 - 1)/12 = 2/12 = 1/6. \nTherefore, B alone can complete the work in 6 days.",
    tips: "Use the unit work method: 1/Total = 1/A + 1/B."
  },
  {
    id: "apt-3",
    category: "Aptitude",
    question: "A sum of money at simple interest amounts to $815 in 3 years and to $854 in 4 years. What is the principal sum?",
    difficulty: "Medium",
    answer: "Step 1: Simple Interest (SI) for 1 year = Amount in 4 years - Amount in 3 years = 854 - 815 = $39. \nStep 2: SI for 3 years = 39 * 3 = $117. \nStep 3: Principal = Amount in 3 years - SI for 3 years = 815 - 117 = $698. \nTherefore, the principal sum is $698.",
    tips: "In simple interest, the interest earned each year remains constant."
  },
  {
    id: "apt-4",
    category: "Aptitude",
    question: "Find the odd one out: 3, 5, 11, 14, 17, 21, 23",
    difficulty: "Easy",
    answer: "Look at the numbers: 3, 5, 11, 17, 23 are prime numbers. \n14 and 21 are composite numbers. However, looking closely at prime vs composite, 14 is the only even number, but 21 is also composite. \nAnother logic: All numbers except 14 are odd. 14 is even. \nThus, 14 is the odd one out.",
    tips: "Check for parity (even/odd), primality, or sequence differences."
  },
  {
    id: "apt-5",
    category: "Aptitude",
    question: "A shopkeeper sells an item at a 20% discount but still makes a profit of 10%. If the cost price is $800, what is the marked price?",
    difficulty: "Hard",
    answer: "Step 1: Cost Price (CP) = $800. Profit = 10%. \nSelling Price (SP) = CP * (1 + Profit%) = 800 * 1.10 = $880. \nStep 2: SP is obtained after a 20% discount on Marked Price (MP). \nSP = MP * (1 - Discount%) => 880 = MP * 0.80. \nStep 3: MP = 880 / 0.80 = $1100. \nTherefore, the marked price is $1100.",
    tips: "Use the direct ratio formula: MP/CP = (100 + Profit%) / (100 - Discount%)."
  }
];
