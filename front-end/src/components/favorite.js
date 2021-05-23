import _ from 'lodash'
import React, { Component } from 'react';
import { Grid, Image, Container, Segment, Divider, Icon, Header, Search, Button, Card, Placeholder } from 'semantic-ui-react'

class Favorite extends Component {
    constructor(props) {
        super();
        const { favorites } = props;
        this.state = {
            favorites
        };
        this.dragId = '';
    }

    imageDragOver = ev => ev.preventDefault();

    imageDragStart = ev => (this.dragId = ev.target.id);

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
            this.props.callback(favorites);
        }
    };

    render() {
        const { favorites } = this.state;
        return (
            <Card.Group doubling itemsPerRow={3} stackable>
                {favorites &&
                    favorites.length > 0 &&
                    favorites.map((favorite, index) => {
                        return (

                            <Card style={{ cursor: "move" }} key={index} id={`${index}-card`} onDrop={this.dropImage} onDragOver={this.imageDragOver}>
                                <Card.Content
                                    id={`${index}-img`}
                                    draggable={true}
                                    onDragStart={this.imageDragStart}
                                    data-holder-rendered='true'
                                    style={{
                                        height: "200px",
                                        backgroundSize: "cover",
                                        // backgroundImage: `url(${favorite.picture})`,
                                    }}
                                >{favorite.id}</Card.Content>
                            </Card>
                        );
                    })}
            </Card.Group>
        );
    }
}

export default Favorite;
