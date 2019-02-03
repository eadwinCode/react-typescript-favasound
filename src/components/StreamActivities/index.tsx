import { inject, observer } from 'mobx-react';
import React from 'react';
import { EntityStore } from 'src/stores/entityStore';
import { FilterStore } from 'src/stores/filterStore';
import { PaginateStore } from 'src/stores/paginateStore';
import { RequestStore } from 'src/stores/requestStore';
import { SortStore } from 'src/stores/sortStore';
import { UserStore } from 'src/stores/userStore';
import * as actions from '../../actions/index';
import Activities from '../../components/Activities';
import StreamInteractions from '../../components/StreamInteractions';
import * as paginateLinkTypes from '../../constants/paginateLinkTypes';
import * as requestTypes from '../../constants/requestTypes';

interface IStreamActivities{
    userStore?:UserStore;
    entityStore?:EntityStore;
    paginateStore?:PaginateStore;
    requestStore?:RequestStore;
    sortStore?:SortStore;
    filterStore?:FilterStore;
}
const StreamActivities = inject('userStore','entityStore', 'paginateStore','requestStore','sortStore','filterStore')
(observer(({ userStore,entityStore,paginateStore, requestStore,sortStore,filterStore }: IStreamActivities) => 
{
    const nextHref = paginateStore!.getLinkByType(paginateLinkTypes.ACTIVITIES);
    const fetchActivities = () => {
        actions.fetchActivities(null, nextHref)
    }
    return (
      <div>
        <StreamInteractions />
        <Activities
          requestInProcess={requestStore!.getRequestByType(requestTypes.ACTIVITIES)}
          ids={userStore!.activities}
          entities={entityStore!.getEntitiesByKey('tracks')}
          activeFilter={filterStore!.combinedFilters}
          activeSort={sortStore!.sortFn}
          scrollFunction={fetchActivities}
        />
      </div>
    );
}));
export default StreamActivities;