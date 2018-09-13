import React from 'react';

import { Image, Glyphicon, Button } from 'react-bootstrap';

const SongDetail = ({ song }) => (
  <div className="song-detail">
    
    <div className="col">
      <Image className="artist-thumbnail" src={ song.artworkUrl100 } alt="artist-thumbnail" thumbnail />
    </div>

    <div className="col">
      
      <div className="song-detail-header">
        <h3>{ song.trackName }</h3> 

        <div className="track-info">
          <a href={ song.artistViewUrl } target="_blank">{ song.artistName }</a>{' '}
          <Glyphicon glyph="option-vertical" />{' '}
          <span className="song-genre">{ song.primaryGenreName }</span>
        </div>
        
        <span className="song-price">${ song.trackPrice }</span>  
      </div>
      
      <div className="song-detail-body">
        <h4 className="title">
          <Glyphicon glyph="gift" /> Album Info
        </h4>
        
        <div className="price">
          ${ song.collectionPrice }
        </div>
        
        <span>
          <Glyphicon glyph="heart-empty" /> { song.collectionName }
        </span>
        
        <span>
          <Glyphicon glyph="heart-empty" /> { song.trackCount } songs included
        </span>
        
        <span>
          <Glyphicon glyph="heart-empty" /> { song.releaseDate.split("T")[0] } released
        </span>

        <Button bsSize="xsmall" bsStyle="primary">
          <a href={ song.collectionViewUrl } target="_blank">Click to view more</a>
        </Button>
      </div>
      
    </div>

  </div>
);

export default SongDetail;