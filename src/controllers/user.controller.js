import asyncHandler from "../utils/AsyncHandler.js"

const registerUser = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "USER REGISTERED" });

    // res.send({
    //     message:"USER REGISTERED"
    // }).json();
})

const testingUser = function (req, res) {
    res.send({
        message: "USER ROUTE WORKING"
    }).json();
}

export { registerUser, testingUser }