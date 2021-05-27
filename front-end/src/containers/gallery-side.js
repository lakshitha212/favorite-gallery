import GallerySide from '../components/GallerySide'
import { connect } from 'react-redux'
import { addToFavorite } from '../redux/actions'

const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => ({
    addFavoriteHandler: data => dispatch(addToFavorite(data))
    
})
export default connect(mapStateToProps, mapDispatchToProps)(GallerySide)



