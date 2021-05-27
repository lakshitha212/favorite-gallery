import GallerySide from '../components/GallerySide'
import { connect } from 'react-redux'
import { addToFavorite } from '../redux/actions'

const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => ({
    addFavoriteHandler: (data, actionType) => dispatch(addToFavorite(data, actionType))
    
})
export default connect(mapStateToProps, mapDispatchToProps)(GallerySide)



