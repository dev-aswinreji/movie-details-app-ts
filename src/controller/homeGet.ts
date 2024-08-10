import { Request, Response } from "express";
import axios from "axios";
import { log } from "console";
import pool from "../model/database";
import { User } from "../interface/userInterface";
import "dotenv/config";

const APIKEY = process.env.APIKEY;
export const homeGet = async (req: Request, res: Response) => {
  try {
    type movieName = string;
    const movieNames: string[] = ["Fight Club", "Inception", "Shutter Island"];

    const resultOfMovies = movieNames.map((movieName: movieName) =>
      axios.get(`http://www.omdbapi.com/?s=${movieName}&apikey=${APIKEY}`),
    );
    const movieDetailsId = await Promise.all(resultOfMovies);

    const responseQuery = movieDetailsId.map((movieName) =>
      axios.get(
        `http://www.omdbapi.com/?i=${movieName.data.Search[0].imdbID}&apikey=${APIKEY}`,
      ),
    );
    const responses = await Promise.all(responseQuery);
    const movieDetails = responses.map((data) => data.data);
    log(movieDetails, "movie details is showing");
    res.send(movieDetails);
  } catch (error) {
    console.log(error, "Error is occured in Home Get controller");
  }
};

export const movieSearchPost = async (req: Request, res: Response) => {
  try {
    const movieName: string = req.body.search;
    const movieDetailsAsQuery = await axios.get(
      `http://www.omdbapi.com/?s=${movieName}&apikey=${APIKEY}`,
    );

    const movieId: string = movieDetailsAsQuery.data.Search[0].imdbID;

    const movieDetails = await axios.get(
      `http://www.omdbapi.com/?i=${movieId}&apikey=${APIKEY}`,
    );

    res.json(movieDetails.data);
  } catch (error) {
    console.error("Error occured in movieSearch Post Method");
  }
};

export const signupPost = async (req: Request, res: Response) => {
  try {
    const userDetails: User = req.body;
    const queryAdding = await pool.query(
      `INSERT INTO customers (customer_name,customer_password,customer_email) values(${userDetails})`,
    );
    log(queryAdding, "adding to data base");
  } catch (error) {
    console.error("Error caught in Sign Up Post controller");
  }
};
