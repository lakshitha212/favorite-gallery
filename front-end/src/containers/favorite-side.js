import FavoriteSide from '../components/FavoriteSide'
import { connect } from 'react-redux'
const mapStateToProps = state => ({
    data: state.favoriteImages
})
const mapDispatchToProps = dispatch => ({
})
export default connect(mapStateToProps, mapDispatchToProps)(FavoriteSide)
