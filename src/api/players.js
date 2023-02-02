import axios from "axios";

export function getPlayers() {
  return axios.get("http://localhost:3000/players").then((res) => res.data);
}

export function getPlayerLimit(limit) {
  return axios
    .get("http://localhost:3000/players", { params: { _limit: limit } })
    .then((res) => res.data);
}

export function getPlayer(id) {
  return axios
    .get(`http://localhost:3000/players/${id}`)
    .then((res) => res.data);
}

export function getClub(id) {
  return axios.get(`http://localhost:3000/clubs/${id}`).then((res) => res.data);
}
export function getClubs() {
  return axios.get(`http://localhost:3000/clubs`).then((res) => res.data);
}

export function createPlayer({
  name,
  number,
  position,
  country,
  clubId,
  image,
}) {
  return axios
    .post("http://localhost:3000/players", {
      id: crypto.randomUUID(),
      name,
      number,
      position,
      country,
      clubId,
      image,
    })
    .then((res) => res.data);
}
export function createClub({ name, country, stadium, capacity, website }) {
  return axios
    .post("http://localhost:3000/clubs", {
      id: crypto.randomUUID(),
      name,
      country,
      stadium,
      capacity,
      website,
    })
    .then((res) => res.data);
}
