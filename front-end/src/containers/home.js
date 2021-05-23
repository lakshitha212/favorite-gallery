import _ from 'lodash'
import React, { Component } from "react";
import '../App.css';
import { Grid, Segment, Divider, Icon, Header, Card } from 'semantic-ui-react'
import Favorite from '../components/favorite';
const BACKEND_URL = "http://localhost:8082/"

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cards: [
                {
                    id: 204900001,
                    message: "",
                    picture: "https://www.filepicker.io/api/file/c5XwmVekSQO2CIabnudN",
                    pictureSmall: "",
                    pictureMedium: "",
                    pictureStored: "",
                    timestamp: 1578391381,
                    type: "gallery"
                },
                {
                    id: 204900002,
                    message: "",
                    picture: "https://www.filepicker.io/api/file/oTUic0PTS4KiBJFbahbl",
                    pictureSmall: "",
                    pictureMedium: "",
                    pictureStored: "",
                    timestamp: 1578391381,
                    type: "gallery"
                },
                {
                    id: 204900003,
                    message: "",
                    picture: "https://www.filepicker.io/api/file/OqPljPIRimcdPI5DWxlv",
                    pictureSmall: "",
                    pictureMedium: "",
                    pictureStored: "",
                    timestamp: 1578391381,
                    type: "gallery"
                },
                {
                    id: 204900004,
                    message: "",
                    picture: "https://www.filepicker.io/api/file/OkleqwBQLCvFBAbByUxY",
                    pictureSmall: "",
                    pictureMedium: "",
                    pictureStored: "",
                    timestamp: 1578391381,
                    type: "gallery"
                },
                {
                    id: 204900005,
                    message: "",
                    picture: "https://www.filepicker.io/api/file/AbFrknBZRLGmJuUTWYr2",
                    pictureSmall: "",
                    pictureMedium: "",
                    pictureStored: "",
                    timestamp: 1578391381,
                    type: "gallery"
                },
                {
                    id: 204900006,
                    message: "",
                    picture: "https://www.filepicker.io/api/file/d7x3POy5SZi3tSOt91PP",
                    pictureSmall: "",
                    pictureMedium: "",
                    pictureStored: "",
                    timestamp: 1578391381,
                    type: "gallery"
                },
                {
                    id: 204900007,
                    message: "",
                    picture: "https://www.filepicker.io/api/file/APOJhuSF2hQB370cIc8A",
                    pictureSmall: "",
                    pictureMedium: "",
                    pictureStored: "",
                    timestamp: 1578391381,
                    type: "gallery"
                },
                {
                    id: 204900008,
                    message: "",
                    picture: "https://www.filepicker.io/api/file/vecb8mtvR4SNwfVlWdZo",
                    pictureSmall: "",
                    pictureMedium: "",
                    pictureStored: "",
                    timestamp: 1578391381,
                    type: "gallery"
                },
                {
                    id: 204900009,
                    message: "",
                    picture: "https://www.filepicker.io/api/file/Gztd1zETrmjk4vYcuiQ2",
                    pictureSmall: "",
                    pictureMedium: "",
                    pictureStored: "",
                    type: "gallery"
                },
                {
                    id: 204900010,
                    message: "",
                    picture: "https://www.filepicker.io/api/file/YDFPdySyivzEgopu58Lw",
                    pictureSmall: "",
                    pictureMedium: "",
                    pictureStored: "",
                    timestamp: 1578391381,
                    type: "gallery"
                },
                {
                    id: 204900011,
                    message: "",
                    picture: "https://www.filepicker.io/api/file/VpKlBFJRotNVbF8EEFtA",
                    pictureSmall: "",
                    pictureMedium: "",
                    pictureStored: "",
                    timestamp: 1578391381,
                    type: "gallery"
                },
                {
                    id: 204900012,
                    message: "",
                    picture: "https://www.filepicker.io/api/file/C355ixgkQVCYGNkGSG50",
                    pictureSmall: "",
                    pictureMedium: "",
                    pictureStored: "",
                    timestamp: 1578391381,
                    type: "gallery"
                },
                {
                    id: 204900013,
                    message: "",
                    picture: "https://www.filepicker.io/api/file/lFkDrVuPRIG4ubhSMrsE",
                    pictureSmall: "",
                    pictureMedium: "",
                    pictureStored: "",
                    timestamp: 1578391381,
                    type: "gallery"
                },
                {
                    id: 204900014,
                    message: "",
                    picture: "https://www.filepicker.io/api/file/3LtOaKHyQemw8j2HUDE9",
                    pictureSmall: "",
                    pictureMedium: "",
                    pictureStored: "",
                    timestamp: 1578391381,
                    type: "gallery"
                },
                {
                    id: 204900015,
                    message: "",
                    picture: "https://www.filepicker.io/api/file/CTpPD6vkQF58qaiPglhQ",
                    pictureSmall: "",
                    pictureMedium: "",
                    pictureStored: "",
                    timestamp: 1578391381,
                    type: "gallery"
                },
                {
                    id: 204900016,
                    message: "",
                    picture: "https://www.filepicker.io/api/file/4BzYSsWOSOCbtG302olA",
                    pictureSmall: "",
                    pictureMedium: "",
                    pictureStored: "",
                    timestamp: 1578391381,
                    type: "gallery"
                },
                {
                    id: 204900017,
                    message: "",
                    picture: "https://www.filepicker.io/api/file/2ldBY3MJTtyndYbR00z2",
                    pictureSmall: "",
                    pictureMedium: "",
                    pictureStored: "",
                    timestamp: 1578391381,
                    type: "gallery"
                },
                {
                    id: 204900018,
                    message: "",
                    picture: "https://www.filepicker.io/api/file/QtGhHaWCRtKnIilzxrR2",
                    pictureSmall: "",
                    pictureMedium: "",
                    pictureStored: "",
                    timestamp: 1578391381,
                    type: "gallery"
                },
                {
                    id: 204900019,
                    message: "",
                    picture: "https://www.filepicker.io/api/file/5UFD4b5fS3eKH6MsQa2q",
                    pictureSmall: "",
                    pictureMedium: "",
                    pictureStored: "",
                    timestamp: 1578391381,
                    type: "gallery"
                },
                {
                    id: 204900020,
                    message: "",
                    picture: "https://www.filepicker.io/api/file/H4JckkwNRbaTVMR3jh6B",
                    pictureSmall: "",
                    pictureMedium: "",
                    pictureStored: "",
                    timestamp: 1578391381,
                    type: "gallery"
                },
                {
                    id: 204900021,
                    message: "",
                    picture: "https://www.filepicker.io/api/file/lCYG8m99QxGhAR0OObJw",
                    pictureSmall: "",
                    pictureMedium: "",
                    pictureStored: "",
                    timestamp: 1578391381,
                    type: "gallery"
                },
                {
                    id: 204900022,
                    message: "",
                    picture: "https://www.filepicker.io/api/file/yGSkL96QGmv6M4acLgNs",
                    pictureSmall: "",
                    pictureMedium: "",
                    pictureStored: "",
                    timestamp: 1578391381,
                    type: "gallery"
                },
                {
                    id: 204900023,
                    message: "",
                    picture: "https://www.filepicker.io/api/file/fLdzTB6zS5iuPGb3c2R4",
                    pictureSmall: "",
                    pictureMedium: "",
                    pictureStored: "",
                    timestamp: 1578391381,
                    type: "gallery"
                },
                {
                    id: 204900024,
                    message: "",
                    picture: "https://www.filepicker.io/api/file/vvzp9Sk2TkaI1x6ip9Mc",
                    pictureSmall: "",
                    pictureMedium: "",
                    pictureStored: "",
                    timestamp: 1578391381,
                    type: "gallery"
                },
                {
                    id: 204900025,
                    message: "",
                    picture: "https://www.filepicker.io/api/file/rPrcNH0aRW89ifdqlEuf",
                    pictureSmall: "",
                    pictureMedium: "",
                    pictureStored: "",
                    timestamp: 1578391381,
                    type: "gallery"
                },
                {
                    id: 204900026,
                    message: "",
                    picture: "https://www.filepicker.io/api/file/4cmn2DpmT7y0Ops40aG7",
                    pictureSmall: "",
                    pictureMedium: "",
                    pictureStored: "",
                    timestamp: 1578391381,
                    type: "gallery"
                },
                {
                    id: 204900027,
                    message: "",
                    picture: "https://www.filepicker.io/api/file/MFjpQCVrTsW8nr1ou3zT",
                    pictureSmall: "",
                    pictureMedium: "",
                    pictureStored: "",
                    timestamp: 1578391381,
                    type: "gallery"
                },
                {
                    id: 204900028,
                    message: "",
                    picture: "https://www.filepicker.io/api/file/uQM3FeS2TvSjYYtGgWLx",
                    pictureSmall: "",
                    pictureMedium: "",
                    pictureStored: "",
                    timestamp: 1578391381,
                    type: "gallery"
                },
                {
                    id: 204900029,
                    message: "",
                    picture: "https://www.filepicker.io/api/file/y4KVb6igRb6x7AUSjX2U",
                    pictureSmall: "",
                    pictureMedium: "",
                    pictureStored: "",
                    timestamp: 1578391381,
                    type: "gallery"
                },
                {
                    id: 204900030,
                    message: "",
                    picture: "https://www.filepicker.io/api/file/5ZoS74eLQTGPJOBc7lfn",
                    pictureSmall: "",
                    pictureMedium: "",
                    pictureStored: "",
                    timestamp: 1578391381,
                    type: "gallery"
                },
                {
                    id: 204900031,
                    message: "",
                    picture: "https://www.filepicker.io/api/file/o5JNq1jSIW7J15A5cjuM",
                    pictureSmall: "",
                    pictureMedium: "",
                    pictureStored: "",
                    timestamp: 1578391381,
                    type: "gallery"
                },
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
            ],
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
        // console.log(localStorage.getItem("username"))
        if (localStorage.getItem("userToken") === null) {
            fetch(`${BACKEND_URL}get-entries`, {
                method: 'post',
                body: JSON.stringify({ userToken: localStorage.getItem("userToken") })
            }).then(res => res.json()).then(
                (result) => {
                    console.log(result)
                    localStorage.setItem('userToken', result.entries.id);
                    // this.setState({
                    //     isLoaded: true,
                    //     items: result.items
                    // });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
        } else {
            alert('no');
        }
    }

    updateImages = images => console.log('updated- images', images); // Write your own logic
    render() {

        const { favorites } = this.state

        return <><Segment placeholder>
            <Grid columns={2} stackable textAlign='center'>

                <Divider vertical></Divider>

                <Grid.Row verticalAlign='middle'>
                    <Grid.Column>
                        <Header as='h2'>Make Your Selection By Clicking <Icon name='heart' /></Header>
                        <Card.Group doubling itemsPerRow={9} stackable >
                            {_.map(this.state.cards, (card) => (
                                <Card raised key={card.id}>
                                    <Card.Content
                                        style={{
                                            height: "100px",
                                            // backgroundImage: `url(${card.picture})`,
                                            backgroundSize: "cover",
                                        }}
                                    >{card.id}</Card.Content>
                                    <Card.Content extra>
                                        <Icon name='heart' className="red-heart" size="large" />
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
