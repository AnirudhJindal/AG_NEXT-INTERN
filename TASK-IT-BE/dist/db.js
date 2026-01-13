"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.linkModel = exports.contentModel = exports.tagsModel = exports.userModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, model, Types } = mongoose_1.default;
const contentTypes = ["image", "video", "article", "audio", "youtube", "twitter"];
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});
const tagsSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    }
});
const contentSchema = new Schema({
    link: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: contentTypes,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    tags: [{
            type: Types.ObjectId,
            ref: "tags",
            validate: {
                validator: function (value) {
                    return __awaiter(this, void 0, void 0, function* () {
                        const tag = yield exports.tagsModel.findById(value);
                        return !!tag;
                    });
                },
                message: (props) => `Tag not valid: ${props.value}`
            }
        }],
    userId: {
        type: Types.ObjectId,
        ref: "user",
        validate: {
            validator: function (value) {
                return __awaiter(this, void 0, void 0, function* () {
                    const user = yield exports.userModel.findById(value);
                    return !!user;
                });
            },
            message: (props) => `User ID not valid: ${props.value}`
        }
    }
});
const linkSchema = new Schema({
    hash: {
        type: String,
        required: true
    },
    userId: {
        type: Types.ObjectId,
        ref: "user",
        validate: {
            validator: function (value) {
                return __awaiter(this, void 0, void 0, function* () {
                    const user = yield exports.userModel.findById(value);
                    return !!user;
                });
            },
            message: (props) => `User ID not valid: ${props.value}`
        }
    }
});
exports.userModel = model("user", userSchema);
exports.tagsModel = model("tags", tagsSchema);
exports.contentModel = model("content", contentSchema);
exports.linkModel = model("link", linkSchema);
