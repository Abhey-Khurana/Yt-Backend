import { User } from "../models/user.model.js";
import asyncHandler from "../utils/AsyncHandler.js"
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {


    const { email, fullName, username, password } = req.body;

    if ([email, fullName, username, password].some((field) => field.trim() === "")) {

        throw new ApiError(400, "ALL FIELDS ARE RREQUIRED");
    }


    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists");
    }


    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if (!avatar) {
        throw new ApiError(400, "Avatar file is required");
    }

    const user = await User.create({
        email,
        fullName,
        password,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        username: username.toLowerCase()
    })


    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "User is Not created");
    }

    res.status(201).json(
        new ApiResponse(200, createdUser, "USER REGISTERED SUCCESSFULLY!")
    );
})

const testingUser = function (req, res) {
    res.send({
        message: "USER ROUTE WORKING"
    }).json();
}

export { registerUser, testingUser }