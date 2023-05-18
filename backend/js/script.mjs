// import commonjs from "@rollup/plugin-commonjs";


// Function to modify array of likes or dislikes
export function modifyArray (usersArray, userId, option){
    if (usersArray.length !== 0) {
      for (let i = 0; i < usersArray.length; i++) {
        if (option === 'Delete') {
          if (usersArray[i] === userId) {
            let index = i;
            usersArray.splice(index, 1);
            return usersArray;
          }
        }
        if (option === 'Add') {
          usersArray.push(userId);
          return usersArray;
        }
      }
    } else {
      usersArray.push(userId);
      return usersArray;
    }
};

// Function to check if the user that is liking or disliking is in the array.
export function exitsUser (usersArray, userId){
    if (usersArray.length !== 0) {
      for (let i = 0; i < usersArray.length; i++) {
        if (usersArray[i] === userId) {
          return true;
        }
      }
      return false; // or true
    }
};

// FUNCTION TO CHECK PHONENUMBER
export function checkPhoneNumber(inputtxt){
    const phoneno = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
    const arr = { conditional: false, message: "" };
    const coincidence = inputtxt.match(phoneno);
  
    if (coincidence) {
      arr.conditional = true;
      return arr;
    } else {
      arr.message = "Phone number is not matching!";
      return arr;
    }
};

export function checkPassword(inputtxt) {
    if (!inputtxt) {
      return { conditional: false, message: "No password provided" };
    }
    // Password more than 6 and less than 20 characters
    const passw = /^(.{6,20})/g;
    // Password must contain a number
    const passw1 = /^(?=.*\d)/g;
    // Password must contain at least 1 lower letter
    const passw2 = /^(?=.*[a-z])/g;
    // Password must contain at least 1 capital letter
    const passw3 = /^(?=.*[A-Z])/g;
  
    const arr = {conditional : false, message: "Your password must have "};
    const coincidence = inputtxt.match(passw);
    const coincidence1 = inputtxt.match(passw1);
    const coincidence2 = inputtxt.match(passw2);
    const coincidence3 = inputtxt.match(passw3);
  
    if(coincidence && coincidence1 && coincidence2 && coincidence3) {
      arr.conditional = true;
      arr.message = "";
      return arr;
    }
    if (!coincidence){
      arr.message += "more than 6 and less than 20 characters";
    }
    if(!coincidence1){
      arr.message += "contain at least a number";
    }
    if(!coincidence2){
      arr.message += "1 lower letter";
    }
    if(!coincidence3){
      arr.message += "1 capital letter";
    }
    return arr;
};
  
  
  export default { checkPhoneNumber, checkPassword, modifyArray, exitsUser };