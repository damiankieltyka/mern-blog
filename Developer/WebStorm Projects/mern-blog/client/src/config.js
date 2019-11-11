import { API_URL } from '../config';

export const loadPostsRequest = () => {
    return dispatch => {

        axios.get(`${API_URL}/posts`).then(res => {
            dispatch(loadPosts(res.data));
        })
            .catch(err => {
                console.log(err);
            });

    };
};

export const API_URL = 'http://localhost:8000/api';