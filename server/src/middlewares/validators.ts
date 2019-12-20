// import { Request } from "express";
import { check } from "express-validator/check";

const mobile = (value: string) => {
    // !!TODO
    return true;
};

export const usernamePassword = [
    check('username').isString(),
    check('password').isString(),
    check('username', "username can only be numbers and letters").isAlphanumeric("en-US"),
    check('username', "username can be between 5 and 20 in length").isLength({ min: 5, max: 20 }),
    check('password', "Password must be at least 8 characters").isLength({ min: 8 }),
];

export const userSignup = [
    check('username', "username can only be numbers and letters")
        .isAlphanumeric("en-US")
        .isLength({ min: 5, max: 20 }),
    check('password', "Password must be at least 8 characters").isLength({ min: 8 }),
    check('email', "An email must be provided").isEmail(),
];

export const updateUser = [
    check('username').optional({ nullable: true }).isString(),
    check('username', "username can be between 5 and 20 in length")
        .optional({ nullable: true }).isLength({ min: 5, max: 20 }),
    check('username', "username can only be numbers and letters")
        .optional({ nullable: true }).isAlphanumeric("en-US"),
    check('score').optional({ nullable: true }).isInt(),

];

export const ctfValidator = [
    check('version').isString(),
    check('about').isString(),
    check('startDate').isString().toDate(),
    check('finishDate').isString().toDate(),
];

export const updateCtf = [
    check('version').optional({ nullable: true }).isString(),
    check('about').optional({ nullable: true }).isString(),
    check('startDate').optional({ nullable: true }).isString().toDate(),
    check('finishDate').optional({ nullable: true }).isString().toDate(),
];
