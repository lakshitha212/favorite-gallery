import { ADD_TO_FAVORITE } from '../constants'

export default function favoriteImages(state = { }, action) {
    switch (action.type) {
        case ADD_TO_FAVORITE:
            return action.data 
        default:
            return state
    }


}
