const express = require('express');
const app = express();

app.use(express.json());

app.post('/bfhl', (req, res) => {
  try {
    const { data } = req.body;

    // User details (replace with your details)
    const full_name = "Himanshu"; // enter your name in lowercase with underscores
    const dob = "09102004"; // enter your date of birth in ddmmyyyy
    const email = "himanshu2022@vitbhopal.ac.in"; // your email
    const roll_number = "22BCE10118"; // your college roll number

    let odd_numbers = [];
    let even_numbers = [];
    let alphabets = [];
    let special_characters = [];
    let sum = 0;
    let alpha_concat = [];

    // Helper for alternating caps
    function alternatingCapsReverse(str) {
      let out = "", flip = true;
      for (let c of str.split('').reverse()) {
        out += flip ? c.toUpperCase() : c.toLowerCase();
        flip = !flip;
      }
      return out;
    }

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
    return res.status(200).json({
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

module.exports = app;
