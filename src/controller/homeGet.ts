import { Request, Response } from "express";
import axios from "axios";
import { log } from "console";
import pool from "../model/database";
import { User } from "../interface/userInterface";
import "dotenv/config";
export const homeGet = async (req: Request, res: Response) => {
  try {
    log(process.env.APIKEY, "apikey is loading");
    const APIKEY = process.env.APIKEY;
    const result = await axios.get(
      `http://www.omdbapi.com/?s=fightclub&apikey=${APIKEY}`,
    );

    let imdbID = result.data.Search[0].imdbID;
    log(result.data.Search[0].imdbID, "result is showing");
    const output = await axios.get(
      `http://www.omdbapi.com/?i=${imdbID}&apikey=${APIKEY}`,
    );
    log(output.data);
    res.send(output.data);
  } catch (error) {
    console.log(error, "Error is showng in Home Get controller");
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
