import { ADD_TO_FAVORITE } from './constants'
export const addToFavorite = (data, actionType) => {
    return {
        type: ADD_TO_FAVORITE,
        data: data,
        actionType: actionType
    }
}
