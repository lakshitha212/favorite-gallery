/**
 * {BACKEND_URL} - Keep backend API
 * 
 */
import _ from 'lodash'
import React, { Component } from "react";
import { BACKEND_URL, IMAGE_PATH, LOCAL_STORAGE_KEY } from '../redux/constants'

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
         */
        this.state = {
            userToken: '',
            isLoading: true,
            cards: [],
            entries: []
        };
        this.dragId = '';

    }

    componentDidMount = () => {
        this.get_entries();
    }



    handleClick(event, card) {
        const { addFavoriteHandler } = this.props
        const { userToken } = this.state
        axios.put(`${BACKEND_URL}update-entry?userToken=${userToken}`, {
            card: card
        }).then((result) => {
            this.setState(prevState => ({ cards: prevState.cards.map(el => (el.id === card.id ? { ...el, _isFavourite: (card._isFavourite ? false : true) } : el)) }))
            addFavoriteHandler(result.data.entries)

        }).catch((e) => {

            this.setState({
                isLoading: false,
                e
            });
            alert(e.response.data.error)
        });
    }

    get_entries = async () => {
        this.setState({
            isLoading: true,
        });
        await axios.get(`${BACKEND_URL}get-entries`, {
        }).then((result) => {
            this.setState({
                isLoading: false,
                entries: result.data.entries
            });
            this.checkUser()

        }).catch((e) => {
            console.error(e);
            this.setState({
                isLoading: false,
                e
            });
        });

    };

    checkUser = async () => {
        if (localStorage.key(LOCAL_STORAGE_KEY) && localStorage.getItem(LOCAL_STORAGE_KEY)) {
            this.setState({
                userToken: localStorage.getItem(LOCAL_STORAGE_KEY)
            });
            this.get_user()
        } else {
            this.create_user()
        }
    }

    create_user = async () => {
        this.setState({
            isLoading: true,
        });
        await axios.post(`${BACKEND_URL}create-user`, {
        }).then((result) => {
            localStorage.setItem(LOCAL_STORAGE_KEY, result.data.user.id);
            this.setState({
                isLoading: false,
                userToken: result.data.user.id
            });
            this.get_user()

        }).catch((e) => {
            this.setState({
                isLoading: false,
                e
            });
        });

    }


    get_user = async () => {
        const { entries, userToken } = this.state
        const { addFavoriteHandler } = this.props
        this.setState({
            isLoading: true,
        });
        await axios.get(`${BACKEND_URL}get-user?userToken=${userToken}`, {
        }).then((result) => {
            const entryArr = entries
            const favoriteArr = result.data.user.favoriteEntries
            const filteredArray = entryArr.map(entry => favoriteArr.find(fav => fav.id === entry.id) || entry);
            this.setState({
                isLoading: false,
                cards: filteredArray
            });
            addFavoriteHandler(result.data.user)

        }).catch((e) => {
            this.create_user()
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
                                        backgroundImage: `url(${IMAGE_PATH}${card.id}.jpg)`,
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

