import { inject, observer } from 'mobx-react';
import { parse } from 'query-string';
import React from 'react';
import { BrowseStore } from 'src/stores/browseStore';
import { EntityStore } from 'src/stores/entityStore';
import { FilterStore } from 'src/stores/filterStore';
import { PaginateStore } from 'src/stores/paginateStore';
import { RequestStore } from 'src/stores/requestStore';
import { SortStore } from 'src/stores/sortStore';
import * as actions from '../../actions/index';
import Activities from '../../components/Activities';
import StreamInteractions from '../../components/StreamInteractions';
import { DEFAULT_GENRE } from '../../constants/genre';
import * as requestTypes from '../../constants/requestTypes';

@inject('browseStore', 'entityStore', 'paginateStore', 'requestStore', 'filterStore', 'sortStore') 
@observer
class Browse extends React.Component <IBrowse> {

  constructor(props:IBrowse) {
    super(props);
    this.fetchActivitiesByGenre = this.fetchActivitiesByGenre.bind(this);
  }

  public componentDidMount() {
    if (!this.needToFetchActivities()) { return; }
    this.fetchActivitiesByGenre();
  }

  public componentDidUpdate() {
    if (!this.needToFetchActivities()) { return; }
    this.fetchActivitiesByGenre();
  }

  public fetchActivitiesByGenre() {
    const { location, paginateStore } = this.props;
    const genre = this.parseGenreFromLocation(location);
    const nextHref = paginateStore!.getLinkByType(genre);
    actions.fetchActivitiesByGenre(nextHref, genre);
  }

  public needToFetchActivities() {
    const { location, browseStore } = this.props;
    const genre = this.parseGenreFromLocation(location);
    const activitiesByGenre = browseStore!.getByGenre(genre);
    return (activitiesByGenre ? activitiesByGenre : []).length < 20;
  }

  public render() {
    const { browseStore, entityStore, requestStore, filterStore, location, sortStore } = this.props;
    const genre = this.parseGenreFromLocation(location);
    return (
      <div className="browse">
        <StreamInteractions />
        <Activities
          requestInProcess={requestStore!.getRequestByType(requestTypes.GENRES)}
          ids={browseStore!.getByGenre(genre)}
          entities={entityStore!.getEntitiesByKey('tracks')}
          activeFilter={filterStore!.combinedFilters}
          activeSort={sortStore!.sortFn}
          scrollFunction={this.fetchActivitiesByGenre}
        />
      </div>
    );
  }

  private parseGenreFromLocation(location:Location):any {
    return parse(location.search!).genre || DEFAULT_GENRE;
  }

}

interface IBrowse{
    location:Location;
    browseStore?: BrowseStore,
    entityStore?: EntityStore,
    paginateStore?: PaginateStore,
    requestStore?: RequestStore,
    filterStore?: FilterStore,
    sortStore?: SortStore,
};

export default Browse;
