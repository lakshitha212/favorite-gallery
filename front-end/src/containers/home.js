import _ from 'lodash'
import React, { Component } from "react";
import '../App.css';
import { Grid, Segment, Divider, Icon, Header, Card, Placeholder } from 'semantic-ui-react'
import Favorite from '../components/favorite';
const BACKEND_URL = "http://localhost:8082/"

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            cards: [],
            favorites: [
                {
                    id: 204900032,
                    message: "",
                    picture: "https://www.filepicker.io/api/file/0KHHtW5pQeunZJiyJb8V",
                    pictureSmall: "",
                    pictureMedium: "",
                    pictureStored: "",
                    timestamp: 1578391381,
                    type: "gallery"
                },
                {
                    id: 204900033,
                    message: "",
                    picture: "https://www.filepicker.io/api/file/BFYcwcixRSGlV7MOwI85",
                    pictureSmall: "",
                    pictureMedium: "",
                    pictureStored: "",
                    timestamp: 1578391381,
                    type: "gallery"
                },
                {
                    id: 204900034,
                    message: "",
                    picture: "https://www.filepicker.io/api/file/EFOpZXR9TsWTWhF4F4SX",
                    pictureSmall: "",
                    pictureMedium: "",
                    pictureStored: "",
                    timestamp: 1578391381,
                    type: "gallery"
                },
                {
                    id: 204900035,
                    message: "",
                    picture: "https://www.filepicker.io/api/file/z36zDtrRuUJ3HAOw4uEg",
                    pictureSmall: "",
                    pictureMedium: "",
                    pictureStored: "",
                    timestamp: 1578391381,
                    type: "gallery"
                },
                {
                    id: 204900036,
                    message: "",
                    picture: "https://www.filepicker.io/api/file/wR1dtVwSLqMW5ueGUUug",
                    pictureSmall: "",
                    pictureMedium: "",
                    pictureStored: "",
                    timestamp: 1578391381,
                    type: "gallery"
                },
                {
                    id: 204900037,
                    message: "",
                    picture: "https://www.filepicker.io/api/file/EH84oM3DTRSvP9dUPKCm",
                    pictureSmall: "",
                    pictureMedium: "",
                    pictureStored: "",
                    timestamp: 1578391381,
                    type: "favorite"
                }
            ]
        };
    }

    componentDidMount = () => {
        this.get_entries();

    }

    updateImages = images => console.log('updated- images', images); // Write your own logic

    handleClick(event, card) {
        const { favorites } = this.state
        console.log(card)
        fetch(`${BACKEND_URL}update-entry`, {
            method: 'post',
            body: JSON.stringify({ userToken: localStorage.getItem("userToken"), card: card })
        }).then(res => res.json()).then(
            (result) => {
                console.log(result)
                this.setState(prevState => ({ cards: prevState.cards.map(el => (el.id === card.id ? { ...el, _isFavourite: (card._isFavourite ? false : true) } : el)) }))
                this.get_entries()
                // localStorage.setItem('userToken', result.entries.id);
                // this.setState({
                //     isLoading: false,
                //     cards: result.entries.entries
                // });
            },
            (error) => {
                this.setState({
                    isLoading: false,
                    error
                });
            }
        )

       
    }

    get_entries = async () => {
        this.setState({
            isLoading: true,
        });
        fetch(`${BACKEND_URL}get-entries`, {
            method: 'post',
            body: JSON.stringify({ userToken: localStorage.getItem("userToken") })
        }).then(res => res.json()).then(
            (result) => {
                console.log(result)
                localStorage.setItem('userToken', result.entries.id);
                this.setState({
                    isLoading: false,
                    cards: result.entries.entries
                });
            },
            (error) => {
                this.setState({
                    isLoading: false,
                    error
                });
            }
        )
    };

    render() {

        const { favorites, cards, isLoading } = this.state

        return <><Segment placeholder>
            <Grid columns={2} stackable textAlign='center'>

                <Divider vertical></Divider>

                <Grid.Row verticalAlign='middle'>
                    <Grid.Column>
                        <Header as='h2'>Make Your Selection By Clicking <Icon name='heart' /></Header>
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
                                                // backgroundImage: `url(${card.picture})`,
                                                backgroundSize: "cover",
                                            }}
                                        >{card.id}</Card.Content>
                                    )}
                                    <Card.Content extra>
                                        {card._isFavourite ? (<Icon name='heart' className="red-heart" color="red" onClick={(e) => this.handleClick(e, card)} size="large" />) : (<Icon name='heart' className="red-heart" size="large" onClick={(e) => this.handleClick(e, card)} />)}

                                    </Card.Content>
                                </Card>
                            ))}
                        </Card.Group>
                    </Grid.Column>

                    <Grid.Column>
                        <Header as='h2'>Drag the Images to change positions</Header>
                        <Favorite favorites={favorites} callback={this.updateImages} />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Segment>
        </>
    }
}
export default Home;
