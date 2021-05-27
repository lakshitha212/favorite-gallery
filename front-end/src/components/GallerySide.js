/**
 * {BACKEND_URL} - Keep backend API
 * 
 */
import _ from 'lodash'
import React, { Component } from "react";
import { BACKEND_URL } from '../redux/constants'

import '../App.css';
import { Grid, Icon, Header, Card, Placeholder } from 'semantic-ui-react'

// define HttpClient
const axios = require('axios');
class GallerySide extends Component {
    constructor(props) {
        super(props);
        /**
         * Manage state
         * @param {isLoading} - Simple indicator 
         * @param {card} - Object array. All the images are keep here
         * @param {favorites} - Object array. All the selected images are keep here
         */
        this.state = {
            userToken: localStorage.getItem("userToken"),
            isLoading: true,
            cards: [],
            favorites: []
        };
        this.dragId = '';

    }

    componentDidMount = () => {
        this.get_user();
    }



    handleClick(event, card) {
        const { addFavoriteHandler } = this.props

        axios.put(`${BACKEND_URL}update-entry?userToken=${localStorage.getItem("userToken")}`, {
            card: card
        }).then((result) => {
            this.setState(prevState => ({ cards: prevState.cards.map(el => (el.id === card.id ? { ...el, _isFavourite: (card._isFavourite ? false : true) } : el)) }))
            addFavoriteHandler(result.data.entries, "click")

        }).catch((e) => {

            this.setState({
                isLoading: false,
                e
            });
            alert(e.response.data.error)
        });
    }

    get_entries = async () => {
        const { favorites } = this.state
        this.setState({
            isLoading: true,
        });
        await axios.get(`${BACKEND_URL}get-entries?userToken=${localStorage.getItem("userToken")}`, {
        }).then((result) => {
            const entryArr = result.data.entries.entries
            const favoriteArr = favorites
            const filteredArray = entryArr.map(entry => favoriteArr.find(fav => fav.id === entry.id) || entry);

            this.setState({
                isLoading: false,
                cards: filteredArray,
            });

        }).catch((e) => {
            console.error(e);
            this.setState({
                isLoading: false,
                e
            });
        });

    };

    get_user = async () => {
        const { addFavoriteHandler } = this.props
        this.setState({
            isLoading: true,
        });
        await axios.post(`${BACKEND_URL}get-user`, {
            userToken: localStorage.getItem("userToken")
        }).then((result) => {
            this.setState({
                isLoading: false,
                userToken: result.data.user.id,
                favorites: result.data.user.favoriteEntries
            });

            if (!localStorage.getItem("userToken")) {
                localStorage.setItem('userToken', result.data.user.id);
            }
            addFavoriteHandler(result.data.user)

            this.get_entries();

        }).catch((e) => {
            console.error(e);
            this.setState({
                isLoading: false,
                e
            });
        });

    };

    render() {

        const { cards, isLoading } = this.state

        return <>
            <Grid.Column>
                {isLoading ? (<Placeholder>
                    <Placeholder.Line length='full' />
                </Placeholder>) :
                    (<Header as='h2'>Make Your Selection By Clicking <Icon name='heart' /></Header>)}


                <Card.Group doubling itemsPerRow={9} stackable >
                    {_.map(cards, (card) => (
                        <Card raised key={card.id}>
                            {isLoading ? (
                                <Placeholder>
                                    <Placeholder.Image square />
                                </Placeholder>
                            ) : (
                                <Card.Content
                                    style={{
                                        height: "100px",
                                        backgroundImage: `url(${card.picture})`,
                                        backgroundSize: "cover",
                                    }}
                                ></Card.Content>
                            )}

                            {isLoading ? (
                                <Placeholder>
                                </Placeholder>
                            ) : (
                                <Card.Content extra>
                                    {card._isFavourite ? (<Icon name='heart' className="red-heart" color="red" onClick={(e) => this.handleClick(e, card)} size="large" />) : (<Icon name='heart' className="red-heart" size="large" onClick={(e) => this.handleClick(e, card)} />)}

                                </Card.Content>
                            )}
                        </Card>
                    ))}
                </Card.Group>
            </Grid.Column>
        </>
    }
}
export default GallerySide

