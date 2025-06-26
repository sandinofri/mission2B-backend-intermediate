import {
  getMovies,
  addMovie,
  getSeries,
  getFilms,
  getMovieById,
  updateMovie,
  deleteMovie,
} from "../models/movie.js";

export const getMovieController = async (req, res) => {
  try {
     const { search, genre, sortBy = 'id', sortOrder = 'asc' } = req.query;
    const data = await getMovies({ search, genre, sortBy, sortOrder });
    return res.json({
      message: "success get data",
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      message: "server error " + error.message,
    });
  }
};

export const getMovieByIdController = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await getMovieById(id);
    if (!data) {
      return res.status(404).json({
        message: "NOT FOUND",
      });
    }
    return res.json({
      message: "success get data",
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      message: "server error " + error.message,
    });
  }
};

export const getSeriesController = async (req, res) => {
  try {
    const data = await getSeries();
    return res.status(200).json({
      message: "success get data series",
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      message: "server error " + error.message,
    });
  }
};

export const getFilmsController = async (req, res) => {
  try {
    const data = await getFilms();
    return res.status(200).json({
      message: "success get data films",
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      message: "server error " + error.message,
    });
  }
};

export const addMovieController = async (req, res) => {
  try {
    const {
      title,
      description,
      rating,
      release_date,
      type,
      genre_id,
      thumbnail_url,
    } = req.body;
    const response = await addMovie(
      title,
      description,
      rating,
      release_date,
      type,
      genre_id,
      thumbnail_url
    );
    return res.status(201).json({
      message: "success add data",
      data: {
        id: response.affectedRows,
        title,
        description,
        rating,
        release_date,
        type,
        genre_id,
        thumbnail_url,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const updateMovieController = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (!id) return res.status(400).json({ message: "required ID" });
    if (Object.keys(updateData).length === 0)
      return res.status(400).json({ message: "no data to update" });
    const result = await updateMovie(id, updateData);

    return res.status(200).json({
      message: "success update data",
      data:updateData,
      affectedRows: result.affectedRows,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteMovieController = async (req,res)=>{
  try {
    const {id} = req.params
    const result = await deleteMovie(id)
    return res.status(200).json({
      message:'success  delete data'
    })
  } catch (error) {
    return res.status(500).json({
      message:error.message
    })
  }
}
