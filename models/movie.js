import { dbConnection } from "../config/db.js";

export const getMovies = async ({ search, genre, sortBy, sortOrder }) => {
  let query = `SELECT * FROM series_or_films WHERE 1=1`;
  const params = [];

  if (search) {
    query += ` AND title LIKE ?`;
    params.push(`%${search}%`);
  }

  if (genre) {
    query += ` AND genre = ?`;
    params.push(genre);
  }

  const validSortFields = ["id", "title", "release_date", "rating"]; 
  const validOrder = ["asc", "desc"];

  if (
    validSortFields.includes(sortBy) &&
    validOrder.includes(sortOrder.toLowerCase())
  ) {
    query += ` ORDER BY ${sortBy} ${sortOrder.toUpperCase()}`;
  }

  const [rows] = await dbConnection.query(query, params);
  return rows;
};

export const getMovieById = async (id) => {
  const [row] = await dbConnection.query(
    "SELECT * FROM series_or_films WHERE id=?",
    [id]
  );
  return row[0];
};

export const getSeries = async () => {
  const [row] = await dbConnection.query(
    "SELECT * FROM series_or_films WHERE type = 'series'"
  );
  return row;
};

export const getFilms = async () => {
  const [row] = await dbConnection.query(
    "SELECT * FROM series_or_films WHERE type = 'film'"
  );
  return row;
};

export const addMovie = async (
  title,
  description,
  rating,
  release_date,
  type,
  genre_id,
  thumbnail_url
) => {
  const [result] = await dbConnection.query(
    "INSERT INTO series_or_films (title,description,rating,release_date,type,genre_id,thumbnail_url) VALUES (?,?,?,?,?,?,?)",
    [title, description, rating, release_date, type, genre_id, thumbnail_url]
  );
  return result;
};

export const updateMovie = async (id, data) => {
  const keys = Object.keys(data);
  const values = Object.values(data);

  if (keys.length === 0) throw new Error("No data to update");

  const setClause = keys.map((key) => `${key} = ?`).join(", ");
  const query = `UPDATE series_or_films SET ${setClause} WHERE id = ?`;

  const [result] = await dbConnection.query(query, [...values, id]);
  return result;
};

export const deleteMovie = async (id) => {
  const [result] = await dbConnection.query(
    "DELETE FROM series_or_films WHERE id=?",
    [id]
  );
  return result;
};
