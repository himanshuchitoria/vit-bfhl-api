const express = require('express');
const app = express();

app.use(express.json());

// Helper for alternating caps in reverse
function alternatingCapsReverse(str) {
  let out = '', flip = true;
  for (let c of str.split('').reverse()) {
    out += flip ? c.toUpperCase() : c.toLowerCase();
    flip = !flip;
  }
  return out;
}

app.post('/bfhl', (req, res) => {
  try {
    const { data } = req.body;

    // User details (customize for your submission)
    const full_name = "himanshu";       // use lowercase, underscores if needed
    const dob = "09102004";             // ddmmyyyy format
    const email = "himanshu2022@vitbhopal.ac.in";
    const roll_number = "22BCE10118";

    let odd_numbers = [];
    let even_numbers = [];
    let alphabets = [];
    let special_characters = [];
    let sum = 0;
    let alpha_concat = [];

    for (let item of data) {
      if (/^\d+$/.test(item)) {
        let num = parseInt(item, 10);
        sum += num;
        (num % 2 === 0 ? even_numbers : odd_numbers).push(item);
      } else if (/^[a-zA-Z]+$/.test(item)) {
        alphabets.push(item.toUpperCase());
        alpha_concat.push(item);
      } else {
        special_characters.push(item);
      }
    }

    const concat_string = alternatingCapsReverse(alpha_concat.join(''));
    const response = {
      is_success: true,
      user_id: `${full_name}_${dob}`,
      email,
      roll_number,
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: sum.toString(),
      concat_string
    };

    res.status(200).json(response);

  } catch (error) {
    res.status(200).json({
      is_success: false,
      user_id: "error_user",
      email: "",
      roll_number: "",
      odd_numbers: [],
      even_numbers: [],
      alphabets: [],
      special_characters: [],
      sum: "0",
      concat_string: ""
    });
  }
});

// For local testing: only start server if not required as a module
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`API running locally on http://localhost:${PORT}/bfhl`);
  });
}

// Always export the app for Vercel
module.exports = app;
