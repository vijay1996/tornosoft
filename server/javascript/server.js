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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var cors = require("cors");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var models_1 = require("./models");
var functions_1 = require("./functions");
var errors_1 = require("./errors");
var app = express();
app.use(bodyParser());
var corsOptions = {
    origin: '*'
};
app.use(cors(corsOptions));
app.use('/static', express.static(__dirname + '/client/build/static'));
(0, models_1.main)().catch(function (err) { return console.log(err); });
var PORT = 8000;
app.get('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        res.sendFile('/client/build/index.html', { root: __dirname });
        return [2 /*return*/];
    });
}); });
//this is the signup module
app.post('/signup', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userInfo, users, User, userData;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userInfo = req.body;
                return [4 /*yield*/, (0, functions_1.returnUser)(userInfo)];
            case 1:
                users = _a.sent();
                if (!(users.length === 0)) return [3 /*break*/, 3];
                User = mongoose.model('user', models_1.userSchema);
                userData = new User(userInfo);
                return [4 /*yield*/, userData.save()];
            case 2:
                _a.sent();
                res.send({ response: "success" });
                return [3 /*break*/, 4];
            case 3:
                res.send({ error: errors_1.errors.english.userExists });
                _a.label = 4;
            case 4: return [2 /*return*/];
        }
    });
}); });
app.post('/login', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userInfo, users;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userInfo = req.body;
                return [4 /*yield*/, (0, functions_1.returnUser)(userInfo)];
            case 1:
                users = _a.sent();
                if (users && users.length && Array.isArray(users)) {
                    users.map(function (user) {
                        if (user.password === userInfo.password) {
                            res.send({ response: "logged in" });
                        }
                    });
                    res.send({ response: errors_1.errors.english.wrongPassword });
                }
                res.send({ response: errors_1.errors.english.userDoesNotExist });
                return [2 /*return*/];
        }
    });
}); });
app.get('/showDocuments', function (req, res) {
    var Users = mongoose.model('user', models_1.userSchema);
    Users.find({}, function (err, users) {
        if (err)
            res.send(err);
        res.send(users);
    });
});
app.listen(PORT, function () {
    console.log("[server]: running at http://localhost:" + PORT);
});
