import React from 'react';
import { Image } from 'react-bootstrap';

const SongList = ({ song, handleClick }) => (
  <div className="song-list" onClick={() => handleClick(song)}>
    <Image src={song.artworkUrl30} alt="song-thumbnail" rounded />{' '}
    { song.trackName }
  </div>
);

export default SongList;