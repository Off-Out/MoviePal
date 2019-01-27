import axios from 'axios';
// import config from '../config';

const YELP_API_KEY = 'QSmArIKWLEtUC3PsRCUX65qaG7LwKRuwI5xdspxireqe--_jo80bx3n6sDgcFG0yK2Zzye9XJ0rtBrEF6-vk3qO6liCG2XpkAiXp5uYseqwsEzKboIEgEzpfw9RIXHYx'

const api = axios.create({
	baseURL: 'https://api.yelp.com/v3',
	headers: {
		Authorization: `Bearer ${YELP_API_KEY}`
	}
});

export const getMovieTheater = (userLocation, filter = {}) => {
	return api
		.get('/businesses/search', {
			params: {
				limit: 10,
				categories: 'movie, movie-theaters, theater, cinema',
				...userLocation,
				...filter
			}
		})
		.then(res =>
			res.data.businesses.map(business => {
				return {
					name: business.name,
					coords: business.coordinates
				};
			})
		)
		.catch(error => console.error(error));
};

export default getMovieTheater;
