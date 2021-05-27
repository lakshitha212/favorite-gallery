/**
 * {BACKEND_URL} - Keep backend API
 * 
 */
import _ from 'lodash'
import React, { Component } from "react";
import { BACKEND_URL } from '../redux/constants'
import '../App.css';
import { Grid, Header, Card } from 'semantic-ui-react'

const axios = require('axios');

class FavoriteSide extends Component {
    constructor(props) {
        super(props);
        /**
         * Manage state
         * @param {isLoading} - Simple indicator 
         * @param {card} - Object array. All the images are keep here
         * @param {favorites} - Object array. All the selected images are keep here
         */
        this.state = {
            isLoading: true,
            favorites: [],
            photoCount: 0
        };
        this.dragId = '';
    }

    componentDidMount = () => { }


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
    componentWillReceiveProps(props) {
        this.setState({ favorites: props.data.favoriteEntries, photoCount: props.data.favoriteEntries.length });
    }

    render() {
        const { favorites, photoCount } = this.state

        return <>
            <Grid.Column>
                {((favorites && favorites.length === 0) ? (<Header as='h2'> There is no selected items to display! </Header>) : (<Header as='h2'>Drag the Images to change positions - {photoCount}</Header>))}

                <Card.Group doubling itemsPerRow={3} stackable>
                    {favorites &&
                        favorites.length > 0 &&
                        _.map(favorites, (favorite, index) => (

                            <Card style={{ cursor: "move" }} key={index} id={`${index}-card`} onDrop={this.dropImage} onDragOver={this.imageDragOver}>

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
                            </Card>
                        )
                        )}
                </Card.Group>
            </Grid.Column>
        </>
    }
}
export default FavoriteSide;
