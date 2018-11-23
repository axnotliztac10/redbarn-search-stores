import React from 'react';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

export default class SideBar extends React.PureComponent {
  renderFavoriteStore = (store, id) => {
    return (
      <React.Fragment key={id}>
        <ListItem button onClick={() => this.props.handleVisitStore(store)}>
          <ListItemText primary={store.name} />
        </ListItem>
        <Divider />
      </React.Fragment>
    );
  }

  render() {
    const { favoriteStores, onSearch } = this.props;

    return (
      <div className="sidebar">
        <div className="search-icon">
          Search Store
          <Button color="secondary" variant="fab" aria-label="Search" onClick={onSearch}>
            <SearchIcon />
          </Button>
        </div>
        <Divider />
        <h3>My Favorite Stores</h3>
        {(favoriteStores.length) ?
          <List component="nav">{favoriteStores.map(this.renderFavoriteStore)}</List> : <div>No Favorite stores yet.</div>}
      </div>
    );
  }
}

SideBar.defaultProps = {
  favoriteStores: [],
};