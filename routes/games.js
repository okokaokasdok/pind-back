const { sendAllGames, sendGameCreated, sendGameById, sendGameUpdated, sendGameDeleted }  = require('../controllers/games');
const { findAllGames, createGame, findGameById, updateGame, deleteGame, checkEmptyFields, checkIfUsersAreSafe, checkIfCategoriesAvaliable, checkIsGameExists, checkIsVoteRequest } = require('../middlewares/games');
const { checkAuth } = require("../middlewares/auth.js");

const gamesRouter = require('express').Router();

gamesRouter.get('/games', findAllGames, sendAllGames);
gamesRouter.post("/games", findAllGames, checkIsGameExists, checkIfUsersAreSafe, checkIfCategoriesAvaliable, checkEmptyFields, checkAuth, createGame, sendGameCreated);
gamesRouter.get("/games/:id", findGameById, sendGameById); 
gamesRouter.put("/games/:id", checkAuth, findGameById, checkIsVoteRequest, updateGame, sendGameUpdated);
gamesRouter.delete("/games/:id", checkAuth,  deleteGame, sendGameDeleted); 

module.exports = gamesRouter