import { apiUrl } from '../../services/api';
import entityStore from '../../stores/entityStore';
import userStore from '../../stores/userStore';

export function like(track:any) {
  fetch(apiUrl(`me/favorites/${track.id}`, '?'), { method: track.user_favorite ? 'delete' : 'put' })
    .then(response => response.json())
    .then(() => {
      if (track.user_favorite) {
        userStore.removeFromFavorites(track.id);
      } else {
        userStore.mergeFavorites([track.id]);
      }

      const updateEntity = Object.assign({}, track, { user_favorite: !track.user_favorite });
      entityStore.syncEntities(updateEntity, 'tracks');
    });
}