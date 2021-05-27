import { ADD_TO_FAVORITE } from './constants'
export const addToFavorite = (data) => {
    return {
        type: ADD_TO_FAVORITE,
        data: data
    }
}
