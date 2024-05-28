import { db } from "../connect.js";

export const addLike = (req, res) => {
  const { likes_user_id, likes_post_id } = req.body;

  db.query(
    "INSERT INTO likes SET ?",
    { likes_user_id, likes_post_id },
    (error) => {
      if (error) {
        console.log(error);
        return res.status(500).json({
          msg: "Aconteceu algum erro no servidor, tente novamente mais tarde.",
        });
      } else {
        return res.status(200).json({ msg: "Like realizado com sucesso!" });
      }
    }
  );
};

export const getLikes = (req, res) => {
  db.query(
    "SELECT l.*, u.username FROM likes AS l JOIN user AS u ON (u.id = l.likes_user_id) WHERE likes_post_id = ?",
    [req.query.likes_post_id],
    (error, data) => {
      if (error) {
        console.log(error);
        return res.status(500).json({
          msg: "Aconteceu algum erro no servidor, tente novamente mais tarde.",
        });
      } else if (data) {
        return res.status(200).json({ data });
      }
    }
  );
};

export const deleteLike = (req, res) => {
  const { likes_user_id, likes_post_id } = req.query;
  db.query(
    "DELETE FROM likes WHERE `likes_user_id` = ? AND `likes_post_id` = ?",
    [likes_user_id, likes_post_id],
    (error) => {
      if (error) {
        console.log(error);
        return res.status(500).json({
          msg: "Aconteceu algum erro no servidor, tente novamente mais tarde.",
        });
      } else {
        return res.status(200).json({ msg: "Like deletado com sucesso!" });
      }
    }
  );
};
