import React from "react";
import { Grid, Segment, Divider } from 'semantic-ui-react'
import GallerySide from './containers/gallery-side';
import FavoriteSide from './containers/favorite-side';


export default function FavoriteApp() {
  return (
    <Segment placeholder>
      <Grid columns={2} stackable textAlign='center'>
        <Divider vertical></Divider>
        <Grid.Row verticalAlign='middle'>
          {/* Start Load Gallery Side Container Here */}
          <GallerySide />
          {/* End */}

          {/* Start Load Favorite Side Container Here */}
          <FavoriteSide />
          {/* End */}

        </Grid.Row>
      </Grid>
    </Segment>
  );
}
