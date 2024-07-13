import React from "react";
import { List, ListItem, ListItemText, IconButton, Divider } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function Favorites({ favorites, onCitySelect, onRemoveFavorite }) {
  return (
    <div>
      <h2>Favorite Cities</h2>
      <List>
        {favorites.map((city, index) => (
          <div key={`${city}-${index}`}>
            <ListItem button onClick={() => onCitySelect(city)}>
              <ListItemText primary={city} />
              <IconButton onClick={() => onRemoveFavorite(city)}>
                <DeleteIcon />
              </IconButton>
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>
    </div>
  );
}

export default Favorites;
