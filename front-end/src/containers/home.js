/**
 * {BACKEND_URL} - Keep backend API
 * 
 */
import _ from 'lodash'
import React, { Component } from "react";
import '../App.css';
import { Grid, Segment, Divider, Icon, Header, Card, Placeholder } from 'semantic-ui-react'
import Favorite from '../components/favorite';
const axios = require('axios');
const BACKEND_URL = "http://localhost:8082/"

class Home extends Component {
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
            favorites: [],
            photoCount: 0
        };
        this.dragId = '';
    }

    componentDidMount = () => {
        this.get_entries();

    }



    handleClick(event, card) {
        axios.post(`${BACKEND_URL}update-entry`, {
            userToken: localStorage.getItem("userToken"),
            card: card
        }).then((result) => {
            // this.setState(prevState => ({ cards: prevState.cards.map(el => (el.id === card.id ? { ...el, _isFavourite: (card._isFavourite ? false : true) } : el)) }))
            this.get_entries()

        }).catch((e) => {
            console.error(e);
            this.setState({
                isLoading: false,
                e
            });
        });
    }

    get_entries = async () => {
        this.setState({
            isLoading: true,
        });
        await axios.post(`${BACKEND_URL}get-entries`, {
            userToken: localStorage.getItem("userToken")
        }).then((result) => {
            this.setState({
                isLoading: false,
                cards: result.data.entries.entries,
                favorites: result.data.entries.favoriteEntries,
                photoCount: result.data.entries.favoriteEntries.length
            });

            if (!localStorage.getItem("userToken")) {
                localStorage.setItem('userToken', result.data.entries.id);
            }

        }).catch((e) => {
            console.error(e);
            this.setState({
                isLoading: false,
                e
            });
        });

    };

    /**
     * 
     * @param {*} images
     */
    rearrange = async (images) => {
        await axios.post(`${BACKEND_URL}sort-entries`, {
            userToken: localStorage.getItem("userToken"),
            images: images
        }).then((result) => {
            this.setState({
                isLoading: false,
                favorites: result.data.entries.favoriteEntries
            });

        }).catch((e) => {
            console.error(e);
            this.setState({
                isLoading: false,
                e
            });
        });
    }

    /**
     * 
     * @param {*} ev 
     * @returns 
     */
    imageDragOver = ev => ev.preventDefault();

    /**
     * 
     * @param {*} ev 
     * @returns 
     */

    imageDragStart = ev => (this.dragId = ev.target.id);

    /**
     * 
     * @param {*} ev 
     * @description sorting image grid
     */

    dropImage = ev => {
        ev.preventDefault();
        const dragElement = this.dragId.split('-');
        let dragIndex = '';
        if (dragElement.length > 1) {
            dragIndex = dragElement[0];
        }

        const dropElement = ev.target.id.split('-');
        let dropIndex = '';
        if (dropElement.length > 1) {
            dropIndex = dropElement[0];
        }

        if (dragIndex !== '' && dropIndex !== '') {
            const { favorites } = this.state;
            const dragObject = favorites[dragIndex];
            favorites.splice(dragIndex, 1);
            favorites.splice(dropIndex, 0, dragObject);
            this.setState({ favorites });
            this.rearrange(favorites)
        }
    };


    render() {

        const { favorites, cards, isLoading, photoCount } = this.state

        return <><Segment placeholder>
            <Grid columns={2} stackable textAlign='center'>

                <Divider vertical></Divider>

                <Grid.Row verticalAlign='middle'>
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

                    <Grid.Column>
                        {isLoading ? (<Placeholder>
                            <Placeholder.Line length='full' />
                        </Placeholder>) :
                            ((favorites && favorites.length === 0) ? (<Header as='h2'> There is no selected items to display! </Header>) : (<Header as='h2'>Drag the Images to change positions - {this.state.photoCount}</Header>))}

                        <Card.Group doubling itemsPerRow={3} stackable>
                            {favorites &&
                                favorites.length > 0 &&
                                _.map(favorites, (favorite, index) => (

                                    <Card style={{ cursor: "move" }} key={index} id={`${index}-card`} onDrop={this.dropImage} onDragOver={this.imageDragOver}>


                                        {isLoading ? (
                                            <Placeholder>
                                                <Placeholder.Image square />
                                            </Placeholder>
                                        ) : (
                                            <Card.Content
                                                id={`${index}-img`}
                                                draggable={true}
                                                onDragStart={this.imageDragStart}
                                                data-holder-rendered='true'
                                                style={{
                                                    height: "200px",
                                                    backgroundSize: "cover",
                                                    backgroundImage: `url(${favorite.picture})`,
                                                }}
                                            ></Card.Content>
                                        )}
                                    </Card>
                                )
                                )}




                        </Card.Group>
                        {/* <Favorite favorites={this.state.favorites} callback={this.updateImages} /> */}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Segment>
        </>
    }
}
export default Home;
