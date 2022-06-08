import axios from 'axios';
export default function handler(req, res) {
  if (req.method === 'POST') {
    const body = req.body;

    axios
      .post('http://challenge-front-end.bovcontrol.com/v1/checkList', body)
      .then(function (response) {
        res.status(response.status).json(response.data);
      })
      .catch(function (error) {
        res.status(error.response.status).json(error.response.data);
      });
  } else if (req.method === 'PUT') {
    const body = req.body;

    axios
      .put(
        `http://challenge-front-end.bovcontrol.com/v1/checkList/${body.id}`,
        body
      )
      .then(function (response) {
        res.status(response.status).json(response.data);
      })
      .catch(function (error) {
        res.status(error.response.status).json(error.response.data);
      });
  } else if (req.method === 'DELETE') {
    const id = req.query.id;

    axios
      .delete(`http://challenge-front-end.bovcontrol.com/v1/checkList/${id}`)
      .then(function (response) {
        res.status(response.status).json(response.data);
      })
      .catch(function (error) {
        res.status(error.response.status).json(error.response.data);
      });
  }
}
