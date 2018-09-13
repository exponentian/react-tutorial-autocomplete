import React from 'react';
import SongList from './SongList';
import SongDetail from './SongDetail';

import { 
  Grid, 
  Row, 
  Col, 
  Image, 
  FormGroup, 
  InputGroup, 
  FormControl,
  Button,
  PageHeader,
  Alert
} from 'react-bootstrap';


class App extends React.Component {

  state = {
    songs: [],
    filteredSongs: [],
    selectedSong: {
      name: '',
      detail: {}
    },
    clickedSearch: false
  };

  componentDidMount = () => {

    // fetch data 
    fetch("/songs.json")
      .then(response => response.json())
      .then(data => {
        this.setState({ 
          songs: data.results
        });
      });
  };

  handleChange = e => {
    const { songs } = this.state;
    const searchSong = e.target.value.trim();

    // filter songs with the search song
    this.setState({
      filteredSongs: songs.filter(song => 
        !!song.trackName && searchSong.length > 0 && searchSong.toLowerCase() === song.trackName.toLowerCase().substr(0, searchSong.length)
      ),
      selectedSong: { name: searchSong, detail: {} },
      clickedSearch: false
    });
  };

  handleClick = song => {    
    this.setState({
      selectedSong: {
        name: song.trackName,
        detail: song
      }
    });
  };

  handleSearch = () => {
    this.setState({ clickedSearch: true });
  };

  render() {
    const { songs, filteredSongs, selectedSong, clickedSearch } = this.state;
    
    if (songs.length < 1) {
      return <div>Loading...</div>;
    }

    let songLists;
    if (filteredSongs.length > 0) {
      if (Object.keys(selectedSong.detail).length > 0) {
        songLists = <Alert bsStyle="success">Please click a search button.</Alert>;
      
      } else {
        songLists = filteredSongs.map(song => 
          <SongList key={song.trackId} song={song} handleClick={this.handleClick} />
        );
      }

    } else {
      songLists = <Alert bsStyle="warning">No songs found.</Alert>;
    }

    return (
      <div className="app">

        <Grid className="main">

          <PageHeader>
            React Tutorial: Autocomplete<br />
            <small>by Ho Seok (Brandon) Oh</small>
          </PageHeader>

          <Row>
            <Col md={6} mdOffset={3}>

              <div className="main-header">
                <Image src="https://is4-ssl.mzstatic.com/image/thumb/Music62/v4/de/32/af/de32af87-e576-f134-ef8d-472527ddf6f4/source/190x190cc.png" alt="mariah-carey-pic" circle />
                <h4>Search for Mariah Carey's Songs</h4>
              </div>

              <div className="main-body">

                <FormGroup>
                  <InputGroup>
                    <FormControl type="text" value={selectedSong.name} onChange={this.handleChange} />
                    
                    <InputGroup.Button>
                      <Button 
                        onClick={this.handleSearch} 
                        disabled={Object.keys(selectedSong.detail).length > 0 ? false : true}
                      >
                        Search
                      </Button>
                    </InputGroup.Button>
                  </InputGroup>
                </FormGroup>

                {clickedSearch ?
                  <div className="search-result">
                    {clickedSearch && <SongDetail song={selectedSong.detail} />}
                  </div> :
                  <div className="song-lists">
                    {songLists}
                  </div>}
              </div>

            </Col>
          </Row>
        </Grid>

      </div>
    );
  }
}

export default App;